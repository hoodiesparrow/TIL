// https://leetcode.com/problems/snail-traversal/description/

/**
 * @param {number} rowsCount
 * @param {number} colsCount
 * @return {Array<Array<number>>}
 */
Array.prototype.snail = function (rowsCount, colsCount) {
  if (rowsCount * colsCount !== this.length) return [];

  const output = Array.from({ length: rowsCount }, () =>
    Array.from({ length: colsCount })
  );

  let idx = 0;
  while (idx < this.length) {
    const isDownward = parseInt(idx / rowsCount) % 2 === 0;
    const c = parseInt(idx / rowsCount);
    const r = isDownward
      ? idx % rowsCount
      : Math.abs(rowsCount - 1 - (idx % rowsCount));

    output[r][c] = this[idx];
    idx += 1;
  }

  return output;
};

const arr = [1, 2, 3, 4, 5, 6];
console.log(arr.snail(3, 2)); // [[1,2,3,4]]
