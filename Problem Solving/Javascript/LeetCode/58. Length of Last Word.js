// https://leetcode.com/problems/length-of-last-word/description/

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s) {
  let metLetter = false;
  let count = 0;

  for (let idx = 1; idx <= s.length; idx += 1) {
    const current = s.at(-idx);

    if (current === " ") {
      if (metLetter) break;
    } else {
      count += 1;
      metLetter = true;
    }
  }

  return count;
};

lengthOfLastWord("   fly me   to   the moon  ");
