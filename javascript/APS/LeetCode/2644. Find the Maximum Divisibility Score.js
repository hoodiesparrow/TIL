// https://leetcode.com/problems/find-the-maximum-divisibility-score/

/**
 * @param {number[]} nums
 * @param {number[]} divisors
 * @return {number}
 */
function maxDivScore(nums, divisors) {
  let ret;
  let maximumDivisibility = 0;

  for (const divisor of divisors) {
    const subtotal = nums.reduce((acc, cur) => {
      if (cur % divisor !== 0) return acc;
      return acc + 1;
    }, 0);

    if (subtotal > maximumDivisibility) {
      maximumDivisibility = subtotal;
      ret = divisor;
    }

    if (subtotal === maximumDivisibility) {
      if (ret === undefined || divisor < ret) ret = divisor;
    }
  }

  return ret;
}
