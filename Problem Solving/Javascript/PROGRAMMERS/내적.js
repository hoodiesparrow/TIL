// https://school.programmers.co.kr/learn/courses/30/lessons/70128

function solution(a, b) {
  const length = a.length;
  let answer = 0;

  for (let i = 0; i < length; i += 1) {
    answer += a[i] * b[i];
  }

  return answer;
}

console.log(solution([1, 2, 3, 4], [-3, -1, 0, 2]));
