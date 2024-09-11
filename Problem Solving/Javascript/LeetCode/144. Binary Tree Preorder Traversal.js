// https://leetcode.com/problems/binary-tree-preorder-traversal/description/

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
var preorderTraversal = function (root) {
  if (!root) return [];

  const traverse = (root, history) => {
    history.push(root.val);

    if (root.left) traverse(root.left, history);
    if (root.right) traverse(root.right, history);
  };

  const result = [];
  traverse(root, result);

  return result;
};
