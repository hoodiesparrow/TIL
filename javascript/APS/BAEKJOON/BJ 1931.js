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
let candidate = 0
while (idx < length - 1) {
  candidate = min(meetings[keys[idx]])
  if (candidate < parseInt(keys[idx + 1])) {
    answer += 1
    idx += 1
    continue
  }

  const nextCandidate = min(meetings[keys[idx + 1]])
  }
}

console.log(calculate(answer))

/*
  풀이중
*/