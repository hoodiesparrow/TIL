// https://leetcode.com/problems/plus-one/description/

/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
  function increment(digits, idx = digits.length - 1) {
    if (digits[idx] === 9) {
      digits[idx] = 0;

      if (idx === 0) {
        digits.unshift(1);
        return digits;
      }

      increment(digits, idx - 1);
    } else {
      digits[idx] += 1;
    }

    return digits;
  }

  return increment(digits);
};

console.log(plusOne([9]));
