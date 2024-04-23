// https://paiza.jp/challenges/533/show

process.stdin.resume();
process.stdin.setEncoding("utf8");
// 自分の得意な言語で
// Let's チャレンジ！！

function getManhattanDist({ P, Q, r, c }) {
  return Math.abs(P - r) + Math.abs(Q - c);
}

function solution(lines) {
  const [head, ...body] = lines;
  const [N, R, C, P, Q] = head.split(" ").map((v) => parseInt(v, 10));
  const seats = Array.from({ length: R }, () =>
    Array.from({ length: C }, () => 0)
  );

  for (const reservedSeat of body) {
    // 1 = reserved
    const [r, c] = reservedSeat.split(" ").map((v) => parseInt(v, 10));
    seats[r][c] = 1;
  }

  // bfs
  // 2 = visited
  const candidates = [];
  let dequeIdx = 0;
  let manhattanDist = 9999;
  const deque = [[P, Q]];
  const drc = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  while (dequeIdx < deque.length) {
    const [r, c] = deque[dequeIdx];
    dequeIdx += 1;

    const value = seats[r][c];
    if (value === 2) continue;
    seats[r][c] = 2;

    const dist = getManhattanDist({ P, Q, r, c });
    if (dist > manhattanDist) break;

    const isBookable = value === 0;
    if (isBookable) {
      manhattanDist = dist;
      candidates.push(`${r} ${c}`);
    }

    for (const [dr, dc] of drc) {
      if (r + dr >= R || r + dr < 0) continue;
      if (c + dc >= C || c + dc < 0) continue;
      deque.push([r + dr, c + dc]);
    }
  }

  return candidates.join("\n");
}

var lines = [];
var reader = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
reader.on("line", (line) => {
  lines.push(line);
});
reader.on("close", () => {
  console.log(solution(lines));
});
