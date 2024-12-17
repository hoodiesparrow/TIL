// https://leetcode.com/problems/letter-case-permutation/description/

/**
 * @param {string} s
 * @return {string[]}
 */
var letterCasePermutation = function (s) {
  const permutations = [];

  const traverse = (string) => {
    if (string.length === s.length) {
      return permutations.push(string);
    }

    const next = s.charAt(string.length);

    if (isNaN(parseInt(next, 10))) {
      traverse(string + next.toLowerCase());
      traverse(string + next.toUpperCase());
    } else {
      traverse(string + next);
    }
  };

  traverse("");

  return permutations;
};

letterCasePermutation("a1b2");
