// https://leetcode.com/problems/remove-linked-list-elements/description/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} target
 * @return {ListNode}
 */
var removeElements = function (head, target) {
  let pointer = head;
  let prev = null;

  while (pointer) {
    const { val } = pointer;

    if (val === target) {
      if (prev === null) {
        head = pointer.next;
      } else {
        prev.next = pointer.next;
      }
    } else {
      prev = pointer;
    }

    pointer = pointer.next;
  }

  return head;
};
