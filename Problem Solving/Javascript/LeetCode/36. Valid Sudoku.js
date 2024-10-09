// https://leetcode.com/problems/valid-sudoku/description/

/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board) {
  function isValid(rowStart, rowEnd, colStart, colEnd) {
    const seen = new Set();

    for (let r = rowStart; r < rowEnd; r += 1) {
      for (let c = colStart; c < colEnd; c += 1) {
        const current = board[r][c];

        if (current === ".") continue;
        if (seen.has(current)) return false;
        seen.add(current);
      }
    }

    return true;
  }

  for (let i = 0; i < 9; i += 1) {
    if (!isValid(i, i + 1, 0, 9)) return false;
    if (!isValid(0, 9, i, i + 1)) return false;
  }

  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      if (!isValid(i * 3, (i + 1) * 3, j * 3, (j + 1) * 3)) return false;
    }
  }

  return true;
};

isValidSudoku([
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
]);
