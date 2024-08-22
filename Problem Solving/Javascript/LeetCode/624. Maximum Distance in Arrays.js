// https://leetcode.com/problems/maximum-distance-in-arrays/description/?envType=daily-question&envId=2024-08-22

/**
 * @param {number[][]} arrays
 * @return {number}
 */
var maxDistance = function (arrays) {
  let globalMin = arrays[0][0];
  let globalMax = arrays[0].at(-1);
  let diff = 0;

  for (let idx = 1; idx < arrays.length; idx += 1) {
    const array = arrays[idx];
    const min = array[0];
    const max = array.at(-1);

    diff = Math.max(diff, globalMax - min, max - globalMin);

    if (min < globalMin) globalMin = min;
    if (max > globalMax) globalMax = max;
  }

  return diff;
};

/**
 * @param {number[][]} arrays
 * @return {number}
 */
// var maxDistance_hardCorded = function (arrays) {
//   const minNum = [999999, 999999];
//   const minIdx = [null, null];
//   const maxNum = [-999999, -999999];
//   const maxIdx = [null, null];

//   for (let idx = 0; idx < arrays.length; idx += 1) {
//     const array = arrays[idx];
//     const min = array[0];
//     const max = array.at(-1);

//     if (min <= minNum[0]) {
//       minNum[1] = minNum[0];
//       minIdx[1] = minIdx[0];
//       minNum[0] = min;
//       minIdx[0] = idx;
//     } else if (min < minNum[1]) {
//       minNum[1] = min;
//       minIdx[1] = idx;
//     }

//     if (max >= maxNum[0]) {
//       maxNum[1] = maxNum[0];
//       maxIdx[1] = maxIdx[0];
//       maxNum[0] = max;
//       maxIdx[0] = idx;
//     } else if (max > maxNum[1]) {
//       maxNum[1] = max;
//       maxIdx[1] = idx;
//     }
//   }

//   if (minIdx[0] !== maxIdx[0]) {
//     return maxNum[0] - minNum[0];
//   }

//   const a = maxNum[1] - minNum[0];
//   const b = maxNum[0] - minNum[1];
//   return a - b > 0 ? a : b;
// };

console.log(
  maxDistance([
    [1, 5],
    [3, 4],
  ])
);
