module.exports = function smartIsNotUndefined(value, fallback = "default-value") {
  const isDefined = value !== undefined;

  return {
    ok: isDefined,
    verdict: isDefined ? "✅ It’s defined." : "❌ It’s undefined.",
    reason: isDefined
      ? `Value is: ${JSON.stringify(value)}`
      : "Value is undefined.",
    fix: () => fallback,
  };
};
