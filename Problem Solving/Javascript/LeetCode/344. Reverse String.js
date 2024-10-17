// https://leetcode.com/problems/reverse-string/description/?envType=daily-question&envId=2024-10-16

/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {
  const halfLength = parseInt(s.length / 2);
  const lastIndex = s.length - 1;

  for (let i = 0; i < halfLength; i += 1) {
    [s[i], s[lastIndex - i]] = [s[lastIndex - i], s[i]];
  }

  return s;
};

reverseString("abc");
reverseString("abcd");
