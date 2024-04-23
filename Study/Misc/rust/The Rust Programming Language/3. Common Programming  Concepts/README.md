> https://doc.rust-lang.org/book/ch03-01-variables-and-mutability.html



## 3.1 Variables and Mutability

안전한 코드를 위해서 기본적으로 변수에는 재할당이 되지 않는다. (immutable)

하지만 코드 작성의 편의성을 위해서 mutability가 있으면 상당히 유용하다.

- 변수명 앞에 `mut`을 붙임으로서 mutable하게 만들 수 있으며 읽는 이로 하여금 해당 변수는 언젠가 변경될 것이라는 의도를 전달할 수도 있다.



Mutable한 변수를 쓸 때에는 버그 외에도 성능 등 고려할 요소들이 존재한다.

- 큰 크기를 가지는 자료구조의 인스턴스(아마도 객체)를 수정할 때에는 원본을 수정하는 것이 해당 인스턴스를 복사 + 변경하는 것보다 빠를 수 있다.
- 작은 크기의 인스턴스들은 함수형 프로그래밍을 통해 아주 약간의 성능을 손해보더라도 더욱 명료한 프로그램을 짤 수 있다.



### Constants

`const` 로 선언하는 constant는 `mut`을 붙일 수 없고 항상 타입을 명시해야 한다. 또한 글로벌 스코프를 포함한 모든 스코프에서 선언될 수 있으므로 프로그램 내의 여러 곳에서 사용될 값을 선언하는 데 유용하다. 또한 선언된 스코프 내에서 프로그램이 동작하는 동안 항상 유효하다.  네이밍 컨벤션은 PASCAL_CASE이다.

```rust
const THREE_HOURS_IN_SECONDS: u32 = 60 * 60 * 3;
```

또한 특정한 표현식의 상수들(`constant expression`)은 컴파일 타임에 evaluate 되어, 조금 더 이해하기 쉬운 방식으로 변수를 작성(예시에서는 3시간임을 직관적으로 알 수 있음)할 수 있으며, 자세한 내용은 https://doc.rust-lang.org/reference/const_eval.html에서 확인할 수 있다.

- `let`으로 선언된 변수는 `constant expression` 이더라도 컴파일 타임에 평가되는 것이 보장되지 않는다.



### Shadowing

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



## 3.2 Data Types

러스트 컴파일러는 컴파일 시간에 모든 변수의 타입을 알아야 하며, 이는 러스트가 정적인 언어라는 것을 뜻한다. 보통 컴파일러는 변수의 타입을 추론할 수 있지만, 여러 가지 타입이 가능한 경우에는 명시적으로 표기해 주어야 한다.



### Scalar Types

스칼라는 하나의 값을 가지는 타입이다. 러스트의 주요 스칼라 타입은 정수, 부동소수점, 불리언, 캐릭터의 네 가지다.



#### Integer Types

`i32`: signed 32bit, -2^(32-1) ~ 2^(32-1) - 1

`u32`: unsigned 32bit, 0 ~ 2^32 - 1

`isize, usize`: follows system architecture’s bits

- used when indexing some collection



if an interger overflows:

- 디버그 모드: 프로그램은 런타임에 패닉할 것이다. ( which means program will exit with an error )

- 배포 모드: `u8`에 256이 저장되었다고 가정해 보자. 256은 0이 되고 257은 1이 되는 식으로 처음부터 다시 시작한다.

  오버플로 에러를 명시적으로 해결하기 위해서는 아래와 같은 방법이 있다.

  ```
  Wrap in all modes with the wrapping_* methods, such as wrapping_add
  Return the None value if there is overflow with the checked_* methods
  Return the value and a boolean indicating whether there was overflow with the overflowing_* methods
  Saturate at the value’s minimum or maximum values with saturating_* methods



#### Floating-Point Types

러스트의 부동소수점 타입에는 f32, f64가 있으며 64(bit)가 기본값이다. 현대 컴퓨터들은 충분히 빠르기에 더 정확한 64가 기본값이며 부동소수점은 signed이다. IEEE-754 표준에 따르면 32bit는 single precision, 64bit는 double precision이다.



#### Numeric Operations

러스트는 기본적인 +합, -차, *곱, /몫, %나머지 연산을 지원한다.



#### The Boolean Type

불리언은 `bool`로 표기하며 1바이트의 크기를 가진다.



#### The Character Type

Character는 러스트의 가장 원시적인 alphabetic 타입이다. `char` 타입은 스트링 리터럴과는 다르게 single quote으로 표현한다. 또한 4바이트 크기의 유니코드 스칼라 값으로, 이모지, 동북아 글자들도 표현할 수 있는 등 아스키보다 다양한 값을 나타낼 수 있다.



### Compound Types

여러 값을 한 타입에 담을 수 있는 compound 타입이다.



#### The Tuple Type

튜플은 선언할 때 고정된 길이를 바꿀 수 없다. 값들이 다른 타입을 가질 수는 있으며, 값들과 타입 모두 괄호 안에 쉼표로 구분한다(따로 정해진 튜플 타입명은 없는 듯 하다). 자바스크립트와 비슷하게 해체 할당이 가능하며, 파이썬과는 다르게 인덱스로 접근할 수 있다. (파이썬의 튜플은 인덱스로 접근할 수 없다.)

어떠한 값도 가지지 않는 튜플은 `()` 이며 ‘unit value’ 라고도 불리는 특별한 타입이기도 합니다. 표현식(expressions)은 어떠한 값도 리턴하지 않을 때 내부적으로는 ‘unit value’ 를 리턴한다.



#### The Array Type

배열의 모든 값들은 같은 타입이어야 하며, 다른 프로그래밍 언어와 다르게 러스트의 배열은 길이가 정해져 있다.

배열은 heap이 아닌 stack에 값들을 저장하거나 정해진 수만큼의 요소를 원할 때 유용하다. 배열은 길이 변경이 가능한 벡터만큼 유연하지 않으며, 둘 중 무엇을 써야 할 지 애매한 상황이라면 보통 벡터가 적합할 것이다.

12개월의 이름처럼 길이가 변할 필요가 없는 상황이라면 배열이 유용할 것이다. 타입을 선언할 때에는 `[i32; 5]` 처럼 타입 먼저, 세미콜론 이후에 길이를 적어주면 된다. 동일한 값으로 초기화가 필요하다면 `let visited = [false; size]` 이런 식으로도 표현이 가능하다.



##### Accessing Array Elements

파이썬, 자바스크립트와 동일하게 `array_name[index_number]`로 접근하면 된다.



##### Invalid Array Element Access

길이가 5인 배열에 (인덱스 >= 5)인 값을 통해 접근하려고 한다면, 런타임에 프로그램은 패닉(종료)할 것이다. 이는 러스트가 인덱스가 배열의 길이보다 작은지 검사하기 때문이며, 많은 로우 레벨 언어들과 다른 러스트의 메모리 안전 규칙을 엿볼 수 있는 부분이다. 인덱스 검사를 하지 않는 다른 언어였다면 해당 구문은 의도되지 않는 메모리를 읽어올 것이다.
