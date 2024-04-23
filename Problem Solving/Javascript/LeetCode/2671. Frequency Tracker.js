// https://leetcode.com/problems/frequency-tracker/

var FrequencyTracker = function () {
  this.numbers = new Map();
  this.frequencies = new Map();
};

/**
 * @param {number} number
 * @return {void}
 */
FrequencyTracker.prototype.add = function (number) {
  const current = this.numbers.get(number) ?? 0;
  const next = current + 1;
  this.numbers.set(number, next);

  const currentFrequency = this.frequencies.get(current) ?? 0;
  const nextFrequency = this.frequencies.get(next) ?? 0;
  if (currentFrequency > 0)
    this.frequencies.set(current, this.frequencies.get(current) - 1);
  this.frequencies.set(next, nextFrequency + 1);
};

/**
 * @param {number} number
 * @return {void}
 */
FrequencyTracker.prototype.deleteOne = function (number) {
  const current = this.numbers.get(number) ?? 0;
  if (current === 0) return;

  const next = current - 1;
  this.numbers.set(number, next);

  const currentFrequency = this.frequencies.get(current) ?? 0;
  const nextFrequency = this.frequencies.get(next) ?? 0;
  this.frequencies.set(current, currentFrequency - 1);
  this.frequencies.set(next, nextFrequency + 1);
};

/**
 * @param {number} numbers
 * @return {boolean}
 */
FrequencyTracker.prototype.hasFrequency = function (frequency) {
  if (this.frequencies.get(frequency) ?? 0 > 0) return true;

  return false;
};

/**
 * Your FrequencyTracker object will be instantiated and called as such:
 * var obj = new FrequencyTracker()
 * obj.add(number)
 * obj.deleteOne(number)
 * var param_3 = obj.hasFrequency(frequency)
 */
