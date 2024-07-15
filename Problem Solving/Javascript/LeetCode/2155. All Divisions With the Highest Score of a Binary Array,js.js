// https://leetcode.com/problems/all-divisions-with-the-highest-score-of-a-binary-array/

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var maxScoreIndices = function (nums) {
  let currentMax = 0;
  let idxOfMax = [];

  const bit = [0, nums.reduce((acc, cur) => acc + cur, 0)];
  let idx = 1;

  currentMax = bit[1];
  idxOfMax.push(0);

  while (idx < nums.length + 1) {
    const head = nums[idx - 1];
    if (head === 0) {
      bit[0] += 1;
    } else {
      bit[1] -= 1;
    }

    const score = bit[0] + bit[1];
    if (score > currentMax) {
      currentMax = score;
      idxOfMax = [idx];
    } else if (score === currentMax) {
      idxOfMax.push(idx);
    }

    idx += 1;
  }

  return idxOfMax;
};
