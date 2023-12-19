function solution(participants, completions) {
  const chart = {};

  for (const participant of participants) {
    if (!chart.hasOwnProperty(participant)) {
      chart[participant] = 1;
      continue;
    }

    chart[participant] += 1;
  }

  for (const completion of completions) {
    chart[completion] -= 1;
  }

  for (const [name, count] of Object.entries(chart)) {
    if (count >= 1) return name;
  }
}

const p = ["marina", "josipa", "nikola", "vinko", "filipa"];
const c = ["josipa", "filipa", "marina", "nikola"];

console.log(solution(p, c));
