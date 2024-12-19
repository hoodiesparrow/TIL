// https://leetcode.com/problems/combinations/description/

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  const combinations = [];

  function getCombination(start, path) {
    if (path.length === k) return combinations.push([...path]);

    for (let i = start; i < n + 1; i++) {
      path.push(i);
      getCombination(i + 1, path);
      path.pop();
    }
  }

  getCombination(1, []);

  return combinations;
};

// var combine = function (n, k) {
//   const combinations = [];

//   function recursive(combination) {
//     if (combination.length === k) {
//       return combinations.push([...combination]);
//     }

//     const lastElem = combination.at(-1);

//     for (let next = lastElem + 1; next < n + 1; next++) {
//       combination.push(next);
//       recursive(combination);
//       combination.pop();
//     }
//   }

//   for (let m = 1; m < n + 1; m++) {
//     recursive([m]);
//   }

//   return combinations;
// };

combine(5, 3);
