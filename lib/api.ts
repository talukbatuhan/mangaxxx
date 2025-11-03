// lib/api.ts
export async function getMangaList() {
  const res = await fetch('/api/manga');
  return res.json();
}

export async function getMangaById(id: string) {
  const res = await fetch(`/api/manga/${id}`);
  return res.json();
}