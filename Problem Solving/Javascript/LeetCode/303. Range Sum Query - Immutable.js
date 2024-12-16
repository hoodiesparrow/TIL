// https://leetcode.com/problems/range-sum-query-immutable/description/

/**
 * @param {number[]} nums
 */
var NumArray = function (nums) {
  this.sum = [nums[0]];

  for (let i = 1; i < nums.length; i++) {
    this.sum[i] = this.sum[i - 1] + nums[i];
  }
};

/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
NumArray.prototype.sumRange = function (left, right) {
  if (left === 0) return this.sum[right];
  return this.sum[right] - this.sum[left - 1];
};
