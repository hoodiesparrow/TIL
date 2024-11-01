// https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  const length = prices.length;
  if (length < 2) return 0;

  let [left, right] = [0, 1];
  let maxProfit = 0;

  while (right < length) {
    if (prices[left] < prices[right]) {
      maxProfit = Math.max(maxProfit, prices[right] - prices[left]);
    } else {
      left = right;
    }

    right += 1;
  }

  return maxProfit;
};

/*
above is much better solution, moves left pointer to right when p[left] >= p [right],
since before p[right] is all covered.
*/

// var maxProfit = function (prices) {
//   const length = prices.length;
//   if (length < 2) return 0;

//   const minPrices = Array(length);
//   minPrices[0] = prices[0];

//   for (let i = 1; i < length; i += 1) {
//     if (minPrices[i - 1] > prices[i]) minPrices[i] = prices[i];
//     else minPrices[i] = minPrices[i - 1];
//   }

//   const maxPrices = Array(length);
//   maxPrices[length - 1] = prices.at(-1);

//   for (let i = length - 2; i >= 0; i -= 1) {
//     if (maxPrices[i + 1] < prices[i]) maxPrices[i] = prices[i];
//     else maxPrices[[i]] = maxPrices[i + 1];
//   }

//   let maxProfit = 0;
//   for (let i = 0; i < length; i += 1) {
//     if (maxProfit < maxPrices[i] - minPrices[i])
//       maxProfit = maxPrices[i] - minPrices[i];
//   }

//   return maxProfit;
// };

maxProfit([7, 1, 5, 3, 6, 4]);
