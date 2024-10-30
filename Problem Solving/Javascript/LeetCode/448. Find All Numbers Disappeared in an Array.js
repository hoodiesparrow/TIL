// https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function (nums) {
  const appearance = Array(nums.length + 1).fill(0);
  appearance[0] = 1;

  for (let num of nums) {
    appearance[num] = 1;
  }

  const notAppeared = [];

  for (let i = 0; i < appearance.length; i += 1) {
    if (!appearance[i]) notAppeared.push(i);
  }

  return notAppeared;
};

// var findDisappearedNumbers = function (nums) {
//   const appearance = new Set();

//   for (let i = 1; i < nums.length + 1; i += 1) {
//     appearance.add(i);
//   }

//   for (let num of nums) {
//     appearance.delete(num);
//   }

//   return Array.from(appearance);
// };
