// https://leetcode.com/problems/number-of-islands/description/?envType=daily-question&envId=2024-08-22

/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  const [R, C] = [grid.length, grid[0].length];
  const visited = Array(R)
    .fill()
    .map(() => Array(C).fill(0));

  for (let r = 0; r < R; r += 1) {
    for (let c = 0; c < C; c += 1) {
      if (grid[r][c] === "0") visited[r][c] = 1;
    }
  }

  let islands = 0;
  const drc = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  function visiter(r, c) {
    if (visited[r][c]) return;
    visited[r][c] = 1;

    for (let [dr, dc] of drc) {
      const nr = r + dr;
      const nc = c + dc;

      if (0 <= nr && nr < R && 0 <= nc && nc < C) {
        if (grid[nr][nc] === "1") visiter(nr, nc);
      }
    }
  }

  for (let r = 0; r < R; r += 1) {
    for (let c = 0; c < C; c += 1) {
      if (!visited[r][c]) {
        islands += 1;
        visiter(r, c);
      }
    }
  }

  return islands;
};

console.log(
  numIslands([
    ["1", "1", "0", "0", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "1", "0", "0"],
    ["0", "0", "0", "1", "1"],
  ])
);
