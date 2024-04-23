// // const set = new Set([1, 2, 3])

// // const iterator1 = set[Symbol.iterator]()
// // iterator1.next()
// // iterator1.next()

// // for (const item of iterator1) {
// //   console.log(item)
// // }

// // for (const item of set) {
// //   console.log(item)
// // }


// const iterable = {
//   [Symbol.iterator]() {
//     let i = 3
//     return {
//       next() {
//         return i === 0 ? { done: true } : { value: i--, done: false} // i++ ++i 접두|접미 위치에 따라 자리에 연산 전 값이 반환되거나 연산 후의 값이 반환됨
//       },
//       // [Symbol.iterator]() { return this } // adding this will save the progress when this iterable is called in swh like for...of
//       // 이유는 잘 모르겠지만 이게 없으면 for...of문에서 동작하지 않음;
//     }
//   }
// }

// const iter = iterable[Symbol.iterator]()

// console.log(iter.next())
// console.log(iter.next())

// for (const val of iter) {
//   console.log(val)
// }


// const asd = {
//   test() {console.log('test')},
//   hi() {console.log('hi')},
//   hello: () => {console.log('hello')},
// }

// asd.test()
// asd.hi()
// asd.hello()

/** Symbol is not iterable and is unique even if has same description
 *  access Symbol keys with Object.getOwnPropertySymbols({}), which returns actual Symbols
 */

// const obj = {}
// const sb = Symbol('sb')
// const bs = Symbol('bs')

// obj[sb] = 1
// obj[bs] = 2

// // console.log(Object.getOwnPropertySymbols(obj).map(s => obj[s]))
// for (const val of Object.values(obj)) {
//   console.log(val)
// }

// Symbol은 알겠는데 왜 Symbol.iterator가 나오지?

const arr = []

console.dir(Object.getOwnPropertySymbols(arr))