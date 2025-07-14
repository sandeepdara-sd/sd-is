export default function isNumber(value) {
  const ok = typeof value === 'number' && !isNaN(value);
  return {
    ok:ok,
    verdict: ok ? "✅ Value is a number." : "❌ Not a valid number.",
    reason: ok ? null : `Expected a number, got "${typeof value}".`,
    fix: () => 0,
  };
}
