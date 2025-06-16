import { addons } from './addons';
import { detectLanguage, LanguageTag } from '../utils/detectLanguage';

export interface Stream {
  url?: string;
  name?: string;
  infoHash?: string;
  fileIdx?: number;
  language?: LanguageTag;
}

export async function getEpisodeStreams(
  imdbId: string,
  season: number,
  episode: number,
) {
  const collected: Stream[] = [];

  const tasks = Object.values(addons).map(async ({ base, extra }) => {
    const extraPath = extra
      ? `/${extra.replace(/^\//, '').replace(/\|/g, '%7C')}`
      : '';
    const encodedId = `${imdbId}:${season}:${episode}`.replace(/:/g, '%3A');
    const url = `${base}${extraPath}/stream/series/${encodedId}.json`;
    try {
      const { streams } = await fetch(url).then(r => r.json());
      if (streams?.length) {
        collected.push(
          ...streams.map((s: any) => ({
            ...s,
            language: detectLanguage(s.name ?? '')
          }))
        );
      }
    } catch (err) {
      console.warn('Addon failed', base, err?.toString?.());
    }
  });

  await Promise.allSettled(tasks);

  //collected.sort((a, b) => (b.seeders ?? 0) - (a.seeders ?? 0));

  // eliminar duplicados (por url o infoHash)
  const uniq = new Map<string, Stream>();
  for (const s of collected) {
    const key = s.url ?? s.infoHash ?? Math.random().toString();
    if (!uniq.has(key)) uniq.set(key, s);
  }
  return Array.from(uniq.values()) as Stream[];
}
