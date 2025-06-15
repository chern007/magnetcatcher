const BASE = 'https://v3-cinemeta.strem.io';

/** búsqueda directa, más precisa */
export async function searchSeries(q: string) {
  const query = q.trim().toLowerCase();
  if (query.length < 2) return [];

  // endpoint “search.json” ya devuelve ~50 coincidencias
  const slug = encodeURIComponent(query.toLowerCase());          // espacios → %20
  const url  = `${BASE}/catalog/series/search/${slug}.json`;
  const { metas } = await fetch(url).then(r => r.json());

  // filtro adicional: todas las palabras deben aparecer en el título
  const tokens = query.split(/\s+/);
  return (metas ?? []).filter((m: any) =>
    tokens.every(t => m.name.toLowerCase().includes(t))
  );
}

export async function getSeriesMeta(imdbId: string) {
  const url = `${BASE}/meta/series/${imdbId}.json`;
  const { meta } = await fetch(url).then(r => r.json());
  return meta as {
    name: string;
    videos: { season: number; episode: number; title: string }[];
  };
}

/** ➊ Devuelve seasons únicos ordenados  */
export function extractSeasons(meta: Awaited<ReturnType<typeof getSeriesMeta>>) {
  return Array.from(new Set(meta.videos.map(v => v.season))).sort((a, b) => a - b);
}
