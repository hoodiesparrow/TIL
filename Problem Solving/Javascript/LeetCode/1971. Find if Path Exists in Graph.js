// https://leetcode.com/problems/find-if-path-exists-in-graph/description/?envType=daily-question&envId=2024-08-22

/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} source
 * @param {number} destination
 * @return {boolean}
 */
var validPath = function (n, edges, source, destination) {
  const graph = Array.from({ length: n }, () => []);

  for (let edge of edges) {
    const [u, v] = edge;
    graph[u].push(v);
    graph[v].push(u);
  }

  const q = [source];
  let i = 0;
  const visited = [];

  while (i < q.length) {
    const current = q[i];
    i += 1;

    if (visited[current]) continue;
    else visited[current] = true;

    if (current === destination) return true;

    for (let vertex of graph[current]) {
      q.push(vertex);
    }
  }

  return false;
};

console.log(
  validPath(
    3,
    [
      [0, 1],
      [1, 2],
      [2, 0],
    ],
    0,
    2
  )
);
