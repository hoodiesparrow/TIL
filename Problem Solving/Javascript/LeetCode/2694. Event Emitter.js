// https://leetcode.com/problems/event-emitter/

class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  /**
   * @param {string} eventName
   * @param {Function} callback
   * @return {Object}
   */
  subscribe(eventName, callback) {
    if (!this.events.has(eventName)) this.events.set(eventName, new Map());

    this.events.get(eventName).set(callback, 0);

    return {
      unsubscribe: () => {
        this.events.get(eventName).delete(callback);
        return undefined;
      },
    };
  }

  /**
   * @param {string} eventName
   * @param {Array} args
   * @return {Array}
   */
  emit(eventName, args = []) {
    if (!this.events.has(eventName)) return [];

    const emitted = [];
    for (const [e, _] of this.events.get(eventName)) {
      emitted.push(e(...args));
    }

    return emitted;
  }
}

/**
 * const emitter = new EventEmitter();
 *
 * // Subscribe to the onClick event with onClickCallback
 * function onClickCallback() { return 99 }
 * const sub = emitter.subscribe('onClick', onClickCallback);
 *
 * emitter.emit('onClick'); // [99]
 * sub.unsubscribe(); // undefined
 * emitter.emit('onClick'); // []
 */
