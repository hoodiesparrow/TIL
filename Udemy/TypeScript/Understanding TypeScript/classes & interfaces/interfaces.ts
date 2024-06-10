interface AddFn {
  // interface syntax for functions
  (a: number, b: number): number;
}

let add: AddFn;
add = (n1: number, n2: number) => n1 + n2;

interface Named {
  readonly name?: string;
  outputName?: string; // this prop might exist
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

class Person implements Greetable {
  age = 30;
  constructor(public name?: string) {}
  greet(phrase: string) {
    if (this.name) {
      console.log(`${phrase} ${this.name}`);
    } else {
      console.log("hi");
    }
  }
}

let user1: Greetable;

user1 = new Person("Max");
// user1.name = 'readonly in interace make this not modifiable'
console.log(user1);

const user2 = new Person();
