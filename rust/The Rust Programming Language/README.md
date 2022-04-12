# The Rust Programming Language

> https://rinthel.github.io/rust-lang-book-ko/ch00-00-introduction.html

유튜브 영상보다는 보다 정제된 문서를 보고 개념을 익히고자 한다.



### 1. 시작하기

설치, 카고 등은 접한 적이 있어서 빠르게 넘어갔다.



### 2. 추리 게임 튜토리얼

```bash
$ cargo new guessing_game --bin
$ cd guessing_game
```

- `--bin`: 바이너리 => 라이브러리가 아닌 실행 가능한 프로그램 생성
  - 이후 내용은 해당 프로젝트 참조



##### Summary

러스트에서 변수는 불변이며, `mut`을 붙여 가변 변수로 선언할 수 있다.

String은 표준 라이브러리에서 제공하는 확장 가능한(growable) UTF-8 인코딩의 문자열 타입이다.

`::`  으로 호출하는 함수는 특정 타입에 대한 연관함수이다. 한 인스턴스가 아니라 한 가지의 타입에 대해 존재하며, 다른 언어에서는 ‘정적 메서드’ 로 불린다.



`std::io::stdin()::read_line()` 은 입력을 저장하고 한 개의 값을 돌려준다. 이때 리턴값은 `io::Result()` 이다.

러스트는 표준 라이브러리에 여러 종류의 Result를 갖고 있으며, 열거형(enums)이다. 열거형은 정해진 값만 가질 수 있으며 해당 값들은 Result의 variants라고 불린다. Result는 Ok, Err의 variants를 가진다.



Result 타입도 다른 타입처럼 메서드를 가지고 있는데, 그중 `expect()` 의 경우 `Result` 인스턴스가 Err일 경우 프로그램의 작동을 멈추고 인자로 넘겼던 메세지를 출력한다. 또한 인스턴스가 Ok인 경우 Ok가 가지고 있는 결과값을 돌려준다.



`extern crate rand;` 외부 모듈을 불러온다. `use rand;` 로 표기할 수도 있다.

`$ cargo doc --open` 현재 프로젝트의 dependencies의 문서들을 빌드하여 웹페이지로 보여준다..!

