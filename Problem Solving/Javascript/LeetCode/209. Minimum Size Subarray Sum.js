// https://leetcode.com/problems/minimum-size-subarray-sum/description/

/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  let left = 0;
  let sum = 0;
  let minLength = Infinity;

  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];

    while (sum >= target) {
      minLength = Math.min(right - left + 1, minLength);
      sum -= nums[left];
      left += 1;
    }
  }

  minLength = isFinite(minLength) ? minLength : 0;

  return minLength;
};
// var minSubArrayLen = function (target, nums) {
//   let left = 0;
//   let right = 0;
//   let sum = 0;
//   let minLength = Infinity;

//   while (left < nums.length) {
//     if (sum < target) {
//       if (right === nums.length) break;

//       sum += nums[right];
//       right += 1;

//       if (right - left >= minLength) {
//         sum -= nums[left];
//         left += 1;
//       }
//     } else {
//       minLength = Math.min(right - left, minLength);
//       sum -= nums[left];
//       left += 1;
//     }
//   }

//   minLength = isFinite(minLength) ? minLength : 0;

//   return minLength;
// };

minSubArrayLen(7, [2, 3, 1, 2, 4, 3]);
