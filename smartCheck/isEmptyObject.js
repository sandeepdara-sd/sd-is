module.exports = function smartIsEmptyObject(obj) {
  const isObject = typeof obj === 'object' && obj !== null && !Array.isArray(obj);
  const keys = isObject ? Object.keys(obj) : null;
  const isEmpty = isObject && keys.length === 0;

  return {
    ok: isEmpty,
    verdict: isEmpty ? "✅ It’s an empty object." : "❌ Not empty or not a valid object.",
    reason: !isObject
      ? "Input is not a valid object."
      : `Found ${keys.length} key(s): ${keys.join(', ')}`,
    fix: () => ({}),
  };
};
