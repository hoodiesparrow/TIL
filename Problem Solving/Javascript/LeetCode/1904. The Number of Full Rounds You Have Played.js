// https://leetcode.com/problems/the-number-of-full-rounds-you-have-played/description/

var getNumOfRounds = function (start, end) {
  const base = Math.floor(start / 15);
  const basedStart = start - base * 15;
  const basedEnd = end - base * 15;

  let head = 0;
  let rounds = 0;
  while (head < basedEnd) {
    if (basedStart <= head && basedEnd >= head + 15) {
      head += 15;
      rounds += 1;
    } else {
      head += 15;
    }
  }

  return rounds;
};

/**
 * @param {string} loginTime
 * @param {string} logoutTime
 * @return {number}
 */
var numberOfRounds = function (loginTime, logoutTime) {
  // 1. 날이 넘어가지 않는 경우
  // 2. 날이 넘어가는 경우

  // 계산을 위해선: 시각이 아닌 시간
  // 1. 24:00 - loginTime
  // 2. logoutTime
  // 조심해야 할 부분은 로그인 하자 마자 시작이 아니라 정시에 시작임
  const [loginH, loginM] = loginTime.split(":").map((t) => parseInt(t));
  const [logoutH, logoutM] = logoutTime.split(":").map((t) => parseInt(t));

  const loginTimestamp = 60 * loginH + loginM;
  const logOutTimestamp = 60 * logoutH + logoutM;

  let rounds = 0;
  if (logOutTimestamp >= loginTimestamp) {
    rounds = getNumOfRounds(loginTimestamp, logOutTimestamp);
  } else {
    rounds =
      getNumOfRounds(loginTimestamp, 60 * 24) +
      getNumOfRounds(0, logOutTimestamp);
  }

  return rounds;
};

console.log(numberOfRounds("09:31", "10:14"));
