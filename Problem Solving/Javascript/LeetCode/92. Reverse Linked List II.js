// https://leetcode.com/problems/reverse-linked-list-ii/description/

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
  if (!head || left === right) return head;

  let dummyHead = new ListNode(501, head); // to handle cases with left === 1

  let skipped = dummyHead;
  let pointer = head;

  for (let i = 0; i < left - 1; i++) {
    skipped = pointer;
    pointer = pointer.next;
  }

  let prev = null;

  for (let i = 0; i < right - left + 1; i++) {
    const next = pointer.next;
    pointer.next = prev;
    prev = pointer; // head of reversed
    pointer = next; // head of remainder
  }

  skipped.next.next = pointer;
  skipped.next = prev;

  return dummyHead.next;
};
