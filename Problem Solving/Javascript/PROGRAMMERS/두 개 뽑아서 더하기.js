// https://school.programmers.co.kr/learn/courses/30/lessons/68644

function solution(numbers) {
  const answerDict = {};

  const recursive = (arr, start = 0) => {
    if (arr.length > 1) {
      const res = arr.reduce((acc, cur) => acc + numbers[cur], 0);
      answerDict[res] = 1;
      return;
    }

    for (let i = start; i < numbers.length; i += 1) {
      arr.push(i);
      recursive(arr, i + 1);
      arr.pop();
    }
  };
  recursive([]);

  return Object.keys(answerDict).map((v) => parseInt(v));
}

const n = [2, 1, 3, 4, 1];
console.log(solution(n));
