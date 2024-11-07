// https://leetcode.com/problems/squares-of-a-sorted-array/

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
  const length = nums.length;
  const squared = Array.from(length);
  let [start, end] = [0, length - 1];

  let i = length - 1;

  while (i >= 0) {
    const numStart = Math.abs(nums[start]);
    const numEnd = Math.abs(nums[end]);

    if (numStart < numEnd) {
      squared[i] = numEnd ** 2;
      end -= 1;
    } else {
      squared[i] = numStart ** 2;
      start += 1;
    }

    i -= 1;
  }

  return squared;
};

sortedSquares([1, 2, 3, 4]);

// var sortedSquares = function (nums) {
//   const squared = {};

//   for (let num of nums) {
//     squared[num ** 2] = (squared[num ** 2] ?? 0) + 1;
//   }

//   const result = [];

//   for (let [k, v] of Object.entries(squared)) {
//     for (let i = 0; i < v; i += 1) {
//       result.push(parseInt(k));
//     }
//   }

//   return result;
// };
