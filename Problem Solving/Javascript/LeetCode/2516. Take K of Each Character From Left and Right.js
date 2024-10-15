// https://leetcode.com/problems/take-k-of-each-character-from-left-and-right/description/

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var takeCharacters = function (s, k) {
  const memo = {};
  let minute = Infinity;

  const queue = [];
  let qIdx = 0;
  queue.push([0, s.length - 1]);

  while (queue.length > qIdx) {
    const [left, right] = queue[qIdx];
    qIdx += 1;

    if (memo[left] && memo[left][right]) continue;
    if (left >= right) continue;

    // calc minute
  }

  if (minute === Infinity) return -1;
  return minute;
};

const [s, k] = ["aabaaaacaabc", 2];
console.log(takeCharacters(s, k));

// 매 턴 왼쪽 or 오른쪽 선택, 결과값 저장
// 1. 최소값 넘어가기 전 까지 탐색
// 2. 답을 찾을 수 없을때 처리
