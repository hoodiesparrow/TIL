// https://leetcode.com/problems/reverse-linked-list/description/

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
var reverseList = function (head) {
  let pointer = head;
  let prev = null;

  while (pointer) {
    const next = pointer.next;

    pointer.next = prev;
    prev = pointer;
    pointer = next;
  }

  return prev;
};
// var reverseList = function (head) {
//   if (!head || !head.next) return head;

//   let pointer = head.next;
//   let reversed = head;
//   reversed.next = null;

//   while (pointer) {
//     const temp = pointer.next;
//     pointer.next = reversed;
//     reversed = pointer;
//     pointer = temp;
//   }

//   return reversed;
// };
