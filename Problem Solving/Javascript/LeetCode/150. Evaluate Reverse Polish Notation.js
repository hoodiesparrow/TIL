// https://leetcode.com/problems/evaluate-reverse-polish-notation/description/

/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
  const stack = [];
  const calc = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => parseInt(a / b),
  };

  for (let token of tokens) {
    if (Number.isInteger(parseInt(token))) {
      stack.push(parseInt(token));
      continue;
    }

    const b = stack.pop();
    const a = stack.pop();

    stack.push(calc[token](a, b));
  }

  return stack.pop();
};

evalRPN(["2", "1", "+", "3", "*"]);
