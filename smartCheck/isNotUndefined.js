export default function isNotUndefined(value) {
  const isDef = typeof value !== 'undefined';

  return {
    ok: isDef,
    verdict: isDef ? "✅ It's defined." : "❌ It's undefined.",
    reason: isDef ? "Has value." : "No value provided.",
    fix: () => "default-value",
  };
}
