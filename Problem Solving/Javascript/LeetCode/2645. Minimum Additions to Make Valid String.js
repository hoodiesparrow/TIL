// https://leetcode.com/problems/minimum-additions-to-make-valid-string/description/

/**
 * @param {string} word
 * @return {number}
 */
var addMinimum = function (word) {
  const letters = word.split("");
  const abc = "abc".split("");

  let idx = 0;
  let compareIdx = 0;
  let acc = 0;

  while (idx < letters.length) {
    const letter = letters[idx];
    const source = abc.indexOf(letter);
    const compare = compareIdx % 3;

    const diff = source === 0 && compare === 2 ? 1 : Math.abs(compare - source);
    acc += diff;
    compareIdx += diff;

    idx += 1;
    compareIdx += 1;
  }

  const lastLetter = letters[letters.length];
  if (abc.indexOf(lastLetter) !== 2) {
    acc += 2 - abc.indexOf(lastLetter);
  }

  return acc;
};

addMinimum("cba");
