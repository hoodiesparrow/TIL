// https://leetcode.com/problems/sum-of-digits-of-string-after-convert/

const sumOfDigits = (str, depth) => {
  if (depth === 0) return parseInt(str);

  // let sum = 0;
  // let num = n;
  // while (num > 0) {
  //   sum += num % 10;
  //   num = Math.floor(num / 10);
  // }
  let sum = 0;

  for (let i = 0; i < str.length; i += 1) {
    sum += parseInt(str.charAt(i));
  }

  return sumOfDigits(sum.toString(), depth - 1);
};

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var getLucky = function (s, k) {
  const base = "a".charCodeAt(0) - 1;

  let token = "";

  for (let i = 0; i < s.length; i += 1) {
    const code = s.charCodeAt(i) - base;
    token += code;
  }

  return sumOfDigits(token, k);
};

console.log(getLucky("dbvmfhnttvr", 5));

/**
 * !! JS parseInt (incl. Math.parseInt) cannot parse 422213681420202218 accurately !!
 * !! JS parseInt (incl. Math.parseInt) cannot parse 422213681420202218 accurately !!
 */
