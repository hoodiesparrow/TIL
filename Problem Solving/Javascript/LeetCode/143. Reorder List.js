// https://leetcode.com/problems/reorder-list/description/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function (head) {
  let pointer = head;
  let N = 0;

  while (pointer) {
    pointer = pointer.next;
    N += 1;
  }

  if (N < 2) return;

  pointer = head;
  let stackCount = 0;
  const stack = [];

  while (stackCount < N) {
    if (stackCount + 1 > N / 2) stack.push(pointer);

    pointer = pointer.next;
    stackCount += 1;
  }

  pointer = head;
  let preservedNext;

  while (stack.length) {
    const tail = stack.pop();
    preservedNext = pointer.next;

    pointer.next = tail;
    tail.next = preservedNext;
    pointer = preservedNext;
  }

  const lastElem = pointer.next || preservedNext;
  lastElem.next = null;
};

/*
0 1 2 3
0 3 1 2
p s n
0 3 1
1 2 null

----
0 1 2 3 4
p s n
0 4 1
1 3 2

start stacking from (N / 2 + 1)
*/

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

let head = new ListNode(1);
let pointer = head;

for (let i = 2; i < 5; i += 1) {
  pointer.next = new ListNode(i);
  pointer = pointer.next;
}

reorderList(head);
console.dir(head, { depth: 10 });
