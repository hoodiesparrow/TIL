const fs = require('fs')

function solution() {
  const file = fs.readFileSync('./BJ 4344.txt').toString().split('\n')
  // const file = fs.readFileSync('dev/stdin').toString.split('\n')
  const T = +file[0]

  for (let i = 1; i <= T; i += 1) {
    const [n, aboveAverageNumber] = calculator(file[i])
    printer({ n, aboveAverageNumber })
  }
}

function calculator(scores) {
  const convertedScores = scores.split(' ').map((str) => +str)
  const n = convertedScores[0]

  let total = 0
  for (let i = 1; i <= n; i += 1) {
    total += convertedScores[i]
  }

  const average = total / n
  const aboveAverageStudents = convertedScores.reduce((pre, cur, idx) => {
    if (cur > average && idx !== 0) {
      return pre + 1;
    }
    return pre
  }, 0)

  return [n, aboveAverageStudents]
}

function printer({ n, aboveAverageNumber }) {
  console.log(`${((100 * aboveAverageNumber) / n).toFixed(3)}%`)
}

solution()

/*
  입력 및 계산과 출력을 요하는 간단한 문제였다.
  최근 함수형 코딩이라는 책을 읽고 있어서 책의 내용을 적용해서 풀이해 보았다.
*/