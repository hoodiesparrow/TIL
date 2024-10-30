// https://leetcode.com/problems/missing-number/

/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
  const appearance = Array(nums.length + 1).fill(0);

  for (let num of nums) {
    appearance[num] = 1;
  }

  return appearance.findIndex((v) => v === 0);
};

missingNumber([3, 0, 1]);
