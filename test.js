const {
  isEmptyObject,
  isEmptyArray,
  isPlainObject,
  isNotUndefined,
  isUndefined
} = require('./index');


const { smartCheck } = require('./index'); 

console.log('🧪 SMARTCHECK DEV TESTS\n');

// 1. isEmptyObject
let result = smartCheck.isEmptyObject({ a: 1 });
console.log('isEmptyObject({ a: 1 })');
console.log(result);
console.log('Fix:', result.fix());
console.log('---');

result = smartCheck.isEmptyObject({});
console.log('isEmptyObject({})');
console.log(result);
console.log('Fix:', result.fix());
console.log('---');

// 2. isEmptyArray
result = smartCheck.isEmptyArray([1, 2, 3]);
console.log('isEmptyArray([1,2,3])');
console.log(result);
console.log('Fix:', result.fix());
console.log('---');

result = smartCheck.isEmptyArray([]);
console.log('isEmptyArray([])');
console.log(result);
console.log('Fix:', result.fix());
console.log('---');

// 3. isPlainObject
result = smartCheck.isPlainObject({ key: 'value' });
console.log('isPlainObject({ key: "value" })');
console.log(result);
console.log('Fix:', result.fix());
console.log('---');

result = smartCheck.isPlainObject(new Date());
console.log('isPlainObject(new Date())');
console.log(result);
console.log('Fix:', result.fix());
console.log('---');

// 4. isNotUndefined
result = smartCheck.isNotUndefined(undefined);
console.log('isNotUndefined(undefined)');
console.log(result);
console.log('Fix:', result.fix());
console.log('---');

result = smartCheck.isNotUndefined('Hello');
console.log('isNotUndefined("Hello")');
console.log(result);
console.log('Fix:', result.fix());
console.log('---');

// 5. isUndefined
result = smartCheck.isUndefined(undefined);
console.log('isUndefined(undefined)');
console.log(result);
console.log('Fix:', result.fix());
console.log('---');

result = smartCheck.isUndefined(100);
console.log('isUndefined(100)');
console.log(result);
console.log('Fix:', result.fix());
console.log('---');




console.log('isEmptyObject({}):', isEmptyObject({}));                  // true
console.log('isEmptyArray([]):', isEmptyArray([]));                    // true
console.log('isPlainObject({ a: 1 }):', isPlainObject({ a: 1 }));      // true
console.log('isNotUndefined(5):', isNotUndefined(5));                  // true
console.log('isUndefined(undefined):', isUndefined(undefined));        // true

