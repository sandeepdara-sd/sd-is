import isEmptyArray from './utils/isEmptyArray.js';
import isEmptyObject from './utils/isEmptyObject.js';
import isPlainObject from './utils/isPlainObject.js';
import isUndefined from './utils/isUndefined.js';
import isNotUndefined from './utils/isNotUndefined.js';
import * as smartCheck from './smartCheck/index.js';
import isBoolean from './utils/isBoolean.js';
import isFunction from './utils/isFunction.js';
import isString from './utils/isString.js';
import isNumber from './utils/isNumber.js';
import isNull from './utils/isNull.js';
import assertType from './utils/assertType.js';
import defineSchema from './utils/defineSchema.js';
import validateAgainst from './utils/validateAgainst.js';
import isPromise from './utils/isPlainObject.js';
import isDate from './utils/isDate.js';
import isSymbol from './utils/isSymbol.js';
import isRegExp from './utils/isRegExp.js';

function listFunctions() {
  return {
    basic: ['isEmptyArray', 'isEmptyObject', 'isPlainObject', 'isUndefined', 'isNotUndefined', 
            'isBoolean', 'isFunction', 'isString', 'isNumber', 'isNull','assertType', 'defineSchema', 'validateAgainst', 'isPromise', 'isDate', 'isSymbol', 'isRegExp'],
    smartCheck: Object.keys(smartCheck).map(name => `smartCheck.${name}`)
  };
}

const api = {

  smartCheck,
  listFunctions,

  isEmptyArray,
  isEmptyObject,
  isPlainObject,
  isUndefined,
  isNotUndefined,
  isBoolean,
  isFunction,
  isString,
  isNumber,
  isNull,
  assertType,
  defineSchema,
  validateAgainst,
  isPromise,
  isDate,
  isSymbol,
  isRegExp,

};

if (typeof module !== 'undefined') {
  module.exports = api;
}

export default api;
export {
  smartCheck,
  listFunctions,

  isEmptyArray,
  isEmptyObject,
  isPlainObject,
  isUndefined,
  isNotUndefined,
  isBoolean,
  isFunction,
  isString,
  isNumber,
  isNull,
  assertType,
  defineSchema,
  validateAgainst,
  isPromise,
  isDate,
  isSymbol,
  isRegExp,
};
