export default function isNull(value) {
  const ok = value === null;
  return {
    ok:ok,
    verdict: ok ? "✅ Value is null." : "❌ Not null.",
    reason: ok ? null : `Expected null, got "${value === undefined ? 'undefined' : typeof value}".`,
    fix: () => null,
  };
}
