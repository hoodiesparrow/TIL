// https://leetcode.com/problems/minimum-number-of-operations-to-convert-time/description/

/**
 * @param {string} current
 * @param {string} correct
 * @return {number}
 */
var convertTime = function (current, correct) {
  const [currentH, currentM] = current.split(":").map((v) => parseInt(v));
  const [targetH, targetM] = correct.split(":").map((v) => parseInt(v));
  let timeDiff = 60 * (targetH - currentH) + (targetM - currentM);

  const minutes = [60, 15, 5, 1];
  let answer = 0;

  for (let minute of minutes) {
    const added = Math.floor(timeDiff / minute);
    answer += added;
    timeDiff -= added * minute;
  }

  return answer;
};

console.log(convertTime("02:30", "04:35"));
