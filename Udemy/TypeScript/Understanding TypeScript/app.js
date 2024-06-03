function add(n1, n2) {
    return n1 + n2;
}
function printResult(num) {
    console.log("Result: ".concat(num));
}
function addAndHandle(n1, n2, cb) {
    var result = n1 + n2;
    var a = cb(result);
    return a;
}
// let combineValues;
// combineValues = add;
// combineValues = 5;
// combineValues(1, 2); // tsc does not complain
var combineValues;
combineValues = add;
// combineValues = printResult; // will not compile
combineValues(1, 2);
addAndHandle(1, 2, function (result) {
    console.log(result);
});
