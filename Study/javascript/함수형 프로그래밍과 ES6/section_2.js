const log = console.log

/** generator and iterator */
// function *gen() {
//   yield 1
//   // yield 2
//   if (false) yield 2;
//   yield 3
//   return 100
// }

// let iter = gen()
// log(iter[Symbol.iterator]() === iter)
// log(iter.next())
// log(iter.next())
// log(iter.next())
// log(iter.next())

// for (const a of gen()) {
//   log(a)
// }

/** odds */
// function *odds(limit) {
//   for (let i = 0; i < limit; i += 1) {
//     if (i % 2) yield i
//   }
// }

// const iter = odds(10)
// log(iter.next())
// log(iter.next())
// log(iter.next())
// log(iter.next())
// log(iter.next())

// function *infinity(i = 0) {
//   while (true) {
//     yield i++
//   }
// }

// function *oddsWithInfinity(limit) {
//   for (const num of infinity(1)) {
//     if (num % 2) {
//       yield num
//     }
//     if (num >= limit) {
//       return
//     }
//   }
// }

// const iterr = oddsWithInfinity(10)
// log(iterr.next())
// log(iterr.next())
// log(iterr.next())
// log(iterr.next())
// log(iterr.next())
// log(iterr.next())

// function *limit(l, iterable) {
//   for (const a of iterable) {
//     yield a
//     if (a >= l) {
//       return
//     }
//   }
// }

// let iter2 = limit(4, [1, 2, 3, 4, 5, 6])
// log(iter2.next())
// log(iter2.next())
// log(iter2.next())
// log(iter2.next())
// log(iter2.next())
// log(iter2.next())

// function *oddsWithLimit(l) {
//   for (const a of limit(l, infinity(1))) {
//     if (a % 2) {
//       yield a
//     }
//   }
// }

// const iter3 = oddsWithLimit(5)
// log(iter3.next())
// log(iter3.next())
// log(iter3.next())
// log(iter3.next())

/** for...of, 전개 연산자, 구조 분해, 나머지 연산자 */
// function *odds(limit) {
//   for (let i = 0; i <= limit; i += 1) {
//     if (i % 2) yield i;
//   }
// }
// log(...odds(10))
// log([...odds(10)])

// const iter = odds(10)
// const iter1 = odds(10)
// const iter2 = odds(10)

// const [...arr] = iter
// const [head, ...rest] = iter1
// const [a, b, ...rest1] = iter2
// const [...whole] = odds(10)

// log(arr, head, rest, a, b, rest1)