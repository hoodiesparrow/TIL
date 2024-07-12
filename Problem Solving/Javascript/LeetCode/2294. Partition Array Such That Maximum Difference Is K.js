// https://leetcode.com/problems/partition-array-such-that-maximum-difference-is-k/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var partitionArray = function (nums, k) {
  nums.sort((a, b) => a - b);

  let answer = 1;
  let bottom = nums[0];

  for (let num of nums) {
    const limit = bottom + k;
    if (num > limit) {
      bottom = num;
      answer += 1;
    }
  }

  return answer;
};

// console.log(partitionArray([3, 6, 1, 2, 5], 2));
// console.log(partitionArray([1, 2, 3], 1));
// console.log(partitionArray([2, 2, 4, 5], 0));
console.log(partitionArray([5, 16, 3, 20, 9, 20, 16, 19, 6], 4));
