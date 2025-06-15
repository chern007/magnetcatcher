import { addons } from './addons';

export async function getEpisodeStreams(imdbId: string, season: number, episode: number) {
  const collected: { url?: string; name?: string; infoHash?: string; fileIdx?: number }[] = [];

  for (const { base, extra } of Object.values(addons)) {
    const url =
      `${base}/stream/series/${imdbId}.json?season=${season}&episode=${episode}${extra}`;

    try {
      const { streams } = await fetch(url, { timeout: 8000 }).then(r => r.json());
      if (streams?.length) collected.push(...streams);
    } catch {
      // ignoramos errores de un add-on y seguimos con el siguiente
    }
  }

  //collected.sort((a, b) => (b.seeders ?? 0) - (a.seeders ?? 0));

  // eliminar duplicados (por url o infoHash)
  const uniq = new Map<string, any>();
  for (const s of collected) {
    const key = s.url ?? s.infoHash ?? Math.random().toString();
    if (!uniq.has(key)) uniq.set(key, s);
  }
  return Array.from(uniq.values());
}
