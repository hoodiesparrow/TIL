// https://leetcode.com/problems/count-and-say/description/

/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function (n, carry = "1") {
  if (n === 1) return carry;

  let RLEArray = [];
  let type = null;
  let count = 0;

  for (let idx = 0; idx < carry.length; idx += 1) {
    const current = carry.charAt(idx);

    if (current !== type) {
      if (count) {
        RLEArray.push(count);
        RLEArray.push(type);
      }

      type = current;
      count = 0;
    }

    count += 1;
  }

  if (count) {
    RLEArray.push(count);
    RLEArray.push(type);
  }

  return countAndSay(n - 1, RLEArray.join(""));
};

countAndSay(1);
countAndSay(3);
console.log(countAndSay(4));
