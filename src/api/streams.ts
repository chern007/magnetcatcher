import { addons } from './addons';

export async function getEpisodeStreams(
  imdbId: string,
  season: number,
  episode: number,
) {
  const collected: {
    url?: string;
    name?: string;
    infoHash?: string;
    fileIdx?: number;
  }[] = [];

  const tasks = Object.values(addons).map(async ({ base, extra }) => {
    const url = `${base}/stream/series/${imdbId}.json?season=${season}&episode=${episode}${extra}`;
    try {
      const { streams } = await fetch(url).then(r => r.json());
      if (streams?.length) collected.push(...streams);
    } catch (err) {
      console.warn('Addon failed', base, err?.toString?.());
    }
  });

  await Promise.allSettled(tasks);

  //collected.sort((a, b) => (b.seeders ?? 0) - (a.seeders ?? 0));

  // eliminar duplicados (por url o infoHash)
  const uniq = new Map<string, any>();
  for (const s of collected) {
    const key = s.url ?? s.infoHash ?? Math.random().toString();
    if (!uniq.has(key)) uniq.set(key, s);
  }
  return Array.from(uniq.values());
}
