> https://doc.rust-lang.org/book/ch03-01-variables-and-mutability.html



### 3.1.1. Variables and Mutability

안전한 코드를 위해서 기본적으로 변수에는 재할당이 되지 않는다. (immutable)

하지만 코드 작성의 편의성을 위해서 mutability가 있으면 상당히 유용하다.

- 변수명 앞에 `mut`을 붙임으로서 mutable하게 만들 수 있으며 읽는 이로 하여금 해당 변수는 언젠가 변경될 것이라는 의도를 전달할 수도 있다.



Mutable한 변수를 쓸 때에는 버그 외에도 성능 등 고려할 요소들이 존재한다.

- 큰 크기를 가지는 자료구조의 인스턴스(아마도 객체)를 수정할 때에는 원본을 수정하는 것이 해당 인스턴스를 복사 + 변경하는 것보다 빠를 수 있다.
- 작은 크기의 인스턴스들은 함수형 프로그래밍을 통해 아주 약간의 성능을 손해보더라도 더욱 명료한 프로그램을 짤 수 있다.



### 3.1.2. Constants

`const` 로 선언하는 constant는 `mut`을 붙일 수 없고 항상 타입을 명시해야 한다. 또한 글로벌 스코프를 포함한 모든 스코프에서 선언될 수 있으므로 프로그램 내의 여러 곳에서 사용될 값을 선언하는 데 유용하다. 또한 선언된 스코프 내에서 프로그램이 동작하는 동안 항상 유효하다.  네이밍 컨벤션은 PASCAL_CASE이다.

```rust
const THREE_HOURS_IN_SECONDS: u32 = 60 * 60 * 3;
```

또한 특정한 표현식의 상수들(`constant expression`)은 컴파일 타임에 evaluate 되어, 조금 더 이해하기 쉬운 방식으로 변수를 작성(예시에서는 3시간임을 직관적으로 알 수 있음)할 수 있으며, 자세한 내용은 https://doc.rust-lang.org/reference/const_eval.html에서 확인할 수 있다.

- `let`으로 선언된 변수는 `constant expression` 이더라도 컴파일 타임에 평가되는 것이 보장되지 않는다.



### 3.1.3 Shadowing

2장에서 봤던 것처럼, 선언된 변수명과 같은 변수명을 가지는 변수를 다시 선언할 수 있다. 이때 이미 선언되었던 변수가 shadowed 되었다고 한다.

```rust
    let x = 5;
    let x = x + 1;

    {
        let x = x * 2;
        println!("The value of x in the inner scope is: {}", x);
    }

    println!("The value of x is: {}", x);
```

- `x`의 값은 5, 6, 스코프 내에서 12, 스코프가 끝난 후 6으로 변화한다.



 `mut` 키워드를 사용하는 것은 변수를 계속해서 재할당 가능하도록 만들지만, shadowing을 사용하면 해당 변수의 값에 변화를 주더라도 계속해서 immutable하게 유지할 수 있다는 점이 다르다.

- 또한 `let` 키워드를 통해 변수를 다시 선언하므로, 변수의 타입을 바꿀 수도 있다.

  ```rust
      let spaces = "   ";
      let spaces = spaces.len();
  ```

  - 만약 `mut` 키워드가 붙은 spaces로 같은 동작을 한다면 타입 차이로 인해 컴파일 에러가 날 것이다.

