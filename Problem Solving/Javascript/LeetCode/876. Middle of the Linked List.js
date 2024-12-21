// https://leetcode.com/problems/middle-of-the-linked-list/description/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function (head) {
  let node = head;
  let length = 0;

  while (node) {
    node = node.next;
    length += 1;
  }

  node = head;

  for (let i = 0; i < parseInt(length / 2); i++) {
    node = node.next;
  }

  return node;
};
