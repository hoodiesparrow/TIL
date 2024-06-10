"use strict";
let add;
add = (n1, n2) => n1 + n2;
class Person {
    constructor(name) {
        this.name = name;
        this.age = 30;
    }
    greet(phrase) {
        if (this.name) {
            console.log(`${phrase} ${this.name}`);
        }
        else {
            console.log("hi");
        }
    }
}
let user1;
user1 = new Person("Max");
// user1.name = 'readonly in interace make this not modifiable'
console.log(user1);
const user2 = new Person();
