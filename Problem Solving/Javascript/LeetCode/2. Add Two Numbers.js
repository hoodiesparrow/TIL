// https://leetcode.com/problems/add-two-numbers/

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let a = l1;
  let b = l2;

  let n1 = 0;
  let n2 = 0;
  let digit = 0;

  while (a || b) {
    console.log("------", a, b);
    console.log(n1, n2);
    if (a) {
      n1 += a.val * 10 ** digit;
      a = a.next;
    }

    if (b) {
      n2 += b.val * 10 ** digit;
      b = b.next;
    }

    digit += 1;
  }

  const strArray = (n1 + n2).toString().split("").reverse();
  let answer = new ListNode();
  let pointer = answer;

  for (let s of strArray) {
    pointer.next = new ListNode(parseInt(s));
    pointer = pointer.next;
  }

  return answer.next;
};

console.log(
  addTwoNumbers(
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 1,
    ],
    [5, 6, 4]
  )
);
