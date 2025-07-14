"use client";
export function safeFilter<T>(
  arr: T[] | undefined | null,
  fn: (item: T) => boolean
): T[] {
  return Array.isArray(arr) ? arr.filter(fn) : [];
}
