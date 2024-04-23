// https://leetcode.com/problems/maximum-sum-with-exactly-k-elements/description/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximizeSum = function (nums, k) {
  const biggest = nums.reduce((acc, cur) => {
    if (acc < cur) return cur;
    return acc;
  }, 0);

  let score = 0;
  score += k * biggest;
  for (let n = 1; n < k; n += 1) {
    score += n;
  }

  return score;
};
