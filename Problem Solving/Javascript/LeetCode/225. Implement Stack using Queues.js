// https://leetcode.com/problems/implement-stack-using-queues/description/

function _Deque() {
  this.deque = [];
  this.idx = 0;
}

_Deque.prototype.getSize = function () {
  return this.deque.length - this.idx;
};
_Deque.prototype.isEmpty = function () {
  return this.deque.length - this.idx === 0;
};
_Deque.prototype.peek = function () {
  return this.deque[this.idx];
};
_Deque.prototype.push = function (item) {
  this.deque.push(item);
};
_Deque.prototype.popLeft = function () {
  if (this.isEmpty()) return null;

  const ret = this.deque[this.idx];
  this.idx += 1;
  return ret;
};

var MyStack = function () {
  this.queue1 = new _Deque();
  this.queue2 = new _Deque();
  this.curr = this.queue1;
  this.prev = this.queue2;
};

/**
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function (x) {
  this.curr.push(x);
};

/**
 * @return {number}
 */
MyStack.prototype.pop = function () {
  const size = this.curr.getSize();
  for (let i = 0; i < size - 1; i++) {
    this.prev.push(this.curr.popLeft());
  }

  const lastElem = this.curr.popLeft();
  [this.curr, this.prev] = [this.prev, this.curr];

  return lastElem;
};

/**
 * @return {number}
 */
MyStack.prototype.top = function () {
  const size = this.curr.getSize();
  for (let i = 0; i < size - 1; i++) {
    this.prev.push(this.curr.popLeft());
  }

  const lastElem = this.curr.popLeft();
  this.prev.push(lastElem);
  [this.curr, this.prev] = [this.prev, this.curr];

  return lastElem;
};

/**
 * @return {boolean}
 */
MyStack.prototype.empty = function () {
  return this.curr.isEmpty();
};

var obj = new MyStack();
obj.push(1);
obj.push(2);
obj.push(3);
obj.pop();
obj.pop();
obj.pop();
var param_3 = obj.top();
