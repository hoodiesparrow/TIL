const fs = require('fs')
const file = fs.readFileSync('./BJ 1931.txt').toString().split('\n')
// const file = fs.readFileSync('dev/stdin').toString().split('\n')
const N = parseInt(file[0])
const meetings = {}
let answer = 0

for (let i = 1; i <= N; i += 1) {
  const [idx, val] = file[i].split(' ')
  if (idx === val) {
    answer += 1
    continue
  }

  if (!meetings[idx]) {
    meetings[idx] = [parseInt(val)]
  } else {
    meetings[idx].push(parseInt(val))
  }
}

const keys = Object.keys(meetings)
const length = keys.length
let idx = 0
let currentMin = 0

console.log(length)

while (idx < length - 1) {
  currentMin = Math.min(meetings[keys[idx]])
  // if (currentMin < parseInt(keys[idx + 1])) {
  //   answer += 1
  //   continue
  // }

  while (currentMin > parseInt(keys[idx + 1])) { // 시간 모자라면 -1
    let candidate = Math.min(meetings[keys[idx + 1]])
    if (currentMin > candidate) {
      currentMin = candidate
    }
    if (idx + 1 < length - 1) {
      idx += 1
    } else {
      break
    }
  }
  answer += 1
}

// while문 내부 while문을 함수로 다시 떼는 게 어때

console.log(answer)

/*
  풀이중
*/