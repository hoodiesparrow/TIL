// https://leetcode.com/problems/maximum-subarray/

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  const dp = Array(nums.length).fill(undefined);
  dp[0] = nums[0];

  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
  }

  return dp.reduce((a, c) => (a > c ? a : c), -999999);
};

maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
