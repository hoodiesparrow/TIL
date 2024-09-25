/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function (n) {
  const matrix = Array(n)
    .fill()
    .map(() => Array(n).fill(undefined));

  let r = 0;
  let c = 0;

  const drc = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  let drcIdx = 0;

  const visited = Array(n)
    .fill()
    .map(() => Array(n).fill(0));

  for (let head = 0; head < n ** 2; head += 1) {
    matrix[r][c] = head + 1;
    visited[r][c] = 1;

    let [dr, dc] = drc[drcIdx];
    r += dr;
    c += dc;

    if (!(0 <= r && r < n && 0 <= c && c < n) || visited[r][c]) {
      r -= dr;
      c -= dc;

      drcIdx = (drcIdx + 1) % 4;
      [dr, dc] = drc[drcIdx];
      r += dr;
      c += dc;
    }
  }

  return matrix;
};

generateMatrix(3);

/*
1 2
4 3

1 2 3
8 9 4
7 6 5

right -> down -> left -> up
[0, 3]

0 1 2, 3 4 5, 6 7 8

visited + boundary
*/
