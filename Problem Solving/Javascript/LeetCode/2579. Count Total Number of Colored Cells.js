// https://leetcode.com/problems/count-total-number-of-colored-cells/description/

/**
 * @param {number} n
 * @return {number}
 */
var coloredCells = function (n) {
  const multiplier = ((n - 1) * n) / 2;
  const answer = 4 * multiplier + 1;

  return answer;
};

/**
 * 1 * 1                               1
 * 1 * 2, 3 * 1                        5, 4   => 1
 * 1 * 2, 3 * 2, 5 * 1                 13, 8  => 2
 * 1 * 2, 3 * 2, 5 * 2, 7 * 1          25, 12 => 3
 * 1 * 2, 3 * 2, 5 * 2, 7 * 2, 9 * 2   41, 16 => 4
 */

// 1 1
// 2 3
// 3 6
// 4 10
// 5 15
// 6 21
// 7 28   n(n + 1) / 2

const n = 5;
console.log(coloredCells(n));
