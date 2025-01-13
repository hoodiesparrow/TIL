// https://leetcode.com/problems/minimum-depth-of-binary-tree/description/

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
var minDepth = function (root) {
  if (!root) return 0;

  const queue = [[root, 1]];
  let idx = 0;

  while (queue.length - idx > 0) {
    const [{ left, right }, depth] = queue[idx];
    if (!left && !right) return depth;

    if (left) queue.push([left, depth + 1]);
    if (right) queue.push([right, depth + 1]);

    idx += 1;
  }
};
