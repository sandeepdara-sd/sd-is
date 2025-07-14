export default function isEmptyObject(obj) {
  return obj && typeof obj === 'object' && !Array.isArray(obj) && Object.keys(obj).length === 0;
}
