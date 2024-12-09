// https://leetcode.com/problems/contains-duplicate-ii/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums, k) {
  const window = new Set();

  for (let i = 0; i < Math.min(k + 1, nums.length); i += 1) {
    if (window.has(nums[i])) return true;
    window.add(nums[i]);
  }

  for (let i = 0; i + k + 1 < nums.length; i += 1) {
    window.delete(nums[i]);
    if (window.has(nums[i + k + 1])) return true;
    window.add(nums[i + k + 1]);
  }

  /* more readable version
  for (let [num, idx] of nums.entries()) {
    if (window.has(num)) return true;
    window.add(num);
    if (window.length > k) window.delete(nums[i - k]);
  }
  */

  return false;
};

// var containsNearbyDuplicate = function (nums, k) {
//   for (let i = 0; i < nums.length - 1; i += 1) {
//     for (let j = i + 1; j < Math.min(i + k + 1, nums.length); j += 1) {
//       if (nums[i] === nums[j]) return true;
//     }
//   }

//   return false;
// };

containsNearbyDuplicate([1, 2, 3, 1], 3);
