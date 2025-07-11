module.exports = function smartIsUndefined(value) {
  const isUndef = value === undefined;

  return {
    ok: isUndef,
    verdict: isUndef ? "✅ It's undefined." : "❌ It’s defined.",
    reason: isUndef
      ? "Value is exactly undefined."
      : `Value is: ${JSON.stringify(value)}`,
    fix: () => undefined,
  };
};
