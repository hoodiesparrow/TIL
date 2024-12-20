// https://leetcode.com/problems/permutations/description/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  const permutations = [];
  const visited = Array(nums.length).fill(false);

  function permutation(path) {
    if (path.length === nums.length) {
      permutations.push(path.map((idx) => nums[idx]));
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (visited[i]) continue;

      path.push(i);
      visited[i] = true;
      permutation(path);
      path.pop();
      visited[i] = false;
    }
  }

  permutation([]);

  return permutations;
};

permute([1, 2, 3]);
