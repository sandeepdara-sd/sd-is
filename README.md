[![npm version](https://img.shields.io/npm/v/sd-is)](https://www.npmjs.com/package/sd-is)
[![license](https://img.shields.io/npm/l/sd-is)](https://github.com/sandeepdara-sd/sd-is/blob/main/LICENSE)
![npm](https://img.shields.io/npm/dw/sd-is?style=flat&color=blue)

# sd-is ⚡  
A minimal, blazing-fast JavaScript utility library that checks types and structures like:  
> "Is it... empty? undefined? valid? fixable?" 🤔  

Now with 💡 **smartCheck** — automatic explanations and fix suggestions for common issues.  
Not a groundbreaking invention — just a tiny, helpful utility built to make your dev life smoother.  

## 📦 Installation  
```bash  
npm install sd-is  
```  

## ✨ What's New in v2  
🚀 Added `smartCheck` — a developer-friendly feature that not only checks, but also **explains and suggests a fix** for your values.  
```js  
const { smartCheck } = require('sd-is');  
const result = smartCheck.isEmptyObject({ a: 1 });  
console.log(result.ok);       // false  
console.log(result.verdict);  // ❌ Not empty or not a valid object.  
console.log(result.reason);   // Found 1 key(s): a  
console.log(result.fix());    // {}  
```  

## 🧪 Basic Usage  
```js  
const {  
  isEmptyObject,  
  isEmptyArray,  
  isPlainObject,  
  isNotUndefined,  
  isUndefined  
} = require('sd-is');  

console.log(isEmptyObject({}));       // true  
console.log(isEmptyArray([]));        // true  
console.log(isPlainObject({ a: 1 })); // true  
console.log(isNotUndefined(123));     // true  
console.log(isUndefined(undefined));  // true  
```  

## ✅ Functions Included  
| Function         | Description                          |  
|------------------|--------------------------------------|  
| `isEmptyObject`  | Checks if an object is empty `{}`    |  
| `isEmptyArray`   | Checks if an array is empty `[]`     |  
| `isPlainObject`  | Checks if it's a plain object        |  
| `isNotUndefined` | Checks if a value is not `undefined` |  
| `isUndefined`    | Checks if a value is `undefined`     |  

## 🧠 smartCheck Functions  
All `smartCheck` functions return a helpful result object like:  
```js  
{  
  ok: Boolean,              // true/false result  
  verdict: String,          // human-friendly status  
  reason: String,           // explanation of result  
  fix: Function             // a suggested fix (returns a clean fallback)  
}  
```  

### Example: `smartCheck.isEmptyArray([1, 2, 3])`  
```js  
const result = smartCheck.isEmptyArray([1, 2, 3]);  
console.log(result.ok);      // false  
console.log(result.verdict); // ❌ Not empty or not an array.  
console.log(result.reason);  // Array contains 3 item(s).  
console.log(result.fix());   // []  
```  

## 🤔 Why Use `sd-is`?  
Because typing `typeof value !== 'undefined'` every day is boring.  
Because checking for `{}` or `[]` every time gets repetitive.  
Because now, you can check + fix + explain — **all in one line**.  

It’s not revolutionary — just something small that saves time and reduces bugs.  
```js  
if (smartCheck.isPlainObject([]).ok) {  
  // It's a plain object, do stuff...  
} else {  
  const fallback = smartCheck.isPlainObject([]).fix();  
}  
```  

## 🧑‍💻 Author  
Made with ❤️ by [Sandeep Dara](https://github.com/sandeepdara-sd)  

## 📜 License  
MIT  
