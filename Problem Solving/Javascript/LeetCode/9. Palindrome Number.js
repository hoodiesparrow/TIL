// https://leetcode.com/problems/palindrome-number/

/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  if (x < 0) return false;

  let reversed = 0;
  let xx = x;

  while (xx > 0) {
    reversed *= 10;
    reversed += xx % 10;
    xx = Math.floor(xx / 10);
  }

  return reversed === x;
};

console.log(isPalindrome(101));
