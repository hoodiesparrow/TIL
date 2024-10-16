// https://leetcode.com/problems/subsets/description/?envType=daily-question&envId=2024-10-16

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  const result = [];
  const length = nums.length;

  function powerSet(idxArr) {
    result.push(idxArr.map((idx) => nums[idx]));
    const lastElem = idxArr.at(-1) ?? -1;

    for (let i = lastElem + 1; i < length; i += 1) {
      idxArr.push(i);
      powerSet(idxArr);
      idxArr.pop();
    }
  }

  powerSet([]);

  return result;
};

subsets([1, 2, 3]);
