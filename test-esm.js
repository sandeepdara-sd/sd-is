import {
  isEmptyObject,
  smartCheck,listFunctions, isBoolean, assertType,
} from './index.js';

console.log(isEmptyObject({})); // true
console.log(smartCheck.isEmptyObject({}));
console.log(listFunctions());
console.log(isBoolean()); // false
console.log(smartCheck.isBoolean(true)); // true
console.log(smartCheck.isBoolean(true)); // true

tests/assertType.test.js



console.log(assertType('hello', 'string')); // ✅ value is of type 'string'



import defineSchema from './utils/defineSchema.js';
import validateAgainst from './utils/validateAgainst.js';

const userSchema = defineSchema({
  name: { type: 'string' },
  age: { type: 'number', optional: true },
  status: { type: 'string', enum: ['active', 'inactive'] }
});

const input = {
  name: 'Tony',
  age: 24,
  extra: 'whoops'
};

const result = validateAgainst(userSchema, input, '', { strictMode: true });

if (!result.ok) console.log(result.errors);

 

// ✅ Positive case
const isPromise = smartCheck.isPromise;
let res = isPromise(Promise.resolve());


console.log(res); 