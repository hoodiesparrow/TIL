// https://school.programmers.co.kr/learn/courses/30/lessons/77484

function solution(lottos, win_nums) {
  let match = 0;
  let unknown = 0;

  for (const num of lottos) {
    if (win_nums.includes(num)) match += 1;
    if (num === 0) unknown += 1;
  }

  const matchesToPrize = (matches, unknowns) => {
    if (2 <= matches + unknowns) {
      return 7 - (matches + unknowns);
    }
    return 6;
  };

  return [matchesToPrize(match, unknown), matchesToPrize(match, 0)];
}

const lottos = [44, 1, 0, 0, 31, 25];
const w = [31, 10, 45, 1, 6, 19];

console.log(solution(lottos, w));
