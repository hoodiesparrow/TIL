// https://leetcode.com/problems/is-object-empty/

/**
 * @param {Object|Array} obj
 * @return {boolean}
 */
var isEmpty = function (obj) {
  if (obj.length) return obj.length === 0;
  return Object.keys(obj).length === 0;
};
