const log = console.log

const products = [
  { name: '가', price: 1 },
  { name: '나', price: 2 },
  { name: '다', price: 3 },
  { name: '라', price: 4 },
  { name: '마', price: 5 },
]

/** map */
const map = (f, iter) => {
  let res = []
  for (const item of iter) {
    res.push(f(item))
  }
  return res
}

log(map((product) => product.name, products))

/** map 다형성 1 */
// log(document.querySelectorAll('*').map((el) => el.nodeName))

// log(map((el) => el.nodeName, document.querySelectorAll('*')))

// const it = document.querySelectorAll('*')[Symbol.iterator]()

function *gen() {
  yield 1
  yield 2
  yield 3
  yield 4
}

log(map((a) => a * a, gen()))

/** map 다형성 2 */
const m = new Map()
m.set('a', 10)
m.set('b', 20)

const newM = new Map(map(([k, v]) => [k, v * 2] , m))
log(newM)

/** filter */
const filter = (f, iter) => {
  let res = []
  for (const item of iter) {
    if (f(item)) {
      res.push(item)
    }
  }
  return res
}

log(filter((product) => product.price > 2, products))

log(
  filter((num) => num % 2, function *() {
    yield 1
    yield 2
    yield 3
    yield 4
    yield 5
  } ())
)

/** reduce */
// const reduce = (f, acc, iter) => {
//   for (const item of iter) {
//     acc = f(acc, item)
//   }
//   return acc
// }

// make it work without initValue
const reduce = (f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]()
    // iter = acc
    // 왜 여기서 []()를 해줄까? 어차피 자기 자신을 리턴하는 것 아닌가?
    // 아니지, 여기서 받은것은 이터러블한 자료형일 뿐 이터레이터가 아니다.
    acc = iter.next().value
  }

  for (const item of iter) {
    acc = f(acc, item)
  }
  return acc
}

log(
  reduce((pre, cur) => pre + cur, [1, 2, 3, 4, 5])
)

log(
  reduce(
    (totalPrice, product) => totalPrice + product.price,
    0,
    products
  )
)

/** 중첩 사용 */
const add = (a, b) => a + b;

log(
  reduce(
    add,
    map((product) => product.price,
      filter((product) => product.price > 3, products))))

