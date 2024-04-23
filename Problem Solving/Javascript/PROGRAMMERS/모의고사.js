// https://school.programmers.co.kr/learn/courses/30/lessons/42840

function solution(answers) {
  const scores = {
    1: 0,
    2: 0,
    3: 0,
  };

  const pattern1 = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];
  const pattern2 = [2, 1, 2, 3, 2, 4, 2, 5];
  const pattern3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

  for (let idx = 0; idx < answers.length; idx += 1) {
    const answerIndex1 = parseInt(idx % pattern1.length);
    const answerIndex2 = parseInt(idx % pattern2.length);
    const answerIndex3 = parseInt(idx % pattern3.length);

    const answer1 = pattern1[answerIndex1];
    const answer2 = pattern2[answerIndex2];
    const answer3 = pattern3[answerIndex3];

    if (answer1 === answers[idx]) scores[1] += 1;
    if (answer2 === answers[idx]) scores[2] += 1;
    if (answer3 === answers[idx]) scores[3] += 1;
  }

  const answer = Object.entries(scores).reduce(
    (acc, [k, v]) => {
      const { max } = acc;
      console.log(acc);
      if (max === v) acc.highest.push(parseInt(k));
      if (max < v) {
        acc.max = v;
        acc.highest = [parseInt(k)];
      }

      return acc;
    },
    { max: 0, highest: [] }
  );

  return answer.highest;
}

const a = [1, 3, 2, 4, 2];
console.log(solution(a));
