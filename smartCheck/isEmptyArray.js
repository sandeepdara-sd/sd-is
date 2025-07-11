module.exports = function smartIsEmptyArray(arr) {
  const isArray = Array.isArray(arr);
  const isEmpty = isArray && arr.length === 0;

  return {
    ok: isEmpty,
    verdict: isEmpty ? "✅ This array is empty." : "❌ Not empty or not an array.",
    reason: !isArray
      ? "Input is not an array."
      : `Array contains ${arr.length} item(s).`,
    fix: () => [],
  };
};
