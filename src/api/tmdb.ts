import Constants from 'expo-constants';

const API = 'https://api.themoviedb.org/3';
const KEY = Constants.expoConfig?.extra?.tmdbKey || process.env.TMDB_KEY;

/** Busca series en TMDB y devuelve título, IDs y año */
export async function searchSeriesTMDB(query: string) {
  const url = `${API}/search/tv?query=${encodeURIComponent(query)}&include_adult=false&language=es-ES&page=1&api_key=${KEY}`;
  const { results } = await fetch(url).then(r => r.json());

  const enriched = await Promise.all(
    results.map(async (item: any) => {
      const idsUrl = `${API}/tv/${item.id}/external_ids?api_key=${KEY}`;
      const ids = await fetch(idsUrl).then(r => r.json());
      return {
        id: ids.imdb_id || `tmdb-${item.id}`,
        imdbId: ids.imdb_id,
        tmdbId: item.id,
        name: item.name,
        poster: item.poster_path
          ? `https://image.tmdb.org/t/p/w185${item.poster_path}`
          : undefined,
        year: item.first_air_date?.slice(0, 4),
      };
    })
  );

  // filtra los que NO tengan imdbId (los add-ons de torrents lo necesitan)
  return enriched.filter(m => m.imdbId?.startsWith('tt'));
}

export async function fetchShow(tmdbId: number) {
  const url = `${API}/tv/${tmdbId}?language=es-ES&api_key=${KEY}`;
  return fetch(url).then(r => r.json());
}

export function extractSeasons(show: Awaited<ReturnType<typeof fetchShow>>) {
  return (show.seasons ?? [])
    .filter((s: any) => s.season_number > 0)
    .map((s: any) => s.season_number)
    .sort((a: number, b: number) => a - b);
}

export async function fetchEpisodes(tmdbId: number, season: number) {
  const data = await fetchSeason(tmdbId, season);
  return data.episodes?.map((e: any) => ({
    episode: e.episode_number,
    title: e.name,
  })) ?? [];
}

/** Detalles con temporadas y episodios */
export async function fetchSeason(tmdbId: number, season: number) {
  const url = `${API}/tv/${tmdbId}/season/${season}?language=es-ES&api_key=${KEY}`;
  return fetch(url).then(r => r.json());
}
