// https://leetcode.com/problems/cache-with-time-limit/description/

var TimeLimitedCache = function () {
  this.cache = new Map();
};

/**
 * @param {number} key
 * @param {number} value
 * @param {number} duration time until expiration in ms
 * @return {boolean} if un-expired key already existed
 */
TimeLimitedCache.prototype.set = function (key, value, duration) {
  const isOccupied = this.cache.has(key);
  if (isOccupied) {
    clearTimeout(this.cache.get(key).timeout);
  }

  this.cache.set(key, {
    value,
    timeout: setTimeout(() => {
      this.cache.delete(key);
    }, duration),
  });

  return isOccupied;
};

/**
 * @param {number} key
 * @return {number} value associated with key
 */
TimeLimitedCache.prototype.get = function (key) {
  if (!this.cache.has(key)) return -1;

  return this.cache.get(key).value;
};

/**
 * @return {number} count of non-expired keys
 */
TimeLimitedCache.prototype.count = function () {
  return this.cache.size;
};

/**
 * const timeLimitedCache = new TimeLimitedCache()
 * timeLimitedCache.set(1, 42, 1000); // false
 * timeLimitedCache.get(1) // 42
 * timeLimitedCache.count() // 1
 */

// var TimeLimitedCache = function () {
//   this.cache = {};
// };

// /**
//  * @param {number} key
//  * @param {number} value
//  * @param {number} duration time until expiration in ms
//  * @return {boolean} if un-expired key already existed
//  */
// TimeLimitedCache.prototype.set = function (key, value, duration) {
//   let keyExists = false;
//   if (this.cache.hasOwnProperty(key)) keyExists = true;

//   this.cache[key] = {
//     value,
//     lifespan: new Date().getTime() + duration,
//   };

//   return keyExists;
// };

// /**
//  * @param {number} key
//  * @return {number} value associated with key
//  */
// TimeLimitedCache.prototype.get = function (key) {
//   if (!this.cache.hasOwnProperty(key)) return -1;
//   if (new Date().getTime() > this.cache[key].lifespan) return -1;

//   return this.cache[key].value;
// };

// /**
//  * @return {number} count of non-expired keys
//  */
// TimeLimitedCache.prototype.count = function () {
//   const now = new Date().getTime();
//   return Object.values(this.cache).filter(({ lifespan }) => lifespan > now)
//     .length;
// };

const timeLimitedCache = new TimeLimitedCache();
timeLimitedCache.set(1, 42, 1000); // false
timeLimitedCache.get(1); // 42
timeLimitedCache.count(); // 1
