// https://leetcode.com/problems/binary-tree-postorder-traversal/description/

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
var postorderTraversal = function (root) {
  if (!root) return [];

  const traverse = (root, history) => {
    if (root.left) traverse(root.left, history);
    if (root.right) traverse(root.right, history);

    history.push(root.val);
  };

  const result = [];
  traverse(root, result);

  return result;
};
