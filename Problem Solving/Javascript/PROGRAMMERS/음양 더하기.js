// https://school.programmers.co.kr/learn/courses/30/lessons/76501

function solution(absolutes, signs) {
  let answer = 0;
  for (let idx = 0; idx < absolutes.length; idx += 1) {
    const isPositive = signs[idx];
    const sign = isPositive ? 1 : -1;
    const n = absolutes[idx];
    answer += sign * n;
  }

  return answer;
}

const a = [4, 7, 12];
const b = [true, false, true];
console.log(solution(a, b));
