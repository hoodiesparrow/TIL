// https://leetcode.com/problems/minimum-time-visiting-all-points/description/

/**
 * @param {number[][]} points
 * @return {number}
 */
var minTimeToVisitAllPoints = function (points) {
  const length = points.length;
  if (length < 2) return 0;

  let [x, y] = points[0];
  let idx = 1;
  let dist = 0;

  while (idx < length) {
    const [nx, ny] = points[idx];
    const [dx, dy] = [x - nx, y - ny];

    // smaller difference(x or y) is ignored due to diagonal moves
    const orthogonalDist = Math.max(Math.abs(dx), Math.abs(dy));
    dist += orthogonalDist;

    [x, y] = [nx, ny];
    idx += 1;
  }

  return dist;
};
