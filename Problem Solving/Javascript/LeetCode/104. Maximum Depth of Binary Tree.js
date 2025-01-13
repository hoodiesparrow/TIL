// https://leetcode.com/problems/maximum-depth-of-binary-tree/description/

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
 * @return {number}
 */
var maxDepth = function (root) {
  if (!root) return 0;

  let max = 0;

  function dfs(node, depth) {
    const { left, right } = node;

    if (!left && !right) {
      if (depth > max) max = depth;
    }

    if (left) dfs(left, depth + 1);
    if (right) dfs(right, depth + 1);
  }

  dfs(root, 1);

  return max;
};
