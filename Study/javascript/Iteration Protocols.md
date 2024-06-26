# Iteration Protocols



### ES5

for 구문에서 `.length`와 인덱스를 이용하여 순회했음

```js
var list = [1, 2, 3]
for (var i=0; i < list.length; i++) {}
```

### ES6

for of 구문으로 선언적으로 순회하도록 바뀌었음

```js
const list = [1, 2, 3]
for (let item of list) {}
```



##### 차이점

set 또한 for of 구문으로 순회할 수 있음

- 내부적으로 for 구문으로 짜여지지 않았다는 것 (set에서도 동작)

  ```js
  const set = new Set([1, 2, 3]);
  for (let item of set) {
    console.log(item)  // 1 2 3
  }
  ```

  - 만약 for 구문으로 짜여져 있었다면? set은 인덱스로 접근할 수 없으므로 `undefined`가 출력될 것이며, 이는 `map` 구조에서도 동일

    ```js
    const set = new Set([1, 2, 3])
    for (let i = 0; i < 3; i += 1) {
      console.log(set[i])
    }
    // undefined, undefined, undefined
    ```

    

- ObjectName.Symbol.iterator => 이터러블/이터레이터 프로토콜

  - 이터러블 : 이터레이터를 반환해주는 `Symbol.iterator()`를 가지고 있는 값
  - 이터레이터 : { value, done } 객체를 리턴하는 `next()`를 가진 값
    - done === true이면 루프가 끝난다. 
  - 이터러블/이터레이터 프로토콜 : 순회 가능한 객체를 for of, 전개 연산자 등과 함께 동작하도록 하는 규약

```js
const list = [1, 2, 3]
const iterator = list[Symbol.iterator]();
iterator.next();
for (const item of iterator) {
  log(item)  // 2 3
}
```

- 실제 이터레이터를 확인할 수 있다.
  - set에서도 똑같이 동작하며, 이는 



##### Map

> `Map`은 키-값 쌍들이 추가된 순서대로 저장되는 객체이다.  [[Map - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

```js
const map = new Map([['a', 1], ['b', 2], ['c', 3]])
for (const pair of map) {
  console.log(pair)  // ['a', 1] ['b', 2] ['c', 3]
}
```

마찬가지로 이터레이터를 가지고 있다.

Map의 경우에는  키값을 반환하는 `Map.keys()`, 값 `Map.values()`, 키-값을 반환하는 `Map.entries()` 함수를 가지고 있다. `Map.values()`는 이터레이터(MapIterator)를 반환하고, 이 이터레이터는 다시 `Symbol.iterator`를 가지고 있어서 다음과 같은 코드가 가능하다. 

```js
const map = new Map([['a', 1], ['b', 2], ['c', 3]])
for (const key of map.keys()) {console.log(key)};
for (const value of map.values()) {console.log(value)};
for (const entry of map.entries()) {console.log(entry)};
```



# Custom Iteration Protocols

사용자 정의 이터레이터를 만들어 보자

```js
const iterable = {
    [Symbol.iterator]() {
        let i = 3;
        return {
            next() {
                return i === 0 ? { done: true } : { value: i--, done: false }
            }
        }
    }
}
let iterator = iterable[Symbol.iterator]();
console.log(iterator.next()) //  { value: 3, done: false }
console.log(iterator.next()) //  { value: 2, done: false }
console.log(iterator.next()) //  { value: 1, done: false }
```

정의한 이터레이터는 자바스크립트 객체 내장 이터레이터와 다른 점이 있다.

```js
const arr = [1, 2, 3]
const iter2 = arr[Symbol.iterator]()
console.log(iter2[Symbol.iterator]() == iter2)

iter2.next() // 1
for (const item of arr) console.log(item) // 2 3
```

- next()를 호출하고 난 뒤 for of문을 통해 순회했을 때 next()의 결과가 반영된다.

  - 처음에 사용자 정의를 통해 만든 이터레이터는 for of문을 통해 순회하면 처음부터 순회한다.

    이터레이터가 자기 자신 또한 이터러블이면서, 스스로를 리턴했을 때 Well-Formed 이터레이션 프로토콜이라고 한다.
    
    - 추가) https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#non-well-formed_iterables 에 따르면 Non-well-formed iterables는 `@@iterator` 메서드가 이터레이터 객체를 반환하지 않는 iterable이다. 해당 메서드가 이터레이터 객체를 반환하면 well-formed-iterable이라고 볼 수 있다.
      - https://velog.io/@jsonkim/well-formed-iterable%EC%97%90-%EB%8C%80%ED%95%9C-%EC%98%A4%ED%95%B4



