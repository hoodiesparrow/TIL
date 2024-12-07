// https://leetcode.com/problems/longest-mountain-in-array/description/

/**
 * @param {number[]} arr
 * @return {number}
 */
var longestMountain = function (arr) {
  if (arr.length < 3) return 0;

  let maxLen = 0;
  let [left, mid, right] = [0, 1, 2];

  while (right < arr.length) {
    while (arr[left] < arr[left + 1]) {
      left -= 1;
    }

    while (arr[right - 1] > arr[right]) {
      right += 1;
    }

    if (right - left - 1 >= 3 && left !== mid - 1 && right !== mid + 1) {
      maxLen = Math.max(right - left - 1, maxLen);
    }

    mid = right;
    left = mid - 1;
    right = mid + 1;
  }

  return maxLen;
};

longestMountain([1, 2, 1, 2, 3, 4, 1]);
