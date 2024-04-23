// https://school.programmers.co.kr/learn/courses/30/lessons/72410

function solution(new_id) {
  const processes = [
    (id) => id.toLowerCase(),
    (id) => id.replaceAll(/[^a-z0-9-_.]/g, ""),
    (id) => {
      while (id.includes("..")) {
        id = id.replace("..", ".");
      }

      return id;
    },
    (id) => {
      if (id.startsWith(".")) {
        id = id.slice(1);
      }

      if (id.endsWith(".")) {
        id = id.slice(0, -1);
      }

      return id;
    },
    (id) => {
      if (id.length === 0) return "a";
      return id;
    },
    (id) => processes[3](id.slice(0, 15)),
    (id) => {
      while (id.length <= 2) {
        id += id.charAt(id.length - 1);
      }

      return id;
    },
  ];

  return processes.reduce((acc, cur) => cur(acc), new_id);
}

const n = "abcdefghijklmn.p";

const nn = "z-+.^.";
console.log(solution(n));
