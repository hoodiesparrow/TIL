// https://leetcode.com/problems/unique-paths-ii/description/

/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
  const R = obstacleGrid.length;
  const C = obstacleGrid[0].length;

  for (let r = 0; r < R; r += 1) {
    for (let c = 0; c < C; c += 1) {
      if (obstacleGrid[r][c]) obstacleGrid[r][c] = null;
    }
  }

  for (let r = 0; r < R; r += 1) {
    if (obstacleGrid[r][0] !== null) obstacleGrid[r][0] = 1;
    else break;
  }

  for (let c = 0; c < C; c += 1) {
    if (obstacleGrid[0][c] !== null) obstacleGrid[0][c] = 1;
    else break;
  }

  for (let r = 1; r < R; r += 1) {
    for (let c = 1; c < C; c += 1) {
      if (obstacleGrid[r][c] === null) continue;

      const up = obstacleGrid[r - 1][c] === null ? 0 : obstacleGrid[r - 1][c];
      const left = obstacleGrid[r][c - 1] === null ? 0 : obstacleGrid[r][c - 1];

      obstacleGrid[r][c] = up + left;
    }
  }

  if (obstacleGrid[R - 1][C - 1] === null) return 0;
  return obstacleGrid[R - 1][C - 1];
};

uniquePathsWithObstacles([[0, 0]]);
