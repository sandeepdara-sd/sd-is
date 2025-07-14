export default function isFunction(value) {
  const ok = typeof value === 'function';
  return {
    ok:ok,
    verdict: ok ? "✅ Value is a function." : "❌ Not a function.",
    reason: ok ? null : `Expected type "function", got "${typeof value}".`,
    fix: () => () => {},
  };
}
