function solution(bandage, health, attacks) {
  const [maxCombo, hps, bonus] = bandage;

  const duration = attacks.at(-1)[0];
  let hp = health;
  let time = 1;
  let combo = 0;
  let atkIndex = 0;

  while (time <= duration) {
    const [atkTime, damage] = attacks[atkIndex];
    if (atkIndex < attacks.length && time === atkTime) {
      hp -= damage;
      combo = 0;
      atkIndex += 1;
    } else {
      hp += hps;
      combo += 1;
      if (combo === maxCombo) {
        combo = 0;
        hp += bonus;
      }
    }

    if (hp > health) hp = health;
    if (hp <= 0) return -1;

    time += 1;
  }

  return hp;
}

const bandage = [5, 1, 5];
const h = 30;
const a = [
  [2, 10],
  [9, 15],
  [10, 5],
  [11, 5],
];

console.log(solution(bandage, h, a));
