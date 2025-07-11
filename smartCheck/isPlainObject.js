module.exports = function smartIsPlainObject(value) {
  const isPlain = Object.prototype.toString.call(value) === '[object Object]';

  return {
    ok: isPlain,
    verdict: isPlain ? "✅ It's a plain object." : "❌ Not a plain object.",
    reason: isPlain
      ? "Passed strict object type check."
      : `Type was: ${Object.prototype.toString.call(value)}`,
    fix: () => Object.create(null),
  };
};
