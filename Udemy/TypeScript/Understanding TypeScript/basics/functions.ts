function add(n1: number, n2: number) {
  return n1 + n2;
}

function printResult(num): void {
  console.log(`Result: ${num}`);
}

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  const a = cb(result);
  return a;
}

// let combineValues;
// combineValues = add;
// combineValues = 5;

// combineValues(1, 2); // tsc does not complain

let combineValues: (a: number, b: number) => number;
combineValues = add;
// combineValues = printResult; // will not compile

combineValues(1, 2);

addAndHandle(1, 2, (result) => {
  console.log(result);
});
