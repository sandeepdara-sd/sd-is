export default function isUndefined(value) {
  const isUndef = typeof value === 'undefined';

  return {
    ok: isUndef,
    verdict: isUndef ? "✅ It's undefined." : "❌ It's defined.",
    reason: isUndef ? "No value present." : "Value is present.",
    fix: () => undefined,
  };
}
