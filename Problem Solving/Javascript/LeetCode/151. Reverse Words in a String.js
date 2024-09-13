// https://leetcode.com/problems/reverse-words-in-a-string/description/

/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  let answer = "";

  let left = s.length - 1;
  let right = s.length;
  let isWord = false;

  while (left >= 0) {
    const cur = s[left];
    if (s[left] !== " ") {
      if (!isWord) {
        right = left + 1;
        isWord = true;
      }
    } else {
      if (isWord) {
        answer += s.slice(left + 1, right) + " ";
        right = left;
        isWord = false;
      }
    }

    left -= 1;
  }

  if (isWord) answer += s.slice(0, right);
  else return answer.slice(0, -1);

  return answer;
};

console.log(reverseWords(" hello world ").length);

// short version
var shortReverse = function (s) {
  return s
    .split(" ")
    .filter((w) => w !== "")
    .reverse()
    .join(" ");
};
