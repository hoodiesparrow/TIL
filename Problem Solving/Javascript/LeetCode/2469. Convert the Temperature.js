// https://leetcode.com/problems/convert-the-temperature/

/**
 * @param {number} celsius
 * @return {number[]}
 */
var convertTemperature = function (celsius) {
  const K = celsius + 273.15;
  const F = celsius * 1.8 + 32.0;

  return [K, F];
};

const c = 36.5;
console.log(convertTemperature(c));
