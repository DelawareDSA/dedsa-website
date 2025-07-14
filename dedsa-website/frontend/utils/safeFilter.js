export function safeFilter(arr, fn) {
  return Array.isArray(arr) ? arr.filter(fn) : [];
}
