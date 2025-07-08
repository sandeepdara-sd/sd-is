const {
  isEmptyObject,
  isEmptyArray,
  isPlainObject,
  isNotUndefined,
  isUndefined
} = require('./index');

console.log('isEmptyObject({}):', isEmptyObject({}));                  // true
console.log('isEmptyArray([]):', isEmptyArray([]));                    // true
console.log('isPlainObject({ a: 1 }):', isPlainObject({ a: 1 }));      // true
console.log('isNotUndefined(5):', isNotUndefined(5));                  // true
console.log('isUndefined(undefined):', isUndefined(undefined));        // true
