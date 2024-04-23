// https://school.programmers.co.kr/learn/courses/30/lessons/87389
function solution(n) {
  const visited = Array.from({ length: n }, () => 0);

  for (let divisor = 2; divisor < n; divisor += 1) {
    if (visited[divisor]) continue;
    if (n % divisor === 1) return divisor;

    const maxTimes = parseInt(n / divisor, 10);
    for (let times = 1; times <= maxTimes; times += 1) {
      visited[divisor * times] = 1;
    }
  }
}

const n = 12;
console.log(solution(n));
