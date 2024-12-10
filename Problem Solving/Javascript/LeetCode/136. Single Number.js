// https://leetcode.com/problems/single-number/description/

/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  let byte = 0;

  for (let num of nums) {
    byte ^= num;
  }

  return byte;
};
