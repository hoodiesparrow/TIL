// https://leetcode.com/problems/string-to-integer-atoi/description/

/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
  const trimmed = s.trimStart();

  let idx;
  let isNegative = false;
  let collected = [];

  let [sign, idxAdjust] = (() => {
    const first = trimmed.charAt(0);
    if (first === "-" || first === "+") return [first, 1];
    else return ["+", 0];
  })();

  idx = idxAdjust;
  const bound = sign === "+" ? 2 ** 31 - 1 : 2 ** 31;
  const maxLen = bound.toString().length;

  while (idx < trimmed.length) {
    const current = trimmed.charAt(idx);
    idx += 1;

    if (isNaN(parseInt(current))) break;
    if (current === "0" && collected.length === 0) continue;
    else collected.push(current);
  }

  let answer;
  const total = parseInt(collected.join(""));
  if (total >= bound) {
    answer = parseInt(sign + bound);
  } else if (!collected.length) {
    return 0;
  } else {
    answer = parseInt(sign + total);
  }

  console.log(collected);

  return answer;
};

console.log(myAtoi("1337c0d3"));
