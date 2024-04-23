// https://school.programmers.co.kr/learn/courses/30/lessons/12977

function solution(nums) {
  const primes = Array.from({ length: 3001 }, () => undefined);

  for (let num = 2; num < 3001; num += 1) {
    if (primes[num] !== undefined) continue;

    primes[num] = true;
    for (let int = num * 2; int <= 3000; int += num) {
      primes[int] = false;
    }
  }

  function checkPrime(comb) {
    const [a, b, c] = comb;
    return primes[a + b + c] === true;
  }

  let answer = 0;
  function combination(comb, start = 0) {
    if (comb.length === 3) {
      if (checkPrime(comb)) answer += 1;
      return;
    }

    for (let idx = start; idx < nums.length; idx += 1) {
      comb.push(nums[idx]);
      combination(comb, idx + 1);
      comb.pop();
    }
  }

  combination([]);

  return answer;
}

const a = [1, 2, 3, 4];
console.log(solution(a));
