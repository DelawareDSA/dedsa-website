export async function fetchContent(path: string) {
  const res = await fetch(`/api/content?path=${encodeURIComponent(path)}`);
  if (!res.ok) throw new Error('Failed to load content');
  return res.json();
}
