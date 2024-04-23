// https://school.programmers.co.kr/learn/courses/30/lessons/81301

const ordinalIndex = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

function solution(s) {
  let answer = 0;
  let temp = "";

  for (let i = 0; i < s.length; i += 1) {
    const token = s[i];

    if (isNaN(parseInt(token))) {
      temp += token;
      const int = ordinalIndex.indexOf(temp);

      if (int > -1) {
        temp = "";
        answer *= 10;
        answer += int;
      }
      continue;
    }

    answer *= 10;
    answer += parseInt(token);
    temp = "";
  }

  return answer;
}

console.log(solution("one4seveneight"));
