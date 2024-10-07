// https://leetcode.com/problems/minimum-path-sum/description/

/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
  const R = grid.length;
  const C = grid[0].length;

  for (let c = 1; c < C; c += 1) {
    grid[0][c] += grid[0][c - 1];
  }

  for (let r = 1; r < R; r += 1) {
    grid[r][0] += grid[r - 1][0];
  }

  for (let r = 1; r < R; r += 1) {
    for (let c = 1; c < C; c += 1) {
      const left = grid[r][c - 1];
      const up = grid[r - 1][c];

      grid[r][c] += Math.min(left, up);
    }
  }

  return grid[R - 1][C - 1];
};

minPathSum([
  [1, 3, 1],
  [1, 5, 1],
  [4, 2, 1],
]);
