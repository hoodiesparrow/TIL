// https://leetcode.com/problems/min-max-game/

/**
 * @param {number[]} nums
 * @return {number}
 */
var minMaxGame = function (nums) {
  let minSwitch = true;
  while (nums.length > 1) {
    const next = [];
    for (let idx = 0; idx < nums.length; idx += 2) {
      const a = nums[idx],
        b = nums[idx + 1];
      next.push(minSwitch ? Math.min(a, b) : Math.max(a, b));
      minSwitch = !minSwitch;
    }

    nums = next;
  }

  return nums[0];
};

console.log(minMaxGame([70, 38, 21, 22]));
