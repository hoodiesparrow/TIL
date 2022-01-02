# JavaScript ES6



## Block Scope

##### ES5

```js
function hasValue(p) {
  console.log(v)  // undefined
  if (p) {
    var v = 'blue'
    console.log(v)  // blue
  } else {
    var v = 'red'
    console.log(v)
  }
  console.log(v)  // blue
}

hasValue(10)
```

- Note : 첫 번째 로그는 호이스팅에 의해 `undefined`를 출력



##### ES6

```js
function hasValue(p) {
  console.log(v)  
  if (p) {
    let v = 'blue'
    console.log(v) 
  } else {
    let v = 'red'
    console.log(v)
  }
  console.log(v)  
}

hasValue(10)  // uncaught error: v is not defined
```



### 호이스팅

##### TDZ: Temporal Dead Zone

스코프의 시작부터 `let`, `const`로 변수를 선언하기 전까지는 변수를 사용할 수 없음을 뜻하는 용어

##### ES5

 ```js
 (function() {
   var a = 10
   (function() {
     console.log(a)  // undefined
     var a = 20 
   })()
 })()
 ```

##### ES6

```js
if (true) {
  let a = 10
  if (true) {
    console.log(a)  // reference error: a is not defined
    const a = 20
  }
}
```

- ES5와 6 모두 같은 이름의 변수 `a`를 상위 스코프에서 찾지 않고 해당 스코프에서 찾았음
  - 이는 `var`|`let`|`const `모두 hoisting이 된다는 뜻
  - 하지만 `var`는 추가적으로 `undefined`를 할당하지만 `let`과 `const`는 값을 할당하지 않음
    - 즉 `let`과 `const`는 호이스팅 되더라도 선언만 되고 할당은 되지 않음 => TDZ



### This

##### ES5

```js
var value = 0
var obj = {
  value: 1,
  setValue: function() {
    this.value = 2  // this: obj
    (function () {
      this.value = 3  // this: window
     })()
  }
}
obj.setValue()
console.log(value)
console.log(obj.value)
```

- `setValue ` 내부에서 처음 할당한 `this.value`의 경우 `this`가 `obj`를 가리키고 있음
  - 이는 `obj`의 `setValue`라는 메서드를 사용한 것이기 때문
- `setValue` 내부에서 다시 익명 즉시실행 함수로 할당한 `this.value`의 경우 `this`가 `window`를 가리키고 있음
  - 이는 메서드가 아닌 일반 함수이기 때문
  - 결과적으로 `window.value`에 3이 할당됨



이때 `this`를 넘겨주고자 한다면,

```js
  setValue: function() {
    this.value = 2  // this: obj
    (function () {
      this.value = 3  // this: window
     }).call(this)
  }
```

- `call` 또는 `apply`를 사용하거나

```js

    setValue: function() {
    this.value = 2  // this: obj
    var self = this
    (function () {
      self.value = 3  // this: window
     }).call(this)
  }
```

- 변수에 `this`를 할당



##### ES6

```js
var value = 0
var obj = {
  value: 1,
  setValue: function() {
    let a = 10
    this.value = 2  // this: obj
    {
      let a = 20
      this.value = 3
    }
  }
}
obj.setValue()
console.log(value)
console.log(obj.value)
```

- 함수스코프와 다르게 변수 뿐만 아니라 `this` 또한 상위의 `this`를 그대로 사용



### For

```js
var funcs = []
for (var i = 0; i < 10; i++) {
  funcs.push(function() {
    console.log(i)
  })
}
funcs.forEach(function(f) {
  f()
})
// 10 10 10 10 10 10 10 10 10 10
```

- 함수의 실행 컨텍스트는 함수가 실행될 때 열림
  - 변수의 호이스팅
  - `this`를 바인드
  - 내부에 없는 변수를 외부에서 찾음
- 이때 forEach문에서 함수가 실행될 때 `i`는 내부에 없으므로 외부에서 찾게 됨
  - for문에서 `i`는 이미 10까지 증가한 상황이므로 10이 출력됨

##### 함수로 해결하기

```js
var funcs = []
for (var i = 0; i < 10; i++) {
  funcs.push((function(v) {
    return function() {
      console.log(v)
    }
  })(i))
}
funcs.forEach(function(f) {
  f()
})
```

- 즉시실행함수를 통해 `v`에 현재의 `i`값을 담아 함수를 배열에 푸시했다.(클로저 활용)
  - 함수를 감싸고 있는 함수가 실행될 때의 컨텍스트가 생성됨

##### let으로 해결하기

```js
let funcs = []
for (let i; i = 0; i++) {
  funcs.push(function() {
    console.log(i)
  })
}
funcs.forEach(function(f) {
  f()
})
```

- `let`으로 `i`를 선언하게 되면, 블록스코프가 생성되어 for문이 끝난 뒤 함수를 실행하더라도 개별적인 `i`값이 남아 정상적으로 작동하게 된다.
  - 메모리 소모를 덜 할수 있는 환경이 된 것. 클로저 내부의 변수는 계속해서 남아있기 때문.



### Let과 Const

> let은 값의 변경이 필요한 예외적인 경우에 사용



```js
let a  // no error
const a  // Missing initializer in const declaration
```

- `let`의 경우 선언과 할당을 따로 할 수 있으나, `const`의 경우 선언과 할당을 동시에 해야 함.
  - 이는 '상수' 라는 개념을 구현한 것이기에 빈 값을 할당하고 다시 할당하고자 하는 값을 할당하지 못하게 하는 것.

```js
const OBJ = {
    prop: 1
}
OBJ.prop = 2

```

- `OBJ`에는 객체의 주소가 할당되었으므로 다른 객체를 할당할 수는 없지만 해당 객체를 수정할 수 있음.



참고:

```js
let a = {
    prop: 1
}
const b = a
a = 20

console.log(a, b)  // 20, {prop: 1}
```

- `a`에서 생성된 객체의 주소를 `b`가 참조
  - `a`에는 숫자 리터럴을 재할당, 이는 `a`가 참조하는 주소가 바뀐 것
  - `b`는 여전히 같은 객체의 주소를 참조



### 객체를 상수로

##### Object.freeze()

```js
const OBJ = {
    prop: 1,
    arr: [1, 2, 3],
}
Object.freeze(OBJ)
OBJ.prop1 = 10  // does not emit error(es5)
console.log(OBJ)

OBJ.arr[1] = 20
console.log(OBJ)  // prop: 1, [1, 20, 3]
```

- 객체 내부에서 참조하고 있는 객체는 freeze되지 않음
  - deep freeze를 하기 위해서는 deep copy와 동일하게 재귀를 이용해야 함.



### var와 전역객체

```js
var a = 10
console.log(window.a)  // 10
console.log(a)  // 10
delete a  // false
console.log(window.a)  // 10
console.log(a)  // 10
```

- `var`로 변수를 선언하게 되면 전역변수임과 동시에 전역객체의 프로퍼티가 됨
  - `delete`로 전역객체의 속성인 `a`를 지우려고 해도 전역변수이므로 지워지지 않음

```js
let c = 10
console.log(window.c)  // undefined
console.log(c)  // 10
delete c  // false => delete는 객체의 속성을 지우는 명령

window.c = 10
delete c  // true
```

- `var` <=> `let | const`를 같은 전역변수로 사용하더라도 다르게 동작하는 모습을 확인할 수 있음
  - `let | const`의 경우 전역객체의 속성이 되지 않음



### 템플릿 리터럴

