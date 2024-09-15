// https://leetcode.com/problems/combination-sum/description/

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  // no negative or zero value in candidates
  const answer = [];
  const length = candidates.length;

  const combinations = (combination) => {
    // combination contains indexes of candidates
    // branch with current sum
    const sum = combination.reduce((a, c) => a + candidates[c], 0);
    if (sum === target) answer.push(combination.map((idx) => candidates[idx]));
    if (sum > target) return;

    for (let idx = combination.at(-1); idx < length; idx += 1) {
      combinations([...combination, idx]);
    }
  };

  for (let i = 0; i < candidates.length; i += 1) {
    combinations([i]);
  }

  return answer;
};

console.log(combinationSum([2, 3, 5], 8));
