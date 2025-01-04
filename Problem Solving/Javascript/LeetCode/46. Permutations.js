// https://leetcode.com/problems/permutations/description/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  const permutations = [];
  const N = nums.length;

  function backTrack(start) {
    if (start === N) {
      return permutations.push([...nums]);
    }

    for (let i = start; i < N; i++) {
      [nums[start], nums[i]] = [nums[i], nums[start]];
      backTrack(start + 1);
      [nums[start], nums[i]] = [nums[i], nums[start]];
    }
  }

  backTrack(0);

  return permutations;
};

// used visited

// var permute = function (nums) {
//   const permutations = [];
//   const visited = Array(nums.length).fill(false);

//   function permutation(path) {
//     if (path.length === nums.length) {
//       permutations.push(path.map((idx) => nums[idx]));
//       return;
//     }

//     for (let i = 0; i < nums.length; i++) {
//       if (visited[i]) continue;

//       path.push(i);
//       visited[i] = true;
//       permutation(path);
//       path.pop();
//       visited[i] = false;
//     }
//   }

//   permutation([]);

//   return permutations;
// };

permute([1, 2, 3]);
