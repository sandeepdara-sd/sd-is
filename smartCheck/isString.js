export default function isString(value) {
  const ok = typeof value === 'string';
  return {
    ok: ok,
    verdict: ok ? "✅ Value is a string." : "❌ Not a string.",
    reason: ok ? null : `Expected type "string", got "${typeof value}".`,
    fix: () => '',
  };
}
