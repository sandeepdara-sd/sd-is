const {
  isEmptyObject,
  smartCheck,
  listFunctions, isBoolean
} = require('./index.js');


console.log(listFunctions());

console.log(isEmptyObject({})); // true
console.log(smartCheck.isEmptyObject({a:6}));

const fixed = smartCheck.isEmptyObject({a:6}).fix();
console.log(fixed); // {a:6}

console.log(isBoolean()); // false
console.log(smartCheck.isBoolean(true)); // true

