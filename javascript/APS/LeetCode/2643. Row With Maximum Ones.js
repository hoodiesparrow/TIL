// https://leetcode.com/problems/row-with-maximum-ones/

/**
 * @param {number[][]} mat
 * @return {number[]}
 */
var rowAndMaximumOnes = function (mat) {
  const R = mat.length;
  let max = -1;
  let rowIndex = 0;

  for (let r = 0; r < R; r += 1) {
    const sum = mat[r].reduce((acc, cur) => acc + cur, 0);
    if (sum > max) {
      max = sum;
      rowIndex = r;
    }
  }

  return [rowIndex, max];
};
