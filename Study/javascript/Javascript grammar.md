# Javascript grammar



## 식별자

변수, 객체, 함수: lowerCamelCase

클래스, 생성자: UpperCamelCase; PascalCase

상수: UPPER_SNAKE_CASE



대소문자를 구분하며, 문자, `$`, `_` 로만 시작할 수 있다.

- 예약어(e.g.) for, if, case) 사용 불가능



선언: 변수를 생성하는 행위

할당: 선언된 변수에 값을 저장하는 행위

- 초기화: 선언된 변수에 처음으로 값을 저장하는 행위



### 변수 선언 키워드

|      let      |     const     |
| :-----------: | :-----------: |
| 재선언 불가능 | 재선언 불가능 |
|  재할당 가능  | 재할당 불가능 |
|  블록 스코프  |  블록 스코프  |

블록 스코프: (if, for, 함수 등의) 중괄호 내부를 가리키며, 블록 스코프를 가지는 변수는 블록 바깥에서 접근 불가능.

##### var

재선언 및 재할당 가능하며, 호이스팅* 되는 특성으로 사용하지 않는 것이 권장됨. 함수 스코프를 가진다.

- 호이스팅: 변수를 선언 이전에 참조할 수 있는 현상. 변수 선언 이전의 위치에서 접근 시 undefined를 반환.

- 험수 스코프: 함수의 중괄호 내부를 가리키며, 함수 밖에서 접근 불가능.



## 타입과 연산자



### 데이터 타입 종류

자바스크립트의 모든 값은 특정한 데이터 타입을 가짐.

크게 원시Primitive* 타입과 참조Reference\* 타입으로 분류됨



#### 원시 타입

객체가 아닌 기본 타입

변수에 해당 타입의 '값'이 담김

다른 변수에 복사할 때 실제 값이 복사됨



##### 숫자

정수, 실수 구분 없는 하나의 숫자 타입

부동소수점 형식을 따름

Infinity; 무한대

NaN; 계산 불가능한 경우 반환됨



##### 문자열

텍스트 데이터를 나타내는 타입

16비트 유니코드 문자의 집합

작은따옴표 또는 큰따옴표 모두 가능

- 템플릿 리터럴

  - ES6부터 지원되며, 따옴표 대신 백틱으로 표현함

  - 파이썬의 `f-string`처럼 `${expression}` 형태로 표현식의 삽입이 가능하다.

  - 원래 문자열에서는 let str = '안녕\n하세요.' 처럼 이스케이프 문자열을 활용해야 줄바꿈이 가능하지만,

    백틱(템플릿 리터럴)에서는 

    ```javascript
    let str = `안녕
    하세요`
    ```

    처럼 있는 그대로 엔터키를 쳐도 줄바꿈으로 인식함.



##### undefined

변수의 값이 없음을 나타내는 데이터 타입

선언 후 할당하지 않으면 자동으로 할당됨

- `typeof`(파이썬의 type 함수)로 자료형을 평가해보면, undefined가 반환됨



##### null

변수의 값이 없음을 의도적으로 표현할 때

- `typeof`(파이썬의 type 함수)로 자료형을 평가해보면, object가 반환됨



##### 불리언

논리적 참 또는 거짓을 나타내는 타입

true // false

조건문에서 불리언 타입이 아닌 값은 자동으로 형 변환됨.

- 0, -0, null, false, NaN, undefined, 빈 문자열이라면 false로, 그 외의 모든 값은 true가 됨

  - 파이썬과 다르게 비어있는 배열(object)에 대해서 true로 판단하게 됨

    ```javascript
    Boolean([])
    ```

    \> true

 

#### 참조 타입

객체 타입의 자료형

변수에 해당 객체의 참조 값이 담김

다른 변수에 복사할 때 참조 값이 담김; 얕은 복사와 깊은 복사를 고려해야 함.





### 연산자



##### 할당 연산자

`+=` `-=`, `*=`, `/=`; 피연산자의 평가 결과를 왼쪽 피연산자에 할당하는 연산자

`++`, `--` 1 단위로 증감; 에어비엔비 스타일 가이드에서는 권장하지 않음 (`+=`나 `-=`처럼 더 분명한 표현으로 적는 것을 권장)



##### 비교 연산자

피 연산자들을 비교하고, 비교의 결과값을 불리언으로 반환하는 연산자

알파벳끼리 비교할 경우

- a < z: 알파벳 오름차순으로 우선순위
- a < A: 소문자가 대문자보다 우선순위



##### 동등 비교 연산자( == )

암묵적 타입 변환을 통해 타입을 일치시킨 후 같은 값인지 비교

```javascript
const a = 1004
const b = '1004'
console.log(a == b)
```

\> true

- 예상치 못한 결과가 발생할 수 있으므로 특별한 경우를 제외하고 사용하지 않음



참고

```javascript
const a = 1004
const b = '1004'
console.log(a + b)
```

\> '10041004'

##### 일치 비교 연산자( === )

엄격한 비교가 이뤄지며 암묵적 타입 변환이 이뤄지지 않음: 주로 사용하는 비교 연산자



##### 논리 연산자

and 연산은 `&&`

or 연산은 `||`

not 연산은 `!`

- 단축 평가 지원
  - false && true ; false
  - true || true; true



##### 삼항 연산자

```javascript
console.log(true ? 1 : 2)  // 1
console.log(false ? 1 : 2)  // 2
```

조건식이 참이면 콜론 앞의 값, 아니면 콜론 뒤의 값



## 조건문과 반복문



### 조건문(if statement)

##### if, else if, else

- 조건은 소괄호 안에 작성, 실행할 코드는 중괄호 안에 작성; 블록 스코프 생성됨

  ```javascript
  if (condition) {
    // do sth
  } else if (condition) {
    // do sth
  } else {
    // do sth
  }
  ```

  - 중괄호 내부의 들여쓰기는 없어도 실행이 되지만, 가독성을 위해 2 spaces를 준다.



##### switch

```javascript
switch (expression) {
    case 'first value': {
        // do sth
    }
    case 'second value': {
        // do sth
        break
    }
    default: {
        // do sth
    }
}
```

표현식의 결과값과 case문의 오른쪽 값을 비교하여 같다면 case문 안의 코드를 실행한다.

- break 및 default문은 선택적으로 사용하며, break문이 없는 경우 break문을 만나거나 default문을 실행할 때까지 계속해서 다음 조건문들을 실행한다.
  - 예시의 경우 표현식의 결과값이 첫번째 케이스와 일치한다면 두번째 케이스 문 안의 코드까지 실행된다.
  - default문은 어떤 케이스도 만족되지 않을 때 실행된다.
- 블록 스코프 생성

if문이 더 자주 사용됨.

+) python 3.10버전에서 `match`문으로 해당 기능이 추가되었음



### 반복문

while, for, for in, for of



##### while

```javascript
while (condition) {
  // do sth
}
```

조건문이 참인 동안 반복, 조건은 소괄호 안에 작성

블록 스코프 생성



##### for

```javascript
 for (initialization; condition; expression) {
   // do sth
 }
```

##### 초기값; 조건; 값의 증감

초기값; 최초 반복문 진입시 1회만 실행됨

조건; 매 반복 시행 전 평가되는 부분- 해당 부분이 참인 동안 반복됨



##### for in

```javascript
for (variable in object) {
  // do sth
}
```

객체의 속성들을 순회할 때 사용

- 배열도 순회 가능하지만 권장하지 않음
  - 인덱스 순서대로 순회하지 않기 때문
  
  

key: value 형태인 객체를 순회할 때 파이썬에서는 .items()를 사용했지만, 자바스크립트에서는 .entries()를 사용하면 된다.

- let [key, value] of Object.entries(objectName)



##### for of

```javascript
for (variable in iterables) {
    // do sth
}
```

반복 가능한 객체를 순회하며 값을 꺼낼 때 사용

- 실행할 코드는 중괄호 안에 작성



## 함수



##### 선언식

```javascript
function add (num1, num2) {
    return num1 + num2
}
add(2, 7)
```



##### 표현식

```javascript
const sub = function (num1, num2) {
    return num1 - num2
}
sub(7, 2)
```

표현식* 내에서 함수를 정의하는 방식 (표현식: 어떤 하나의 값으로 결정되는 코드의 단위)

이름이 없는 함수인 익명 함수

- 익명 함수는 함수 표현식에서만 사용 가능

간단하게 변수에 함수를 정의해서 쓰는 것이라고 생각하면 되며, Airbnb Style Guide의 권장 방식이다.



##### 함수의 타입

함수도 하나의 값으로 평가되며, 선언식과 표현식 모두 function으로 같은 타입을 가진다.



##### 호이스팅- 함수 선언식

함수 선언식으로 선언한 함수는 var로 정의한 변수처럼 hoisting이 발생한다.

하지만 표현식으로 선언한 함수는 호이스팅 되지 않는다.



##### Arrow Function (표현식)

```javascript
const arrow = function (name) {
    return `hello! ${name}`
}
// 1. function 키워드 삭제
const arrow = (name) => { return `hello! ${name}` }

// 2. ()생략
const arrow = name => { return `hello! ${name}` }

// 3. {} return 생략
const arrow = name => `hello %{name}`
```



1. function 키워드 생략 가능
2. 매개변수가 단 하나라면 () 생략 가능
   - 매개변수가 없는 경우 빈 괄호를 넣거나 언더바`_`를 통해 매개변수가 없다는 것을 표시해야 함
3. 바디가 표현식 하나라면 {}과 return도 생략 가능



##### 그 외

참조 타입 중 function 타입에 속함

자바스크립트의 함수는 일급 객체에 속함

- 변수에 할당 가능
- 함수의 매개변수로 전달 가능
- 함수의 반환 값으로 사용 가능



### 배열



##### 배열의 정의와 특징

키와 속성들을 담고 있는 참조 타입의 객체

- 순서를 보장한다.
- 대괄호를 이용하여 생성하고, 0을 포함한 양의 정수 인덱스로 특정 값에 접근 가능하다.
  - 파이썬의 음수 인덱스는 사용이 불가능하다

- 배열의 길이는 array.length 형태로 접근 가능.
  - 마지막 배열의 원소의 인덱스는 [array.length - 1]



##### 메서드

reverse; 배열의 요소들의 순서를 반대로 정렬

push & pop; 배열의 가장 뒤에 요소를 추가/제거

unshift, shift; 배열의 가장 앞에 요소를 추가/제거

includes; 배열에 특정 값이 존재하는지 판별 후 참/거짓 반환

indexOf; 배열에 특정 값이 존재하는지 판별 후 첫 번째로 찾은 항목의 인덱스 반환, 없을 시 -1 반환

join; 배열의 모든 요소를 구분자를 이용하여 연결, 구분자 생략 시 쉼표`,` 기준으로 연결함

- array.join([seperator]) 형태 // <=> python; seperator.join(array)



##### 메서드 심화

배열을 순회하며 특정 로직을 수행하는 메서드들

메서드 호출 시 인자로 콜백*함수를 받는 것이 특징

- callback함수: 어떤 함수의 내부에서 실행될 목적으로 인자로 넘겨받는 함수를 뜻함

  - django에서 path(..., views.index, ...) 식으로 어떤 함수 내부에 인자로 들어있는 views.index 함수가 callback 함수라고 할 수 있음. 특정 조건에서 실행되는 함수.

    ```javascript
    array.forEach((element, index, array) => {
        // do sth
    })
    ```

    - 콜백 함수는 3가지 매개변수로 구성됨
      - 배열의 요소/ 요소의 인덱스/ 배열 자체



forEach; 배열의 각 요소에 대해 콜백 함수를 한 번씩 실행; 반환 값 없음

map; 콜백 함수의 반환 값을 요소로 하는 새로운 배열 반환

- forEach는 원본 배열을 수정하고, map은 새로운 배열이 만들어짐(변수로 받아야 함)

  ```javascript
  const numbers = [1, 2, 3, 4, 5]
  const doublenums = numbers.map((num) => {
      return num * 2
  })
  ```

  



filter; 콜백 함수의 반환 값이 참인 요소들만 모아 새로운 배열을 반환

reduce; 콜백 함수의 반환 값들을 하나의 값(acc)에 누적 후 반환

```javascript
array.reduce((acc, element, index, array) => {
    // do sth
}, initialValue)
```

- acc: 이전 callback 함수의 반환 값이 누적(저장)되는 변수
- initialValue: 최초 callback 함수 호출시 acc에 할당되는 값(초기값)으로, 선택적으로 설정 가능하며 기본값은 배열의 첫번째 값을 사용한다.
  - 빈 배열에서는 초기값을 설정하지 않으면 오류가 난다.

find; 콜백 함수의 반환 값이 참이면 해당 요소를 반환

some; 배열의 요소 중 하나라도 판별 함수를 통과하면 참을 반환

- 비어있는 배열은 false 반환

every; 배열의 모든 요소가 판별 함수를 통과하면 참을 반환

- 비어있는 배열은 true 반환



##### 배열 순회 비교

|         for          |        for of        |         forEach         |
| :------------------: | :------------------: | :---------------------: |
|      모든 환경       | 오래된 브라우저 불가 |      대부분의 환경      |
| break, continue 가능 | break, continue 가능 |  break, continue 가능   |
|    인덱스로 접근     |   요소에 직접 접근   | airbnb style guide 권장 |



### 객체

객체는 속성의 집합이며 중괄호 내부에 키와 값의 쌍으로 표현된다.

key는 문자열 타입만 가능하며, 띄워쓰기가 있는 경우에는 따옴표로 묶어서 표현한다.

객체 요소 접근은 `.` 또는 `[]`로 한다.

- 띄워쓰기가 있는 경우 대괄호 접근만 가능하다.



##### ES6 문법 1. 속성명 축약

```javascript
let books = ['learning JS', 'Eloquent JS']
let magazines = null

var bookShop = {
    books,
    magazines,
}
```

객체를 정의할 때 key와 할당하는 변수의 이름이 같으면 위와 같이 축약이 가능하다.



##### ES6 문법 2. 메서드명 축약

```javascript
const newObj = {
    greeting() {
        console.log('hi')
    }
}
```

메서드 선언 시 `function`을 축약 가능하다.



##### ES6 문법 3. 계산된 속성

```javascript
// 계산된 속성명 (ES6)
let i = 0;
let a = {
  ["foo" + ++i]: i,
  ["foo" + ++i]: i,
  ["foo" + ++i]: i
};

console.log(a.foo1); // 1
console.log(a.foo2); // 2
console.log(a.foo3); // 3

var param = 'size';
var config = {
  [param]: 12,
  ["mobile" + param.charAt(0).toUpperCase() + param.slice(1)]: 4
};

console.log(config); // { size: 12, mobileSize: 4 }
```



##### ES6 문법 4.  구조 분해 할당

```javascript
const userInformation = {
    name: 'ssafy kim',
    phoneNumber: '01012345678',
}
const { name } = userInformation
const { name, phoneNumber } = userInformation
```

- const name = userInformation.name이 아닌 바로 변수에 할당할 수 있다. 여러 가지의 변수를 한번에 할당할 수도 있다.



#### JSON (JavaScript Object Notation)

key-value 쌍의 형태로 데이터를 표기하는 언어 독립적 표준 포맷

- JSON.parse()
  - json을 자바스크립트 객체로 변환
- 