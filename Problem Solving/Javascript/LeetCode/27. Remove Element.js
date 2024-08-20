// https://leetcode.com/problems/remove-element/submissions/1362483851/

/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
  let left = 0;
  let right = nums.length - 1;
  let k = 0;

  while (left < nums.length) {
    const num = nums[left];
    if (num === val) {
      if (right <= left) break;

      for (right; left < right; right -= 1) {
        if (nums[right] !== val) {
          nums[left] = nums[right];
          nums[right] = val;
          k += 1;
          break;
        }
      }
    } else {
      k += 1;
    }

    left += 1;
  }

  return k;
};

const n = [3, 2, 2, 3];
console.log(removeElement(n, 3));
console.log(n);

/**
 * 2 pointer -> left: 체크, right: 자리 바꾸기용
 * left는 항상 +1
 * right는 val 값과 일치하지 않는 값이 나올 때까지 땡겨야함 -> for문
 */
