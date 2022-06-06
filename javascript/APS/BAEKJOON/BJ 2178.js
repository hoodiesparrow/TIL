const fs = require('fs')

class Queue {
  constructor() {
    this.storage = {}
    this.front = 0
    this.rear = 0
  }

  size() {
    if (this.storage[this.rear] === undefined) {
      return 0
    }
    return this.rear - this.front + 1
  }

  enqueue(value) {
    if (this.size() === 0) {
      this.storage[0] = value
      return;
    }
    this.rear += 1
    this.storage[this.rear] = value
  }

  popleft() {
    let tmp;
    if (this.front === this.rear) {
      tmp = this.storage[this.front]
      delete this.storage[this.front]
      this.front = 0
      this.rear = 0
      return tmp
    }
    tmp = this.storage[this.front]
    delete this.storage[this.front]
    this.front += 1
    return tmp
  }

  // peek() {
  //   return this.storage[this.front]
  // }
}

const drc = [[1, 0], [0, 1], [-1, 0], [0, -1]]

function solution() {
  // input---------------------
  const file = fs.readFileSync('./BJ 2178.txt').toString().split('\n')
  // const file = fs.readFileSync('dev/stdin').toString().split('\n')
  const [Row, Col] = Array.from(file.shift().split(' '), (n) => +n)
  const maze = file.map((row) => row.split('').map((el) => +el))

  // calculation---------------
  const answer = bfs({ maze, Row, Col})

  // submit answer-------------
  printer(answer)
}

function bfs({ maze, Row, Col }) {
  // init----------------------
  const visited = Array.from(Array(Row), () => Array(Col).fill(false))
  visited[0][0] = true
  const queue = new Queue()
  queue.enqueue([0, 0, 1])

  // search--------------------
  while (queue.size() > 0) {
    [r, c, dist] = queue.popleft()
    for (const [dr, dc] of drc) {
      const nr = r + dr
      const nc = c + dc

      // validation------------
      if (nr < 0 || nr >= Row || nc < 0 || nc >= Col) continue;
      if (visited[nr][nc]) continue;
      if (!maze[nr][nc]) continue;

      // return calcuated distance
      if (nr === Row - 1 && nc === Col - 1) {
        return dist + 1
      }

      queue.enqueue([nr, nc, dist + 1])
      visited[nr][nc] = true
    }
  }

  return 'no possible path exist'
}

function printer(dist) {
  console.log(dist)
}

solution()

/*
  자바스크립트로 처음 풀어본 그래프 문제였다. 파이썬처럼 배열, 입력 다루기 편하지 않아 몇 가지를 검색하며 풀이했다.
  미세한 성능보다는 가독성을 위주로 풀이하고자 했다.
  또한 자바스크립트 배열은 shift() 메서드로 큐처럼 사용할 수 있지만, 맨 앞 인덱스의 항목을 삭제하는 방식이라 느리다고 알고 있어서
  https://velog.io/@longroadhome/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0-JS%EB%A1%9C-%EA%B5%AC%ED%98%84%ED%95%98%EB%8A%94-.%ED%81%90-Queue
  를 참고하여 간단한 큐 클래스를 구현하였다. 지금은 객체로 구현되어 있는데 배열로 구현하면 뭐가 다를지, 또 내장 배열 shift()의 상대 속도도 알아봐야겠다.
  2차원 배열 선언: https://gent.tistory.com/296

  리액트 개발을 하며 자바스크립트에 익숙해졌다고 생각했지만 막상 기본적인 bfs 문제를 푸는 데에도 한시간 넘게 애를 먹었다.
  역시 자만심만큼 쉽게 깨지는 것은 없는 것 같다.
*/