fn main() {
    let mut x = 5;
    println!("The value of x is: {}", x);
    x = 6;
    println!("The value of x is: {}", x);

    let m = 10 / 12;
    println!("value of m: {}", m);

    let boolean: bool = false;
    println!("{}", boolean);

    let character: char = '김';
    println!("{}", character);

    let tuple: (i32, f64, char) = (256, 2.56, '이');
    let (x, y, z) = tuple;
    println!("{}, {}, {}", x, y, z);

    let unit_value: () = ();

    let months = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"];
    
    let a: [i32; 5] = [1, 2, 3, 4, 5];

    let b = [false; 10];
}
