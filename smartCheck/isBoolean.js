export default function isBoolean(value) {
  const ok = typeof value === 'boolean';
  return {
    ok:ok,
    verdict: ok ? "✅ Value is a boolean." : "❌ Not a boolean.",
    reason: ok ? null : `Expected type "boolean", got "${typeof value}".`,
    fix: () => false,
  };
}
