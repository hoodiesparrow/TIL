// https://school.programmers.co.kr/learn/courses/30/lessons/258712

function solution(friends, gifts) {
  const log = {};
  for (let name of friends) {
    log[name] = { index: 0, giftsToReceive: 0 };

    for (let friend of friends) {
      if (name === friend) continue;
      log[name][friend] = 0;
    }
  }

  for (let history of gifts) {
    const [sender, receiver] = history.split(" ");
    log[sender][receiver] += 1;
    log[sender].index += 1;
    log[receiver].index -= 1;
  }

  for (let name of friends) {
    for (let compare of friends) {
      if (name === compare) continue;

      const givenGifts = log[name][compare];
      const receivedGifts = log[compare][name];

      if (givenGifts > receivedGifts) {
        log[name].giftsToReceive += 1;
        continue;
      }

      if (givenGifts === receivedGifts) {
        if (log[name].index > log[compare].index) log[name].giftsToReceive += 1;
      }
    }
  }

  const answer = Math.max(...Object.values(log).map((v) => v.giftsToReceive));
  return answer;
}

const f = ["muzi", "ryan", "frodo", "neo"];
const g = [
  "muzi frodo",
  "muzi frodo",
  "ryan muzi",
  "ryan muzi",
  "ryan muzi",
  "frodo muzi",
  "frodo ryan",
  "neo muzi",
];
console.log(solution(f, g));
