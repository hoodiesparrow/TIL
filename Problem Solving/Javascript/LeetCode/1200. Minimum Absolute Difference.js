// https://leetcode.com/problems/minimum-absolute-difference/description/

/**
 * @param {number[]} arr
 * @return {number[][]}
 */
var minimumAbsDifference = function (arr) {
  const sorted = arr.toSorted((a, b) => a - b);
  const diff = [];

  let minDiff = Infinity;

  for (let i = 0; i < arr.length - 1; i++) {
    diff[i] = sorted[i + 1] - sorted[i];
    if (diff[i] < minDiff) minDiff = diff[i];
  }

  const pairs = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (diff[i] === minDiff) {
      pairs.push([sorted[i], sorted[i + 1]]);
    }
  }

  return pairs;
};
