// https://school.programmers.co.kr/learn/courses/30/lessons/67256

function solution(numbers, hand) {
  const getPosition = (int) => {
    let r;
    let c;
    if (int === 0) {
      r = 4
      c = 1
    }   
    if (int < 4) {
      r = 1
      c = 2 - (4 - int)
    } 
    if (int < 7) 
    if (int < 10) 

    return [r, c]
  }
  
  const answer = [];
  let idx = 0
  const hands = {
    left: [4, 0],
    right: [4, 2],
  };

  while (idx < numbers.length) {
    
    // answer.push()
    idx += 1
  }
  return answer.join("");
}

const n = [1, 3, 4, 5, 8, 2, 1, 4, 5, 9, 5];
console.log(solution(n, "right"));
