// https://leetcode.com/problems/contains-duplicate/description/

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function (nums) {
  const appearance = new Set();

  for (let num of nums) {
    if (appearance.has(num)) return true;
    appearance.add(num);
  }

  return false;
};

// used object, but Set is better

// var containsDuplicate = function (nums) {
//   const appearance = {};

//   for (let num of nums) {
//     if (appearance[num]) return true;
//     appearance[num] = 1;
//   }

//   return false;
// };
