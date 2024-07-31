// https://leetcode.com/problems/zigzag-conversion/description/

/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
  if (numRows === 1) return s;

  const arr = Array.from({ length: numRows }, () => []);

  let idx = 0;
  let rowIdx = 0;
  let counter = 0;
  let isUp = false;

  while (idx < s.length) {
    const string = s.charAt(idx);
    arr[rowIdx].push(string);

    idx += 1;
    counter += 1;

    if (counter === numRows) {
      isUp = !isUp;
      counter = 1;
    }

    if (isUp) {
      rowIdx -= 1;
    } else {
      rowIdx += 1;
    }
  }

  return arr.map((a) => a.join("")).join("");
};

console.log(convert("abcd", 3));

// a     g
// b   f h
// c e   i
// d     j

// 1 2 3 4

// 1 3
// 2 4    1324

// 1   5    1524637
// 2 4 6
// 3   7

// 2차원 공간 정보를 직접 저장하기 or 규칙성을 찾기
// 정보를 직접 저장한다면, , , 2차원 배열 생성 -> 차곡차곡 넣기
// 배열 -> R = rows, C = 빈 공간은 생각하지 않아도 괜찮으므로, 인덱스가 아닌 push로 처리
// 옮겨가면서 저장 - 2phase (up / down)
