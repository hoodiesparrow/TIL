// https://leetcode.com/problems/min-stack/description/

var MinStack = function () {
  // does not pop/top/getMin when empty
  this.stack = [];
  this.minStack = [Infinity];
};

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
  this.stack.push(val);
  if (this.minStack.at(-1) >= val) {
    this.minStack.push(val);
  }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  const popped = this.stack.pop();
  if (this.minStack.at(-1) === popped) {
    this.minStack.pop();
  }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.stack.at(-1);
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return this.minStack.at(-1);
};
