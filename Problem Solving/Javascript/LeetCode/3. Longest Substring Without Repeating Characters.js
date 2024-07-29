// https://leetcode.com/problems/longest-substring-without-repeating-characters/

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let subString = [];
  let start = 0;
  let head = 0;
  let longest = 0;

  while (start + longest <= s.length) {
    if (head === s.length) {
      start += 1;
      head = start;

      if (longest < subString.length) longest = subString.length;
      subString = [];
      break;
    }

    const character = s.charAt(head);
    if (subString.find((a) => a === character)) {
      start += 1;
      head = start;

      if (longest < subString.length) longest = subString.length;
      subString = [];
      continue;
    }

    subString.push(character);
    head += 1;
  }

  return longest;
};

console.log(lengthOfLongestSubstring("pwwkew"));
