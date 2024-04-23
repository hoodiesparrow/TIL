// https://leetcode.com/problems/left-and-right-sum-differences/description/

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var leftRightDifference = function (nums) {
  const left = [];
  const right = [];
  let leftSum = 0;
  let rightSum = nums.reduce((acc, cur) => acc + cur, 0);

  for (let idx = 0; idx < nums.length; idx += 1) {
    const current = nums[idx];

    left.push(leftSum);
    leftSum += current;
    rightSum -= current;
    right.push(rightSum);
  }

  return left.map((n, i) => Math.abs(n - right[i]));
};
