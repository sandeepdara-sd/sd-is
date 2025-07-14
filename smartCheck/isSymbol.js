export default function isSymbol(value) {
  const ok = typeof value === 'symbol';
  return {
    ok,
    verdict: ok ? "✅ Value is a Symbol." : "❌ Not a Symbol.",
    reason: ok ? null : `Expected type "symbol", got "${typeof value}".`,
    fix: () => Symbol(),
  };
}
