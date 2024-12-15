// https://leetcode.com/problems/counting-bits/description/

/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function (n) {
  const ans = [0];
  let power = 1;

  for (let i = 1; i < n + 1; i++) {
    if (i >= 2 ** power) power += 1;

    ans[i] = ans[i - 2 ** (power - 1)] + 1;
  }

  return ans;
};
