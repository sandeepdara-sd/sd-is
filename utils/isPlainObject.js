export default function isPromise(value) {
  return !!value && typeof value.then === 'function' && typeof value.catch === 'function';
}
