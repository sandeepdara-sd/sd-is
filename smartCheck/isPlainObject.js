export default function isPlainObject(obj) {
  const isPlain = Object.prototype.toString.call(obj) === '[object Object]';

  return {
    ok: isPlain,
    verdict: isPlain ? "✅ It's a plain object." : "❌ Not a plain object.",
    reason: isPlain ? "Passed Object check." : "Failed Object prototype check.",
    fix: () => ({}),
  };
}
