
[![npm version](https://img.shields.io/npm/v/sd-is)](https://www.npmjs.com/package/sd-is)
[![license](https://img.shields.io/npm/l/sd-is)](https://github.com/sandeepdara-sd/sd-is/blob/main/LICENSE)
![npm](https://img.shields.io/npm/dw/sd-is?style=flat&color=blue)

# sd-is ⚡

A blazing-fast, ultra-light JavaScript utility library to validate, verify, and ensure correctness of your data types and structures.

> \"Is it... a number? empty? valid? fixable?" — `sd-is` has your back.

## 📦 Installation

```bash
npm install sd-is
```

---

## ✨ What's New in v1.0.7

* 🧭 **NEW:** `createFlow(schema, options?)` – Stateful Flow Engine built on `defineFlowSchema`
  - Progress step-by-step with `proceed()`, go back with `back()`, restart with `restart()`
  - Auto-invokes `onEnter`, `onExit`, and validates each step dynamically
  - Toggle `debug: true` to trace flow execution in console
* ⏳ `validateStepAsync()` – Now supports async hooks (`onEnter`, `onExit`)
* 🪛 Guard Hooks: Run checks before and after a step
* 📤 Exported list includes: `defineFlowSchema`, `validateStep`, `validateStepAsync`, `createFlow`

---

## 🔎 Quick Examples

---

## 🔄 Flow Validation

The defineFlowSchema() + validateStep() combo allows you to validate step-based flows like multi-step forms or wizards.

Each step has a schema and optional lifecycle hooks:

  - `onEnter(data)` — runs before validation

  - `onExit(data)` — runs after validation

```js
import { defineFlowSchema, validateStep } from 'sd-is';

const flow = defineFlowSchema({
  account: {
    schema: { email: { type: 'string' } },
    onEnter: ({ data }) => data.email.includes('blocked') && '❌ Blocked email'
  },
  profile: {
    schema: { name: { type: 'string' } }
  }
});

const result = validateStep(flow, 'account', { email: 'test@domain.com' });
console.log(result.ok); // true
```

---

## ⏳ Async Flow Validation

When you need to perform asynchronous checks (e.g., API calls, database lookups) during flow step validation, use  `validateStepAsync()`.

It behaves like `validateStep` but supports `async` `onEnter` and `onExit` hooks.

```js
import validateStepAsync from 'sd-is/validateStepAsync.js';

await validateStepAsync(flow, 'account', { email: 'blocked@example.com' });
// Returns ok: false with onEnter message
```

---

## 🧭 Stateful Flow Engine

The createFlow() function wraps a flow schema in a stateful engine, enabling you to progress through steps with full validation and lifecycle awareness.

Includes step navigation:

  - `.proceed(data)` – validate current step and move to next

  - `.back()` – return to previous step

  - `.restart()` – restart from initial step

  - `debug`: true – optional console tracing
    
```js
import createFlow from 'sd-is/createFlow.js';

const flowMachine = createFlow(flow, { debug: true });
await flowMachine.proceed({ email: 'user@domain.com' });
await flowMachine.proceed({ name: 'Tony' });
flowMachine.back();
flowMachine.restart();
```
### ✅ Type Assertion

Assert that a value matches a specific type. Throws an error if the type doesn't match.

```js
import assertType from 'sd-is/assertType.js';
assertType('hello', 'string');            // ✅ passes
assertType(123, 'string');                // ❌ throws: expected 'string', got 'number'
```

### 📋 Schema Validation

Define a custom schema and validate an object against it. Supports optional fields and enums.

```js
import defineSchema from 'sd-is/defineSchema.js';
import validateAgainst from 'sd-is/validateAgainst.js';

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


---
## 🧠 `smartCheck`

Each base type checker also has a `smartCheck` version that gives verdicts, reasons, and auto-fix suggestions:

```js
const { smartCheck } = require('sd-is');
const result = smartCheck.isEmptyArray([1, 2]);
console.log(result.ok);        // false
console.log(result.reason);    // Array contains 2 item(s)
console.log(result.fix());     // []
```

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
| `defineSchema`       | Creates a custom validation schema           |
| `validateAgainst`       |Validates against a defined schema           |
| `defineFlowSchema`       | Creates a step-based flow definition           |
| `validateStep`       | Validates a step in the flow           |
| `validateStepAsync`       | Async version of step validator           |
| `createFlow`     | Stateful flow machine engine          |
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

