// https://school.programmers.co.kr/learn/courses/30/lessons/82612
function solution(price, money, count) {
  let totalCounts = 0;
  for (let counts = 1; counts <= count; counts += 1) {
    totalCounts += counts;
  }

  const result = money - price * totalCounts;

  return result > 0 ? 0 : Math.abs(result);
}

const p = 3;
const m = 20;
const c = 4;
console.log(solution(p, m, c));
