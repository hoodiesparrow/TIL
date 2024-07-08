// https://leetcode.com/problems/task-scheduler-ii/

/**
 * @param {number[]} tasks
 * @param {number} space
 * @return {number}
 */
var taskSchedulerII = function (tasks, space) {
  const lastPerformedDate = new Map();
  let days = 0;
  let idx = 0;

  while (idx < tasks.length) {
    let daysAdded = 1;
    const type = tasks[idx];
    const lastPerformedAt = lastPerformedDate.get(type);

    if (lastPerformedAt !== undefined) {
      const diff = days - lastPerformedAt;
      if (space - diff > 0) {
        const daysBreak = space - diff;
        daysAdded += daysBreak;
      }
    }

    idx += 1;
    days += daysAdded;
    lastPerformedDate.set(type, days);
  }

  return days;
};

const t = [1, 2, 1, 2, 3, 1],
  s = 3;
console.log(taskSchedulerII(t, s));
