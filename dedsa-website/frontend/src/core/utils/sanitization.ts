export function sanitizeString(value: string): string {
  return value.replace(/<[^>]*>?/gm, '').trim();
}
