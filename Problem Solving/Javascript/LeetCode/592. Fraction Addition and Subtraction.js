// https://leetcode.com/problems/fraction-addition-and-subtraction/description/?envType=daily-question&envId=2024-08-22

/**
 * @param {string} expression
 * @return {string}
 */
var fractionAddition = function (expression) {
  const LCM = 2 * 2 * 2 * 3 * 3 * 5 * 7;
  const AdjExpression = expression + "+";
  const positives = [];
  const negatives = [];

  let tmp = "";
  let isPositive = true;
  for (let chr of AdjExpression) {
    if (chr === "+" || chr === "-") {
      if (tmp.length) {
        isPositive ? positives.push(tmp) : negatives.push(tmp);
      }

      isPositive = chr === "+";
      tmp = "";
    } else {
      tmp += chr;
    }
  }

  const getNormalizedNum = (num, den, lcm = LCM) => (LCM / den) * num;

  let normalizedSum = 0;
  for (let token of positives) {
    const [n, d] = token.split("/").map((v) => parseInt(v));
    normalizedSum += getNormalizedNum(n, d);
  }
  for (let token of negatives) {
    const [n, d] = token.split("/").map((v) => parseInt(v));
    normalizedSum -= getNormalizedNum(n, d);
  }

  const toIrreducible = (num, den) => {
    const primes = [2, 3, 5, 7];
    let numerator = num;
    let denominator = den;

    for (let prime of primes) {
      while (!(numerator % prime) && !(denominator % prime)) {
        numerator /= prime;
        denominator /= prime;
      }
    }

    return [numerator, denominator];
  };

  const [numerator, denominator] = toIrreducible(normalizedSum, LCM);

  return `${numerator}/${denominator}`;
};

console.log(fractionAddition("-1/2+1/2"));

// 2, 3, 5, 7
// 좀 더 깔끔하게 짜려면 regex 쓰면 좋을텐데
