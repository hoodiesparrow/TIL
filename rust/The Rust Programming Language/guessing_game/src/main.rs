use std::io;

// main 함수는 프로그램의 진입점입니다.
fn main() {
    println!("Guess the number!");
    
    println!("Please input your guess.");
    
    let mut guess = String::new();
    // 러스트에서 변수는 기본적으로 불변입니다. 변수 앞에 mut을 이용하여 가변변수를 만듭니다.
    // String은 표준 라이브러리에서 제공하는 확장 가능한(growable) UTF-8 인코딩의 문자열 타입입니다.

    // ::new에 있는 ::는 new가 String 타입의 연관함수 임을 나타냅니다.
    // 연관함수는 하나의 타입을 위한 함수이며, 이 경우에는 하나의 String 인스턴스가 아니라 String 타입을 위한 함수입니다. 
    // 몇몇 언어에서는 이것을 정적 메소드 라고 부릅니다.
    
    // 요약하자면 let mut guess = String::new(); 라인은 새로운 빈 String 인스턴스와 연결된 가변변수를 생성합니다.

    io::stdin().read_line(&mut guess)
        .expect("Failed to read line");
    // 4장에서 참조자(&)에 대해 전체적으로 설명할 것입니다.
    // 지금 당장은 참조자가 변수처럼 기본적으로 불변임을 알기만 하면 됩니다. 따라서 가변으로 바꾸기 위해 &guess가 아니라 &mut guess로 작성해야 합니다.
    
    println!("You guessed: {}", guess);
}
