// https://leetcode.com/problems/rotate-list/description/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function (head, k) {
  let length = 0;
  let pointer = head;

  while (pointer) {
    pointer = pointer.next;
    length += 1;
  }

  k %= length;
  pointer = head;

  if (length < 2 || k === 0) return head;

  for (let i = 0; i < length - k - 1; i += 1) {
    pointer = pointer.next;
  }

  const rotationHead = pointer.next;
  pointer.next = null;

  pointer = rotationHead;

  for (let i = 0; i < k - 1; i += 1) {
    pointer = pointer.next;
  }

  pointer.next = head;

  return rotationHead;
};
