const fs = require('fs')

/**
 * 1. 에라토스테네스의 체로 백만 이하의 소수를 모두 구한다
 * 2. 우선 그리디로 풀이
 * 3. 만약 시간이 부족하다면? 사잇값을 통해 뭔가 할 수 있지 않을까?
 */

const getPrimes = () => {
  // const numbers = [...new Array(999998)].map((unused, idx) => idx + 2)
  const isPrime = [...new Array(1000000)].map(() => null)

  for (let idx = 2; idx < isPrime.length; idx += 1) {
    if (isPrime[idx] === null) {
      isPrime[idx] = true

      // erase non-primes
      const max = parseInt(1000000 / idx)
      if (max <= 1) {
        continue
      }
      for (let multiplier = 2; multiplier < max; multiplier += 1) {
        isPrime[multiplier * idx] = false
      }
    }
  }

  // reduce를 쓸 때 유의점 :: 항상 acc를 리턴해 주어야 함
  // - if문 등으로 아무것도 리턴되지 않으면 중간에 값이 undefined로 바뀜
  return (isPrime.reduce((acc, cur, idx) => {
    if (cur) {
      acc.push(idx)
    }
    return acc
  }, []))
}

const main = () => {
  const primes = getPrimes()
  const file = fs.readFileSync('./BJ 6588.txt').toString().split('\n').map((n) => parseInt(n))
  const HALF_LIMIT_IDX = 41538

  for (let tc = 0; tc < file.length - 1; tc += 1) {
    const target = file[tc]
    let result = null

    for (let start = 0; start < HALF_LIMIT_IDX; start += 1) {
      let end = file.length - 1

      while (start < end) {
        const sum = primes[start] + primes[end]
        if (sum > target) {
          end -= 1
          continue
        }
        if (sum < target) {
          break
        }
        if (sum === target) {
          result = `${target} = ${primes[start]} + ${primes[end]}`
          break
        }
      }

      if (result !== null) {
        console.log(result)
        continue
      }
    }
  }
}

main()