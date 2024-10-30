// https://leetcode.com/problems/how-many-numbers-are-smaller-than-the-current-number/description/

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var smallerNumbersThanCurrent = function (nums) {
  const counts = {};

  for (let num of nums) {
    counts[num] = (counts[num] ?? 0) + 1;
  }

  let added = 0;
  for (let key of Object.keys(counts)) {
    [counts[key], added] = [added, added + counts[key]];
  }

  return nums.map((v) => counts[v]);
};

smallerNumbersThanCurrent([8, 1, 2, 2, 3]);
