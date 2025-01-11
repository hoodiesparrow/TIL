// https://leetcode.com/problems/average-of-levels-in-binary-tree/description/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var averageOfLevels = function (root) {
  const subTotals = [];
  const counts = [];

  function traverse(node, depth) {
    subTotals[depth] = (subTotals[depth] ?? 0) + node.val;
    counts[depth] = (counts[depth] ?? 0) + 1;

    if (node.left) traverse(node.left, depth + 1);
    if (node.right) traverse(node.right, depth + 1);
  }

  traverse(root, 0);

  return subTotals.map((v, i) => v / counts[i]);
};
