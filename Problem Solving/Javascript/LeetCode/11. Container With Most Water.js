// https://leetcode.com/problems/container-with-most-water/description/

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let left = 0;
  let right = height.length - 1;
  let max = 0;

  while (left < right) {
    const heightL = height[left];
    const heightR = height[right];
    const current = Math.min(heightL, heightR) * (right - left);

    if (current > max) max = current;

    if (heightL < heightR) {
      left += 1;
    } else {
      right -= 1;
    }
  }

  return max;
};

console.log(maxArea([2, 3, 4, 5, 18, 17, 6]));
