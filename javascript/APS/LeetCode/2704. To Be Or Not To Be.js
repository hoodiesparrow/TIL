// https://leetcode.com/problems/to-be-or-not-to-be/description/

/**
 * @param {string} val
 * @return {Object}
 */
function expect(val) {
  function toBe(comp) {
    if (val === comp) return true;

    throw new Error("Not Equal");
  }

  function notToBe(comp) {
    if (val !== comp) return true;

    throw new Error("Equal");
  }

  return Object.freeze({ toBe, notToBe });
}

expect(5).toBe(5); // true
expect(5).notToBe(5); // throws "Equal"

/**
 * expect(5).toBe(5); // true
 * expect(5).notToBe(5); // throws "Equal"
 */
