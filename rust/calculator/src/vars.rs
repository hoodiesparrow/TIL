// Varialbles hold primitive data or references to data
// Varialbles are immutable by default
// Rust is a block-scoped language

pub fn run() {
  let name = "Dongyun";
  let mut age = 28;
  println!("My name is {} and I am {}.", name, age);

  age = 29;
  println!("My name is {} and I am {}.", name, age);

  // Define constant
  const ID: i32 = 001; // interger 32bit
  println!("Id: {}", ID);

  // Assign multiple vars
  let (my_name, my_age) = ("Dongyun", 29);
  println!("{} is {}", my_name, my_age);
}
