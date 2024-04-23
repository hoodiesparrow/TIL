// https://school.programmers.co.kr/learn/courses/30/lessons/17682

function tokenizer(result) {
  const tokens = [];
  let temp = { score: null, bonus: null, option: null };
  let idx = 0;
  const int0To9 = [];
  for (let i = 0; i < 10; i += 1) {
    int0To9.push(i);
  }

  while (idx < result.length) {
    const cur = result[idx];
    const nextIdx = idx + 1;
    const next = result.length > nextIdx ? result[nextIdx] : null;

    if (int0To9.includes(parseInt(cur))) {
      if (next === "0") {
        temp.score = 10;
        idx += 1;
      } else {
        temp.score = cur;
      }
      idx += 1;
      continue;
    }
    if (cur === "S" || cur === "D" || cur === "T") temp.bonus = cur;
    if (cur === "*" || cur === "#") temp.option = cur;

    if (!next || int0To9.includes(parseInt(next))) {
      tokens.push({ ...temp });
      temp = { score: null, bonus: null, option: null };
    }
    idx += 1;
  }

  return tokens;
}

function solution(dartResult) {
  const tokens = tokenizer(dartResult);
  const bonusToSquare = { S: 1, D: 2, T: 3 };

  const finalScores = tokens.reduce((acc, cur, idx) => {
    const { score, bonus, option } = cur;
    const scoreBeforeOption = score ** bonusToSquare[bonus];
    if (!option) {
      acc.push(scoreBeforeOption);
      return acc;
    }

    if (option === "#") {
      acc.push(0 - scoreBeforeOption);
      return acc;
    }

    if (option === "*") {
      const idxBefore = idx - 1;
      if (idxBefore >= 0) acc[idxBefore] *= 2;
      acc.push(scoreBeforeOption * 2);
      return acc;
    }
  }, []);

  return finalScores.reduce((a, c) => a + c, 0);
}

const d = "1S2D*3T";
console.log(solution(d));
