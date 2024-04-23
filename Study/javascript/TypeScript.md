# **TypeScript**

> https://www.youtube.com/watch?v=5oGAkQsGWkc

Runtime에 변수의 타입이 결정되어 코드가 잘못되는 경우 Client가 에러를 볼 수 있는 동적 언어인 Javascript와 달리, 컴파일 타임에 타입이 결정되는 정적 언어이다.

### **예제**

```
function showItems(arr: number[]) {
    arr.forEach((item) => {
        console.log(item)
    })
}

showItems([1, 2, 3])
```

- arr: number[] => 숫자 배열
  - item에 자동으로 숫자 속성 할당
  - arr: Array<number> 식으로도 가능

```
let b: [string, number]
b = ['z', 1]

b[0].toLowerCase()
b[1].toLowerCase()  // error
```

- tuple 식으로 인덱스에 맞춰 타입 선언
  - 정적 언어 => 미리 타입이 평가되기 때문에, `b[0].` 입력시 string 타입에서 사용할 수 있는 메서드들이 스니펫으로 뜬다. 에러 찾기 + 편의성

`void` : 리턴값이 없는 함수

`never` : 에러 또는 계속 반복되는 함수

`enum` : 파이썬의 enumerate, 0~N-1이 아닌 직접 값을 지정해줄 수도 있음

```
enum Os {
    Window = 'win',
    Ios = 'ios',
    Android = "and"
}

let myOs: Os
myOs = Os.Window
```

`null, undefined` : let a: null = null 식으로 사용

```
object
let user: object

user = {
    name: 'xx',
    age: 30
}

console.log(user.name)  // 에러발생
```

위의 코드는 작동하지 않음. object에는 특정 속성값에 대한 정보가 없기 때문

이런 경우에는 `interface` 를 정의하면 된다.

```
interface User {
    name: string,
    age: number,
    gender?: string,
    readonly birthYear: number
}

let user: User = {
    name: 'xx',
    age: 30,
    birthYear: 2000
}

user.age = 28
user.gender = 'male'
user.birthYear = 1000  // 쓰기불가
console.log(user)
```

- `gender?` optional value
- `readonly birthYear` cannot change assigned value

`interface`(cont)

```
interface User {
    ...,
    [grade: number]: string,
}

let user: User = {
    ...,
    1: 'A',
    2: 'B'
}
```

- 문자열 인덱스
  - 대괄호 내부의 첫 문자열은 의미없는 단순 이름 => key: number 식으로 작성해도 괜찮음

문자열 리터럴 타입

```
type Score = 'A' | 'B' | 'C' | 'F'

interface User {
    ...,
    [grade: number]: Score,
}
```

`interface` 를 활용한 함수 선언

```
interface Add {
    (num1: number, num2: number): number
}

const add: Add = function(x, y) {
    return x + y
}

interface IsAdult {
    (age: number): boolean
}

const a: IsAdult = (age) => {
    return age > 19
}
```

괄호 안에 arguments에 대한 타입 정의, (): 에 반환값의 타입 정의

- 인터페이스와 함수의 인자 이름이 달라도 괜찮음.

`interface` 를 활용한 클래스

```
interface Car {
    color: string,
    wheels: number,
    start(): void,
}

class Bmw implements Car {
    color;
    wheels = 4;
    constructor(c: string) {
        this.color = c;
    }
    start() {
        console.log('gogo');
    }
}

const yourCar = new Bmw('green')
```

`interface` 확장

```
interface Car {
    color: string,
    wheels: number,
    start(): void,
}

interface Toy {
    name: string,
}

interface ToyCar extends Car, Toy {
    price: number
}
```

### **함수**

```
function hell(name?: string) {
    return `Hello, ${name || 'world'}`
}

const result = hello()  // error
```

name 인자가 비어있는 경우를 위해 ?를 추가하여 optional로 처리 가능

- 당연히 인자의 타입은 undefined, string 둘 중의 하나이여야 함
  - 필수 매개변수가 먼저 나와야 함. (age?: number, name: string) => 이런 식으로 쓰지 말라는 뜻

rest parameter

```
function add(...nums: number[]) {
    return nums.reduce((result, num) => result + num, 0)
}

add(1, 2, 3, 4, 5, 6, 7)
```

overloading

```
interface User {
    name: string,
    age: number
}

function join(name: string, age: number | string): User | string {
    if (typeof age === 'number') {
        return {
            name,
            age,
        }
    } else {
        return '나이는 숫자로 입력해주세요.'
    }
}

const sam: User = join('Sam', 30)  // error
```

함수 내부의 코드상으로는 문제가 없는 것 같지만, 타입만 보았을 때는 User나 string 중 어떤 게 반환되는 지 알 수가 없음.

따라서,

```
...,
function join(name: string, age: number): User
function join(name: string, age: string): string
function join(name: string, age: number | string): User | string {
    if (typeof age === 'number') {
        return {
            name,
            age,
        }
    } else {
        return '나이는 숫자로 입력해주세요.'
    }
}

const sam: User = join('Sam', 30)
```

이런 식으로 오버로딩을 통해 들어오는 인자의 값이나 갯수에 따라 다르게 동작하도록? 반환값의 타입을 지정하도록? 할 수 있음.