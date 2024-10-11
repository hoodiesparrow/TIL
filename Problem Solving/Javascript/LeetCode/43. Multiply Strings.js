// https://leetcode.com/problems/multiply-strings/description/

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (num1, num2) {
  if (num1 === "0" || num2 === "0") return "0";

  const numList1 = num1
    .split("")
    .reverse()
    .map((v) => parseInt(v));
  const numList2 = num2
    .split("")
    .reverse()
    .map((v) => parseInt(v));

  const result = [];
  const I = numList1.length;
  const J = numList2.length;

  for (let i = 0; i < I; i += 1) {
    for (let j = 0; j < J; j += 1) {
      const product = numList1[i] * numList2[j];
      result[i + j] = (result[i + j] ?? 0) + product;
    }
  }

  let idx = 0;
  let carry = 0;

  while (idx < result.length || carry) {
    result[idx] = (result[idx] ?? 0) + carry;
    carry = 0;

    const current = result[idx];

    if (current >= 10) {
      result[idx] = current % 10;
      carry = parseInt(current / 10);
    }

    idx += 1;
  }

  return result.reverse().join("");
};

console.log(multiply("10", "0"));
