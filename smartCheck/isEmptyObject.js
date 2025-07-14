export default function isEmptyObject(obj) {
  const isObj = obj && typeof obj === 'object' && !Array.isArray(obj);
  const isEmpty = isObj && Object.keys(obj).length === 0;

  return {
    ok: isEmpty,
    verdict: isEmpty ? "✅ This object is empty." : "❌ Not empty or not an object.",
    reason: !isObj
      ? "Input is not a plain object."
      : `Object has ${Object.keys(obj).length} key(s).`,
    fix: () => ({}),
  };
}
