// https://leetcode.com/problems/valid-parentheses/description/

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const left = ["[", "(", "{"];

  const pair = {
    "]": "[",
    ")": "(",
    "}": "{",
  };

  const stack = [];

  for (let str of s) {
    if (left.includes(str)) {
      stack.push(str);
    } else {
      if (!stack.length) return false;

      const pre = stack.pop();
      const match = pair[str];

      if (pre !== match) return false;
    }
  }

  if (stack.length) return false;
  return true;
};

console.log(isValid("()"));
