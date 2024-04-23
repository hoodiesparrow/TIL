// https://school.programmers.co.kr/learn/courses/30/lessons/1845

function solution(nums) {
  const theBook = {};

  let numOfTypes = 0;
  for (let num of nums) {
    if (theBook[num]) continue;

    theBook[num] = true;
    numOfTypes += 1;
  }

  const limit = parseInt(nums.length / 2, 10);

  return numOfTypes > limit ? limit : numOfTypes;
}

const a = [3, 1, 2, 3];
console.log(solution(a));
