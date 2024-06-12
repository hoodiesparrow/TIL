type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// interface ElevatedEmployee extends Admin, Employee {}
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "Max",
  privileges: ["create-server"],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric;

// function overloading
function add2(a: number, b: number): number;
function add2(a: string, b: string): string;
function add2(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }

  return a + b;
}

// const result = add2('Max', 'Schwarz') as string
const result = add2("Max", "Schwarz");
result.split(" ");

// optional chaining
const fetchedUserData = {
  id: "u1",
  name: "Max",
  // job: { title: 'CEO', description: 'My company'}
};

console.log(fetchedUserData?.job?.title);

// type UnknownEmployee = Employee | Admin;

// function printEmployeeInformation(emp: UnknownEmployee) {
//   console.log(`Name ${emp.name}`);
//   if ("privileges" in emp) {
//     console.log(`Privileges: ${emp.privileges}`);
//   }
//   if ("startDate" in emp) {
//     console.log(`Start: ${emp.startDate}`);
//   }
// }

// printEmployeeInformation({ name: "Man", startDate: new Date() });

// class Car {
//   drive() {
//     console.log("Driving");
//   }
// }

// class Truck {
//   drive() {
//     console.log("brrr");
//   }

//   loadCargo(amount: number) {
//     console.log(`Loading ${amount}`);
//   }
// }

// type Vehicle = Car | Truck;

// const v1 = new Car();
// const v2 = new Truck();

// function useVehicle(vehicle: Vehicle) {
//   vehicle.drive();
//   if (vehicle instanceof Truck) {
//     vehicle.loadCargo(1000);
//   }
// }

// useVehicle(v1);
// useVehicle(v2);

// // Discriminated Union

// interface Bird {
//   type: "bird"; // not a value;
//   flyingSpeed: number;
// }

// interface Horse {
//   type: "horse";
//   runningSpeed: number;
// }

// type Animal = Bird | Horse;

// function moveAnimal(animal: Animal) {
//   let speed;
//   switch (animal.type) {
//     case "bird":
//       speed = animal.flyingSpeed;
//       break;
//     case "horse":
//       speed = animal.runningSpeed;
//   }

//   console.log(`Moving at Speed: ${speed}`);
// }
// moveAnimal({ type: "bird", flyingSpeed: 300 });

// // type casting

// // const paragraph = document.querySelector('p')
// // const userInputElem = <HTMLInputElement>document.getElementById("user-input")!;
// const userInputElem = document.getElementById(
//   "user-input"
// )! as HTMLInputElement;

// userInputElem.value = "Hi there!";

// interface ErrorContainer {
//   [prop: string]: string;
// }

// const errorBag: ErrorContainer = {
//   email: "Not a valid email",
//   username: "Must start with a capital character",
// };
