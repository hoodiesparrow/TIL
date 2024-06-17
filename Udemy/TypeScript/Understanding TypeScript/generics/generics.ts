// const names: Array<string> = ['Max', 'Manu'] // string[]

// const promise: Promise<string> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('Done')
//   }, 2000)
// })

// promise.then((data) => {
//   //
// })

function merge(objA: object, objB: object) {
  return Object.assign(objA, objB);
}

// const mergedObj = merge({ name: "Max" }, { age: 30 });
// mergedObj.age; // this makes error :: ts doesn't know mergedObj has age

function genericMerge<T, U>(objA: T, objB: U) {
  return { ...objA, ...objB };
}

const mergedObj = genericMerge({ name: "Max" }, { age: 30 });
const mergedObj2 = genericMerge({ hello: "Max" }, { greeting: 30 });
mergedObj.age;
mergedObj2.hello; // infers type

const mergedObjWithoutConstraint = genericMerge({ hello: "Max" }, 30);

function genericMergeWithConstraint<T extends object, U extends object>(
  objA: T,
  objB: U
) {
  return { ...objA, ...objB };
}
// const mergedObjWithConstraint = genericMergeWithConstraint(30, 30); // error
const mergedObjWithConstraint = genericMerge(
  { hello: "Max" },
  { greeting: 30 }
);

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = "Got no value.";
  if (element.length === 1) {
    descriptionText = `Got 1 element.`;
  } else if (element.length > 1) {
    descriptionText = `Got ${element.length} elements`;
  }

  return [element, descriptionText];
}

console.log(countAndDescribe("Hi there!"));
console.log(countAndDescribe(["Sports", "Cooking"]));

// function extractAndConver(obj: object, key: string) {
//   return obj[key] // does not guaranty if the key is in the object
// }

// console.log(extractAndConver({}, 'name'))
function extractAndConver<T extends object, U extends keyof T>(obj: T, key: U) {
  return obj[key]; // does not guaranty if the key is in the object
}

// console.log(extractAndConver({}, "name")); // errors
console.log(extractAndConver({ name: "Max" }, "name"));

// generic class

class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Max");
textStorage.addItem("Manu");
textStorage.removeItem("Max");
textStorage.getItems();

const numberStorage = new DataStorage<number | string>();

// const objStorage = new DataStorage<object>();
// objStorage.addItem({ name: "Max" });
// objStorage.addItem({ name: "Manu" });

// objStorage.removeItem({ name: "Max" });

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {}; // makes all props optional, temporarily
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}

const names: Readonly<string[]> = ["Max", "Sports"];
// names.push('Manu')
// names.pop()
