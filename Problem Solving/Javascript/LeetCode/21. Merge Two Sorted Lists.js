// https://leetcode.com/problems/merge-two-sorted-lists/description/

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  const dummy = new ListNode(200);
  let pointer = dummy;
  let [head1, head2] = [list1, list2];

  while (head1 && head2) {
    if (head1.val < head2.val) {
      pointer.next = head1;
      head1 = head1.next;
    } else {
      pointer.next = head2;
      head2 = head2.next;
    }

    pointer = pointer.next;
  }

  const remaining = head1 || head2;
  pointer.next = remaining;

  /**
   * convert conditions to head1 && head2 so that each head can always contain val
   */

  // const values = [0, null, null];
  // while (head1 || head2) {
  //   if (!(head1 && head2)) {
  //     // skip if only 1 list left
  //     const remaining = head1 || head2;
  //     pointer.next = remaining;
  //     break;
  //   }

  //   values[1] = head1.val ?? -101;
  //   values[2] = head2.val ?? -101;

  //   if (values[1] < values[2]) {
  //     pointer.next = head1;
  //     head1 = head1.next;
  //   } else {
  //     pointer.next = head2;
  //     head2 = head2.next;
  //   }

  //   pointer = pointer.next;
  // }

  return dummy.next;
};
