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
 (function () {
   var a = 10
   (function () {
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
      -  호이스팅 되었을 때 참조할 메모리가 할당되지 않았다는 뜻 <=> `var`의 경우 메모리가 호이스팅 되었을 때 메모리가 할당된다.

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
  setValue: function () {
    this.value = 2  // this: obj
    (function () {
      this.value = 3  // this: window
     }).call(this)
  }
```

- `call` 또는 `apply`를 사용하거나

```js

    setValue: function () {
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
  setValue: function () {
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
  funcs.push(function () {
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
  funcs.push((function (v) {
    return function () {
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
  funcs.push(function () {
    console.log(i)
  })
}
funcs.forEach(function (f) {
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

```js
const linesToHTML = function (characters) {
  return characters.reduce(function (charactersResult, character) {
    let {name, lines} = character
    return `${chractersResult || ''}
<article>
  <h1>${name}</h1>
  <ul>
    ${lines.reduce(function (linesResult, line) {
      return `${linesResult} || ''
      <li>${line}</li>
      `.trim()})}
  </ul>
</article>
  `.trim()}, 0)
}

const characters = [{
  name: 'Aria',
  lines: ['A girl has no name.']
}, {
  name: 'John Snow',
  lines: [
    'You know nothing, John Snow.',
    'Winter is coming.'
  ]
}]

document.body.innerHTML = linesToHTML(characters)
```

- 템플릿 리터럴을 통해 'jsp', 'php', 'handlebars'와 같은 템플릿 언어/엔진/라이브러리의 기능을 구현할 수 있다.
  - 이때 indentation이 헷갈릴 수 있으므로 `백틱`은 올바른 들여쓰기를 한 후 `trim()`을 이용해 다듬을 수 있다.
  - 위의 코드에서는 `characters` 객체를 `reduce` 메서드를 활용해 합친 객체 내부의 속성(이름, 대사)들을 스트링 형태의 HTML로 작성했고, `innerHTML`로 문서에 삽입했다.



```js
console.log(`${[0, 1, 2]}`)  // 0,1,2
console.log(`${{a: 1, b: 2}}`) [object object]
console.log(`${function(){return 1}}`)  // function () {....}
console.log(`${(() => 1)()}` + 1)  // 11
```

- 템플릿 리터럴은 `toString()`과 같은 동작을 한다.
  - 마지막 줄의 즉시실행함수에서 반환된 1은 `toString`을 거쳐 문자열 '1'이 되었고, 암묵적 형변환에 의해 문자열 '11'이 되었다.



### ForEach

for문과 크게 다르지 않음

```js
const arr = [1, 2, 3]
arr.forEach(function (val, idx, thisArg) {
    console.log(val, idx, thisArg)  
}, 'this becomes this')
// 1 0 'this becomes this'
// 2 1 'this becomes this'
// 3 2 'this becomes this'
```

- `arr.forEach(callback(currentvalue[, index[, array]])[, thisArg])`



### Map

배열을 순회하여 새로운 배열을 만드는 목적

```js
const arr = [1, 2, 3]
const b = arr.map(function (val, idx, thisArg) {
    return val[idx] * 2
}, 'thisArg')
console.log(b)  // [2, 4, 6]
```

- `arr.map(callback(currentValue[, index[, array]])[, thisArg])`
- 순회하며 반환된 값을 모아 배열로 만들기에 return이 필수



### Reduce

배열을 순회하며 값을 누적하는 등 다른 무언가를 만드는 목적

```js
const arr = [1, 2, 3]
const res = arr.reduce(function (pre, cur, idx) {
    return pre + cur
}, 0)
console.log(res)  // 6
```

- ```
  arr.reduce(callback[, initialValue])
  ```

  - 콜백은 필수인자인 `이전 값`, `현재 값`과 인덱스, 배열인자를 받음
  - 메서드에 `initialValue` 인자를 넘겨주지 않으면 원래 인덱스 0번이 초기값이 되며, 원래 인덱스 1번이 0번으로 시작

- 순회하며 값을 누적해야 하므로 return이 필수



```js
const arr = ['a', 'b', 'c']
const obj = arr.reduce(function (res, item) {
    res[item] = item
    return res
}, {})
console.log(obj)  // {a: 'a', b: 'b', c: 'c'}
```

- 객체, 문자열, 숫자 등 편리한 사용 가능



### Template Tag Function

```js
const tag = function (strs, arg1, arg2) {
    return {strs: strs, args: [arg1, arg2]}
}
const res = tag `이건 ${1} 태그함수 ${2}`
console.log(res)

// {
//  	strs: ["이건 ", "태그함수 ", ""],
//      args: [1, 2]
// }
```

- 함수명 뒤에 템플릿 리터럴을 작성하면(띄어쓰기는 상관없음) 해당 리터럴을 인자로 함수를 호출 => 괄호 대신 템플릿 리터럴을 작성하는 것

  - 이때 백틱과 표현식 사이, 표현식과 표현식 사이에 있는 문자열은 배열에 담아져 첫 번째 인자로 들어감

    - 사이가 빈 공간이여도 빈 문자열로 배열에 담아지므로, 항상 문자열 배열의 길이가 표현식 배열보다 1만큼 더 길다

  - 개별 표현식들은 순서대로 2번째 인자, 3번째 인자, n + 1 번째 인자로 들어감

    

```js
const setDecimalSeperators = function (strs, ...args) {
    return args.reduce((p, c, i) => {
        return p + strs[i] + (c + '').replace(/\d{1, 3}(?=(\d{3})+(?!\d))/g, '$&,')
    }, '') + strs[strs.length - 1]
}
const res = setDecimalSeperators `이 사과는 하나에 ${2000}원이고, 총 ${1234567}개를 구입하시면 총 ${2000 * 1234567}원입니다.`
console.log(res)
```

- 태그 함수를 활용하여 표현식으로 나타난 숫자들을 정규식으로 3자리마다 콤마를 찍어주는 코드이다.
  - 끝의 `+ strs[strs.length - 1]`는 리듀스 결과물이 포함하지 못하는 마지막 스트링을 더해준다.



##### String.raw

태그함수를 호출했을 때 `args`, `strs` 외에도 `raw`라는 프로퍼티가 하나 더 추가되어 있는데, 이것은 `\n` 이 줄바꿈으로 변환되어 나타나는 `strs`와 다르게 원래의 `\n`로 나타내는 등 입력된 문자열이 그대로 담겨져 있는 배열이다.

`String.raw`를 태그함수로 호출할 수도 있다.

```js
String.raw `스트링 ${1} \n\n`
// '스트링 1 \\n\\n'
```



### Parameter

##### Default Parameter

```js
const f = (x, y, z) => {
    x = x !== undefined ? x : 4
    y = typeof y !== 'undefined' || 5
    if (!z) z = 6;
    console.log(x, y, z)
}
f(0, null)
// 0 true 6
```

- 기존 매개변수 처리법



```js
const f = (x = 4, y = 5, z = 6) => {
    console.log(x, y, z)
}
f(0, null)
// 0 null 6
```

- falsy한 값도 `undefined` 또는 `누락된 값`이 아니라면 입력된 값이 사용된다.

- `let`선언과 비슷하게 동작하므로 표현식을 할당할 수 있다. (함수 호출도 가능)

  ```js
  function a (a = 1, b = c + 1, c = 3) {
      console.log(a, b, c)
  }
  a(1, undefined, 3)
  // 순서에 신경써야 함
  ```

  - 순서에 신경써야 한다는 것은 `let`선언처럼 동작하기 때문이며, TDZ에 걸린다는 뜻

    참조)

    ```js
    let a = a
    // reference error
    
    1) let a  // no mem alloc
    2) a?
    3) reference error
    ```

    자신을 할당했을 때 에러가 나는 순서

    - `let a`가 호이스팅됨
    - 우변의 `a`를 찾으나 호이스팅된 좌변의 `a`는 아직 메모리가 할당되지 않음
    - 참조할 수 있는 메모리가 없으니 레퍼런스 에러 발생

