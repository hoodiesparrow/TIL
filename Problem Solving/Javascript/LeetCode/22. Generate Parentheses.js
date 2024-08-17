// https://leetcode.com/problems/generate-parentheses/description/

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  const answer = [];

  const Q = [];
  Q.push([0, 0, ""]);
  let i = 0;

  while (i < Q.length) {
    const [l, r, parens] = Q[i];
    i += 1;

    if (l > n || r > n) continue;
    if (l < r) continue;
    if (l === n && r === n) {
      answer.push(parens);
      continue;
    }

    Q.push([l + 1, r, parens + "("]);
    Q.push([l, r + 1, parens + ")"]);
  }

  return answer;
};

console.log(generateParenthesis(3));
