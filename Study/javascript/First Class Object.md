# 일급 객체



자바스크립트에서 함수는 일급 객체이다.

여기서 일급 객체는,

- 값으로 다룰 수 있다.
- 변수에 담을 수 있다.
- 함수의 인자로 사용될 수 있다.
- 함수의 결과로 사용될 수 있다.

또한 자바스크립트에서 함수가 일급 객체로 만들어진 이유는, 함수를 값으로 다루어 조합성과 추상화의 도구로 사용하기 위함이다.



# 고차 함수



고차 함수는 함수를 값으로 다루는 함수이다. 

이때 함수를 인자로 받아 실행하는 고차 함수는 다음과 같다.

```JS
const applyFunc = func => func(1)
const add1 = x => x + 1
applyFunc(add1)
// x => x + 1
// 1 => 1 + 1
```

`applyFunc(add1)`를 실행하면, 

'applyFunc' 함수는 `x`라는 변수를 받아 `x + 1`을 리턴하는 'add1' 함수를 인자로 받게 된다.

이때 'applyFunc'는 인자로 받은 함수에 1을 전달하여 평가하였다.



> 참조) 인자와 매개변수는 자주 혼용되어 쓰인다. 간단하게 함수 호출시에 함수에 전달되는 값( e.g.) f(인자) )은 인자, 매개변수는 함수 선언시에 인자를 받아들이는 변수이다. e.g.) def f(매개변수): 



...to be continued



> [클로저 - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures)