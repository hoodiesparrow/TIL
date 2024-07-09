// https://leetcode.com/problems/longest-uploaded-prefix/description/

/**
 * @param {number} n
 */
var LUPrefix = function (n) {
  this.statusList = Array.from({ length: n });
  this.longestPrefix = 0;

  this.updatePrefix = () => {
    let count = 0;
    for (let i = this.longestPrefix; i < n; i += 1) {
      if (!this.statusList[i + 1]) break;
      count += 1;
    }

    this.longestPrefix += count;
  };
};

/**
 * @param {number} video
 * @return {void}
 */
LUPrefix.prototype.upload = function (video) {
  this.statusList[video] = true;
  this.updatePrefix();
};

/**
 * @return {number}
 */
LUPrefix.prototype.longest = function () {
  return this.longestPrefix;
};

var obj = new LUPrefix(5);
obj.upload(1);
obj.upload(2);
obj.upload(4);
obj.upload(3);
obj.upload(5);
console.log(obj.longest());
