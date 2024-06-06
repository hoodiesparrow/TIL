// https://leetcode.com/problems/join-two-arrays-by-id/

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Array}
 */
var join = function (arr1, arr2) {
  const joined = new Map();

  for (const el of arr1) {
    const { id } = el;
    joined.set(id, el);
  }

  for (const el of arr2) {
    const { id } = el;
    joined.set(id, el);
  }

  const joinedArr = joined.map(([id, el]) => el);

  joinedArr.sort(({ id: cur }, { id: comp }) => {
    return cur < comp;
  });
};
