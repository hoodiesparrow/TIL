// https://leetcode.com/problems/largest-number-after-mutating-substring/description/

/**
 * @param {string} num
 * @param {number[]} change
 * @return {string}
 */
var maximumNumber = function (num, change) {
  /*
  idea: window starting from left since it's a number

  1. num<str> to arr<int>
  2. left, right -> 0,0 ... if changing is bigger -> 0, 1
    2.1. 인덱스를 어떻게 잡을까?
    2.2. 굳이 인덱스 두개를 설정할 필요 없을 것 같네
        그냥 인덱스 하나 잡고 옮겨다니되 start를 추가로 저장하면 될 것 같음
        start, head -> 0, 0 ... if bigger -> 0, 1 이런식
        length limit / not bigger
        0, 0
        0, 1 // 1, 1
        return string
  */
  const nums = Array.from(num).map((n) => parseInt(n));

  let start = 0;
  let head = 0;

  while (head < nums.length) {
    const current = nums[head];
    const compare = change[current];
    const determined = start !== head;

    if (!determined && current >= compare) {
      start += 1;
      head = start;
      continue;
    }

    if (current > compare) break;

    nums[head] = compare;
    head += 1;
  }

  return nums.reduce((acc, cur) => acc + cur.toString(), "");
};

console.log(maximumNumber("214010", [6, 7, 9, 7, 4, 0, 3, 4, 4, 7]));
