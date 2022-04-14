extern crate rand; // == use rand; 

use std::cmp::Ordering;
use std::io;
use rand::Rng;
// main 함수는 프로그램의 진입점입니다.
fn main() {
    println!("Guess the number!");
    let secret_number = rand::thread_rng().gen_range(1..101);

    println!("Please input your guess.");
    
    let mut guess = String::new();

    io::stdin().read_line(&mut guess)
        .expect("Failed to read line");

    println!("You guessed: {}", guess);
    println!("Secret number: {}", secret_number);
}
