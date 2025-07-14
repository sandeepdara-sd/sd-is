export default function isDate(value) {
  const ok = Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value.getTime());
  return {
    ok,
    verdict: ok ? "✅ Value is a valid Date." : "❌ Not a valid Date.",
    reason: ok ? null : `Expected a valid Date object, got "${Object.prototype.toString.call(value)}".`,
    fix: () => new Date(),
  };
}
