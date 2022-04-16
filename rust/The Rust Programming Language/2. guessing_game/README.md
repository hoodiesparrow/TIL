### let, match, enum-variants, Ok-Err



러스트에서 변수는 불변이며, `mut`을 붙여 가변 변수로 선언할 수 있다.

String은 표준 라이브러리에서 제공하는 확장 가능한(growable) UTF-8 인코딩의 문자열 타입이다.

`::`  으로 호출하는 함수는 특정 타입에 대한 연관함수이다. 한 인스턴스가 아니라 한 가지의 타입에 대해 존재하며, 다른 언어에서는 ‘정적 메서드’ 로 불린다.



`std::io::stdin()::read_line()` 은 입력을 저장하고 한 개의 값을 돌려준다. 이때 리턴값은 `io::Result()` 이다.

러스트는 표준 라이브러리에 여러 종류의 Result를 갖고 있으며, 열거형(enums)이다. 열거형은 정해진 값만 가질 수 있으며 해당 값들은 Result의 variants라고 불린다. Result는 Ok, Err의 variants를 가진다.



Result 타입도 다른 타입처럼 메서드를 가지고 있는데, 그중 `expect()` 의 경우 `Result` 인스턴스가 Err일 경우 프로그램의 작동을 멈추고 인자로 넘겼던 메세지를 출력한다. 또한 인스턴스가 Ok인 경우 Ok가 가지고 있는 결과값을 돌려준다.



`extern crate rand;` 외부 모듈을 불러온다. `use rand;` 로 표기할 수도 있다.

`$ cargo doc --open` 현재 프로젝트의 dependencies의 문서들을 빌드하여 웹페이지로 보여준다..!!



번역본이 아닌 공식문서로 바꾸면서 `rand` 버전을 업데이트 했는데, 인자를 (1, 101)로 받지 않고 `(1..101)`의 형태로 받도록 바뀐 걸 볼 수 있었다. 낮은 쪽은 이상, 높은 쪽은 미만인 점은 같았지만 `(1..=100)` 이렇게 하면 100 이하로 설정할 수도 있다고 한다.



```rust
use std::cmp::Ordering

		match guess.cmp(&secret_number) {
        Ordering::Less => println!("Too small!"),
        Ordering::Greater => println!("Too big!"),
        Ordering::Equal => println!("You win!"),
    }
```

std::cmp::Ordering 타입을 스코프로 가져온다. 

`guess` 변수를 `secret_number` 와 대소관계를 비교하기 위해 `guess.cmp`를 호출한다.

이때 `.cmp` 메서드는 호출된 변수를 주어진 인자에 대해 비교한다. 결과에 따라 Ordering 타입(enum)의 variant 중 하나(Less, Greater, Equal)을 반환한다.

`match` 구문은 switch와 비슷한 느낌인 것 같다. `cmp` 메서드가 반환한 variant를 쉼표로 구분된 ‘arm’과 비교해서 해당하는 ‘arm’을 실행한다.



이때 코드는 컴파일되지 않는데, 이유는 간단하다. 처음 guess를 선언할 때 `String::new()` 구문을 썼기 때문에 자연히 guess의 타입은 String이 되었고, 스트링을 숫자와 비교하니 에러가 났다.

```rust
    let guess: u32 = guess.trim().parse().expect("Please type a number!"); 
```

러스트는 shadowing을 허용하므로, `guess`를 다시 선언해 주었다. 자바스크립트나 파이썬이였다면 guess = guess.method() 식으로 했을 텐데 굳이 다시 선언한 이유를 잘은 모르겠지만 3장에서 다시 다룬다고 한다.

숫자를 입력할 때 엔터를 치며 들어가는 개행문자를 떼기 위해 `trim()`, 숫자형으로 바꾸기 위해 `parse()`, 마지막으로 `parse()`가 Ok가 아닌 Err를 리턴했을 때(숫자로 변환할 수 없을 때)를 위해 `.expect()` 까지 달아주었다. 문자열 다루기 편했던 언어만 하다 접하니 불편하게 느껴진다.



여러 번의 시행을 위해 `loop {}` 내부에 입력받는 부분부터 끝까지를 넣어 주었다.

또한 유효하지 않은 입력을 받았을 때 프로그램이 멈추는 것을 방지하기 위해서,

```rust
        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => continue,
        };
```

guess를 다시 선언할 때 `match` 구문을 이용한다. Ok일 경우 num을 그대로 반환, Err인 경우 루프의 처음부터 다시 시작한다.

마지막으로 답을 맞춘 경우 break;를 통해 루프를 멈춰준다.
