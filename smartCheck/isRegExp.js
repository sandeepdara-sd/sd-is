export default function isRegExp(value) {
  const ok = Object.prototype.toString.call(value) === '[object RegExp]';
  return {
    ok,
    verdict: ok ? "✅ Value is a RegExp." : "❌ Not a RegExp.",
    reason: ok ? null : `Expected a RegExp object, got "${Object.prototype.toString.call(value)}".`,
    fix: () => /default/,
  };
}
