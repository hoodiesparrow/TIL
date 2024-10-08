// https://leetcode.com/problems/3sum/description/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  const numMap = {};

  for (let num of nums) {
    numMap[num] = (numMap[num] ?? 0) + 1;
  }

  const sumList = [];
  const numList = Object.keys(numMap)
    .map((v) => parseInt(v))
    .sort((a, b) => a - b);

  for (let i = 0; i < numList.length; i += 1) {
    const center = numList[i];

    // divide into negative : positive
    // -> reduce calculation + avoid -1 0 1 (1 = center) situation
    if (center < 0) {
      for (let j = 0; j < i; j += 1) {
        const left = numList[j];
        const right = -(left + center);

        if (numMap[right] !== undefined) {
          sumList.push([left, center, right]);
        }
      }
    } else {
      for (let j = numList.length - 1; i < j; j -= 1) {
        const right = numList[j];
        const left = -(center + right);

        if (numMap[left] !== undefined) {
          sumList.push([left, center, right]);
        }
      }
    }

    // exception
    if (!(center % 2)) {
      const negativeHalf = -(center / 2);

      if (center === 0) {
        if (numMap[0] >= 3) sumList.push([0, 0, 0]);
      } else if (numMap[negativeHalf] >= 2) {
        sumList.push([center, negativeHalf, negativeHalf]);
      }
    }
  }

  return sumList;
};

// 중간 것 고르기 -> 중복을 방지하기 위해
// 반 확인 => a === 2b일 때, a 기준으로 확인.
// 000

threeSum([0, 0, 0]);
