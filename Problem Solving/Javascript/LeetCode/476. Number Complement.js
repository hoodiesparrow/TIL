// https://leetcode.com/problems/number-complement/description/?envType=daily-question&envId=2024-08-22

/**
 * @param {number} num
 * @return {number}
 */
var findComplement = function (num) {
  let power = 1;
  while (2 ** power <= num) {
    power += 1;
  }

  return num ^ (2 ** power - 1);
};

console.log(findComplement(5));
