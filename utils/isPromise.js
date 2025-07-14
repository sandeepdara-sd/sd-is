export const isPromise = (value) =>
  !!value && typeof value.then === 'function' && typeof value.catch === 'function';