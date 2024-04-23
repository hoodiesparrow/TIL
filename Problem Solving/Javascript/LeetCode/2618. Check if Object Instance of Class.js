// https://leetcode.com/problems/check-if-object-instance-of-class/description/

/**
 * @param {*} obj
 * @param {*} classFunction
 * @return {boolean}
 */
var checkIfInstanceOf = function (obj, classFunction) {
  try {
    console.log(Object.getPrototypeOf(classFunction).name);

    // return (
    //   obj instanceof classFunction ||
    //   obj.__proto__ instanceof classFunction ||
    //   Object.getPrototypeOf(obj) instanceof classFunction
    // );
  } catch (error) {
    // return false;
  }
};

console.log(checkIfInstanceOf(new Date(), Number)); // true
