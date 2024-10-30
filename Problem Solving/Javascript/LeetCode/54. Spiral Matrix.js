// https://leetcode.com/problems/spiral-matrix/description/

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  const ordered = [];

  const drc = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  // already occupied row/col, [row, col]
  const occupied = [0, 0];
  const [R, C] = [matrix.length, matrix[0].length];
  let [r, c] = [0, -1];

  let drcIdx = 0;
  let idx = 0;

  while (idx < R * C) {
    const [dr, dc] = drc[drcIdx % 4];
    const isHorizontal = drcIdx % 2 === 0;

    const limit = isHorizontal ? C - occupied[1] : R - occupied[0];

    for (let i = 0; i < limit; i += 1) {
      [r, c] = [r + dr, c + dc];
      ordered.push(matrix[r][c]);

      idx += 1;
    }

    occupied[drcIdx % 2] += 1;
    drcIdx += 1;
  }

  return ordered;
};

spiralOrder([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]);
