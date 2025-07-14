[![npm version](https://img.shields.io/npm/v/sd-is)](https://www.npmjs.com/package/sd-is)
[![license](https://img.shields.io/npm/l/sd-is)](https://github.com/sandeepdara-sd/sd-is/blob/main/LICENSE)
![npm](https://img.shields.io/npm/dw/sd-is?style=flat\&color=blue)

# sd-is ⚡

A blazing-fast, ultra-light JavaScript utility library to validate, verify, and ensure correctness of your data types and structures.

> "Is it... a number? empty? valid? fixable?" — `sd-is` has your back.

## 📦 Installation

```bash
npm install sd-is
```

---

## ✨ What's New in v1.5

* ✅ Added `assertType(value, expectedType)` – for strict, developer-friendly runtime type checks
* 🧠 Added `validateAgainst(schema, data)` – schema-based validation with support for enums, nested fields, and custom logic
* 🔒 Added `strictMode` option to reject extra fields in user input
* ❌ Clear, emoji-enhanced error messages
* ➕ More type checkers: `isDate`, `isSymbol`, `isPromise`, `isRegExp`

---

## 🔎 Quick Examples

### ✅ Type Assertion

```js
import assertType from 'sd-is/utils/assertType.js';

assertType('hello', 'string');            // ✅ passes
assertType(123, 'string');                // ❌ throws: expected 'string', got 'number'
```

### 📋 Schema Validation

```js
import defineSchema from 'sd-is/utils/defineSchema.js';
import validateAgainst from 'sd-is/utils/validateAgainst.js';

const userSchema = defineSchema({
  name: { type: 'string' },
  age: { type: 'number', optional: true },
  role: { enum: ['admin', 'user'] }
});

const result = validateAgainst(userSchema, { name: 'Tony', role: 'user' });
console.log(result.ok);       // true
console.log(result.errors);   // []
```

---

## 🔨 API: `validateAgainst(schema, data, path?, options?)`

| Option               | Default | Description                                |
| -------------------- | ------- | ------------------------------------------ |
| `path`               | `''`    | Internal (for nested use)                  |
| `options.strictMode` | `false` | Rejects extra fields not defined in schema |

### Schema Field Options

| Key        | Description                                               |                   |
| ---------- | --------------------------------------------------------- | ----------------- |
| `type`     | `'string'`, `'number'`, `'array'`, etc. or array of types |                   |
| `enum`     | Array of allowed values                                   |                   |
| `optional` | Boolean – if field is optional                            |                   |
| `custom`   | Function \`(value) => true                                | 'error message'\` |

---

## 🧠 Also Included: `smartCheck`

```js
const { smartCheck } = require('sd-is');
const result = smartCheck.isEmptyArray([1, 2]);
console.log(result.ok);        // false
console.log(result.reason);    // Array contains 2 item(s)
console.log(result.fix());     // []
```

---

## ✅ Utility Functions Available

| Function         | Description                           |
| ---------------- | ------------------------------------- |
| `isBoolean`      | Checks if value is `true` or `false`  |
| `isNumber`       | Checks if value is a number           |
| `isString`       | Checks if value is a string           |
| `isUndefined`    | Checks if value is undefined          |
| `isNotUndefined` | Opposite of `isUndefined`             |
| `isEmptyArray`   | Checks if value is an empty array     |
| `isEmptyObject`  | Checks if object has no own keys      |
| `isPlainObject`  | Checks if it's a plain `{}` object    |
| `isFunction`     | Checks if value is a function         |
| `isNull`         | Checks if value is `null`             |
| `isPromise`      | Checks if value is a Promise          |
| `isDate`         | Checks if value is a Date object      |
| `isSymbol`       | Checks if value is a Symbol           |
| `isRegExp`       | Checks if value is a RegExp           |
| `listFunctions`  | Lists all available utility functions |

---

## 🤔 Why Use `sd-is`?

Because:

* ✅ You’re tired of writing `typeof x === 'string'` 20x a day
* 🚫 You want better error messages than "undefined is not a function"
* 🧠 You care about clean code, smart checks, and data integrity
* 📦 It’s tiny, tree-shakable, and zero-dependency

---

## 🧑‍💻 Author

Made with ❤️ by [Sandeep Dara](https://github.com/sandeepdara-sd)

## 📜 License

MIT
