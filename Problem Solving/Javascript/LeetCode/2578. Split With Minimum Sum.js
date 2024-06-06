// https://leetcode.com/problems/split-with-minimum-sum/

const getDigitOccurrence = (num) => {
  const occurrence = new Map();

  while (num > 0) {
    const digit = num % 10;
    occurrence.set(digit, (occurrence.get(digit) ?? 0) + 1);
    num = parseInt(num / 10);
  }

  return occurrence;
};

/**
 * @param {number} num
 * @return {number}
 */
var splitNum = function (num) {
  const occurrence = getDigitOccurrence(num);

  let result = [0, 0];
  let flag = false;
  for (let digit = 1; digit < 10; digit += 1) {
    let count = occurrence.get(digit);

    while (count) {
      result[+flag] = result[+flag] * 10 + digit;
      count -= 1;
      flag = !flag;
    }
  }

  return result[0] + result[1];
};

console.log(splitNum(123333));
