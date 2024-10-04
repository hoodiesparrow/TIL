// https://leetcode.com/problems/unique-paths/description/

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (R, C) {
  const memo = Array(R)
    .fill()
    .map((v) => Array(C).fill(0));

  for (let c = 0; c < C; c += 1) {
    memo[0][c] = 1;
  }

  for (let r = 0; r < R; r += 1) {
    memo[r][0] = 1;
  }

  for (let r = 1; r < R; r += 1) {
    for (let c = 1; c < C; c += 1) {
      memo[r][c] = memo[r - 1][c] + memo[r][c - 1];
    }
  }

  return memo[R - 1][C - 1];
};

console.log(uniquePaths(3, 3));

/*
어떤 칸에 도달할 수 있는 경우의  수는 한칸 위와 한칸 왼쪽에 도달할 수 있는 경우의 수의 합과 같다
*/

// recursive => time limit exceeded

// var uniquePaths = function (m, n) {
//   let count = 0;

//   function recursive(r, c, cr = 0, cc = 0) {
//     if (cr < r) recursive(r, c, cr + 1, cc);
//     if (cc < c) recursive(r, c, cr, cc + 1);

//     if (cr === r && cc === c) count += 1;
//   }

//   recursive(m - 1, n - 1);

//   return count;
// };
