// https://leetcode.com/problems/coin-change/description/

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  const dp = Array(amount + 1).fill(amount + 1); // 1 <= coins[i]
  dp[0] = 0;

  for (let target = 1; target < amount + 1; target++) {
    for (let coin of coins) {
      if (target - coin >= 0) {
        // use optimized cost && save it to current target
        dp[target] = Math.min(dp[target], dp[target - coin] + 1);
      }
    }
  }

  return dp[amount] <= amount ? dp[amount] : -1;
};

// var coinChange = function (coins, amount) {
//   if (amount === 0) return 0;

//   const visited = new Set();

//   const recursive = (changes, step) => {
//     if (changes.length === 0) return -1;

//     const nextChanges = [];

//     for (let change of changes) {
//       for (let coin of coins) {
//         const current = change + coin;

//         if (current === amount) return step + 1;
//         if (current > amount) continue;
//         if (visited.has(change + coin)) continue;

//         visited.add(change + coin);
//         nextChanges.push(change + coin);
//       }
//     }

//     return recursive(nextChanges, step + 1);
//   };

//   return recursive(coins, 1);
// };

coinChange([1, 2, 5], 11);
