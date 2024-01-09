// https://school.programmers.co.kr/learn/courses/30/lessons/86491
function solution(sizes) {
  let short = 0;
  let long = 0;

  for (const [w, h] of sizes) {
    const shorter = w > h ? h : w;
    const longer = w > h ? w : h;

    if (shorter > short) short = shorter;
    if (longer > long) long = longer;
  }

  return short * long;
}

const s = [
  [60, 50],
  [30, 70],
  [60, 30],
  [80, 40],
];

const ss = [
  [10, 7],
  [12, 3],
  [8, 15],
  [14, 7],
  [5, 15],
];

const sss = [
  [14, 4],
  [19, 6],
  [6, 16],
  [18, 7],
  [7, 11],
];
console.log(solution(sss));
