// https://leetcode.com/problems/reverse-integer/

/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  // -2 ** 31 <= x <= 2 ** 31 - 1
  const isPositive = x > 0;
  const boundary = isPositive ? 2 ** 31 - 1 : 2 ** 31;
  const boundaryArr = boundary.toString().split("");

  const compare = Math.abs(x);
  const compareArr = compare
    .toString()
    .split("")
    .reverse()
    .join("")
    .padStart(boundaryArr.length, "0")
    .split("");

  for (let idx = 0; idx < boundaryArr.length; idx += 1) {
    const bound = boundaryArr[idx];
    const current = compareArr[idx];

    if (current < bound) break;
    if (current > bound) return 0;
  }

  let n = parseInt(compare.toString().split("").reverse().join(""));
  if (!isPositive) n = -n;

  return n;
};

console.log(reverse(-123));
