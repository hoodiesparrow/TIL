// https://leetcode.com/problems/longest-common-prefix/description/

/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  let commonPrefix = strs[0];

  for (let str of strs) {
    for (let idx = 0; idx < str.length; idx += 1) {
      const fromCommon = commonPrefix.charAt(idx);

      if (fromCommon === str.charAt(idx)) continue;
      else commonPrefix = commonPrefix.slice(0, idx);
    }

    if (commonPrefix === "") return commonPrefix;
    if (commonPrefix.length > str.length)
      commonPrefix = commonPrefix.slice(0, str.length);
  }

  return commonPrefix;
};
