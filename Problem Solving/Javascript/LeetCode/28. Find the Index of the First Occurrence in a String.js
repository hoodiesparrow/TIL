// https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/description/

/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  let idx = 0;
  let offset = 0;

  while (idx < haystack.length) {
    if (haystack[idx + offset] === needle[offset]) offset += 1;
    else {
      idx += 1;
      offset = 0;
    }

    if (offset === needle.length) return idx;
  }

  return -1;
};
