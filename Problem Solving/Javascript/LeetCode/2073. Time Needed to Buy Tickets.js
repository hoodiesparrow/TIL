// https://leetcode.com/problems/time-needed-to-buy-tickets/description/

/**
 * @param {number[]} tickets
 * @param {number} k
 * @return {number}
 */
var timeRequiredToBuy = function (tickets, k) {
  let total = tickets[k];

  for (let i = 0; i < k; i++) {
    total += Math.min(tickets[i], tickets[k]);
  }

  for (let i = k + 1; i < tickets.length; i++) {
    total += Math.min(tickets[i], tickets[k] - 1);
  }

  /**
   * greedy
   * 1 2 5 4 4, k = 2
   * 1 2 5 5 5, k = 2
   * - before k -> add Math.min(tickets[i],tickets[k])
   * - after k -> add Math.min(tickets[i], tickets[k] - 1)
   */

  return total;
};
