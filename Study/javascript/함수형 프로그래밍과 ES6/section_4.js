const products = [
  { name: '가', price: 1 },
  { name: '나', price: 2 },
  { name: '다', price: 3 },
  { name: '라', price: 4 },
  { name: '마', price: 5 },
]

const map = (f, iter) => {
  let res = []
  for (const item of iter) {
    res.push(f(item))
  }
  return res
}

const filter = (f, iter) => {
  let res = []
  for (const item of iter) {
    if (f(item)) {
      res.push(item)
    }
  }
  return res
}

const reduce = (f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]()
    acc = iter.next().value
  }

  for (const item of iter) {
    acc = f(acc, item)
  }
  return acc
}

// go
const go = (...args) => reduce((a, f) => f(a), args)

// go(1, a => a + 1, a => a + 2, console.log)

// pipe
const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs)
const f = pipe(
  (a, b) => a + b,
  a => a * 2,
  a => a + 1,
  console.log
)
// f(1, 2)

const add = (a, b) => a + b;
// readability
reduce(
  add,
  map((product) => product.price,
    filter((product) => product.price > 3, products)))

// go(
//   products,
//   (products) => filter((product) => product.price <= 3, products),
//   (products) => map((product) => product.price, products),
//   (prices) => reduce(add, prices),
//   console.log
// )

// go + curry

function asd(v) {
  console.log(v)
}

const zxc = () => console.log

zxc('asd')