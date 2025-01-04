// https://leetcode.com/problems/palindrome-linked-list/description/

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
  let n = 0;
  let pointer = head;

  while (pointer) {
    n += 1;
    pointer = pointer.next;
  }

  if (n < 2) return true;

  pointer = head;

  for (let i = 0; i < Math.ceil(n / 2); i++) {
    pointer = pointer.next;
  }

  let prev = null;

  while (pointer) {
    const next = pointer.next;
    pointer.next = prev;
    prev = pointer;
    pointer = next;
  }

  pointer = prev;

  while (head && pointer) {
    const hv = head.val;
    const pv = pointer.val;

    if (hv !== pv) return false;

    head = head.next;
    pointer = pointer.next;
  }

  return true;
};

const h = new ListNode(1);
let p = h;

for (let i of [2, 2, 1]) {
  const next = new ListNode(i);
  p.next = next;
  p = next;
}

isPalindrome(h);
