export default function isPromise(value) {
  const ok = !!value && typeof value.then === 'function' && typeof value.catch === 'function';
  return {
    ok,
    verdict: ok ? "✅ Value is a Promise." : "❌ Not a Promise.",
    reason: ok ? null : `Expected a Promise-like object, got "${typeof value}".`,
    fix: () => Promise.resolve(),
  };
}
