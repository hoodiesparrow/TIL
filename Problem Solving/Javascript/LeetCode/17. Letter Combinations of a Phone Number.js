// https://leetcode.com/problems/letter-combinations-of-a-phone-number/

const keypads = {
  2: ["a", "b", "c"],
  3: ["d", "e", "f"],
  4: ["g", "h", "i"],
  5: ["j", "k", "l"],
  6: ["m", "n", "o"],
  7: ["p", "q", "r", "s"],
  8: ["t", "u", "v"],
  9: ["w", "x", "y", "z"],
};

/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  if (!digits.length) return [];

  let combinations = [...keypads[digits[0]]];

  for (let idx = 1; idx < digits.length; idx += 1) {
    let tmp = [];

    for (let letter of keypads[digits[idx]]) {
      for (let combination of combinations) {
        tmp.push(combination + letter);
      }
    }
    combinations = tmp;
  }

  return combinations;
};

console.log(letterCombinations("23"));
