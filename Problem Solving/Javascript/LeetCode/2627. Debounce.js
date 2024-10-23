// https://leetcode.com/problems/debounce/

/**
 * @param {Function} fn
 * @param {number} t milliseconds
 * @return {Function}
 */
var debounce = function (fn, t) {
  let timer = null;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, t);
  };
};

// Accepted answer, but no need to use promise
var debounce = function (fn, t) {
  let promise = null;

  return function (...args) {
    const timer = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (promise === timer) resolve(fn(...args));
      }, t);
    });

    promise = timer;
  };
};

const log = debounce(console.log, 100);
log("Hello"); // cancelled
log("Hello"); // cancelled
