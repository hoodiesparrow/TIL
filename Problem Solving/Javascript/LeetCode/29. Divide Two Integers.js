// https://leetcode.com/problems/divide-two-integers/

/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function (dividend, divisor) {
  const sign1 = Math.sign(dividend);
  const sign2 = Math.sign(divisor);
  const sign = sign1 === sign2 ? "+" : "-";

  let answer = 0;

  let d = Math.abs(dividend);
  let s = Math.abs(divisor);
  const sDigit = s.toString().length;

  while (d >= s) {
    const dDigit = d.toString().length;
    const digitDiff = dDigit - sDigit;
    const _divisor = parseInt(s.toString().padEnd(digitDiff - 1, "0"));

    d -= _divisor;
    if (digitDiff > 1) answer += parseInt("1".padEnd(digitDiff - 1, "0"));
    else answer += 1;
  }

  answer = parseInt(sign + answer.toString());
  if (answer >= 2 ** 31) answer = 2 ** 31 - 1;
  if (answer < -(2 ** 31)) answer = -(2 ** 31);

  return answer;
};
