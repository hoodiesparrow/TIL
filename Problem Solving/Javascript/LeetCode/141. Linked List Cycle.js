// https://leetcode.com/problems/linked-list-cycle/description/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  let [slow, fast] = [head, head];

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) return true;
  }

  return false;
};

// using visited prop

// var hasCycle = function (head) {
//   let pointer = head;

//   while (pointer) {
//     if (pointer.visited) return true;
//     pointer.visited = true;
//     pointer = pointer.next;
//   }

//   return false;
// };
