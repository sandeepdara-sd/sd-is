# @sd/is ⚡

A tiny collection of JavaScript type check utilities that answer:  
> "Is it... empty? undefined? real? legit?" 🤔

Made for developers who are tired of writing the same type checks again and again.

---

## 📦 Installation

```bash
npm install @sd/is
```

---

## 🧪 Usage

```js
const {
  isEmptyObject,
  isEmptyArray,
  isPlainObject,
  isNotUndefined,
  isUndefined
} = require('@sd/is');

console.log(isEmptyObject({}));       // true
console.log(isEmptyArray([]));        // true
console.log(isPlainObject({ a: 1 })); // true
console.log(isNotUndefined(123));     // true
console.log(isUndefined(undefined));  // true
```

---

## ✅ Functions Included

| Function         | Description                          |
|------------------|--------------------------------------|
| \`isEmptyObject\`  | Checks if an object is empty \`{}\`    |
| \`isEmptyArray\`   | Checks if an array is empty \`[]\`     |
| \`isPlainObject\`  | Checks if it's a plain object        |
| \`isNotUndefined\` | Checks if a value is not \`undefined\` |
| \`isUndefined\`    | Checks if a value is \`undefined\`     |

---

## 🤔 Why?

Because typing \`typeof value !== 'undefined'\` every day is boring.

Now just use:

```js
if (isNotUndefined(foo)) {
  // do cool stuff
}
```

And flex. 💪

---

## 🧑‍💻 Author

Made with ❤️ by [Sandeep Dara](https://github.com/sandeepdara-sd)

---

## 📜 License

MIT
EOF
