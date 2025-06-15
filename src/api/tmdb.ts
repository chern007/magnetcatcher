import Constants from 'expo-constants';

const API = 'https://api.themoviedb.org/3';
const KEY = Constants.expoConfig?.extra?.tmdbKey || process.env.TMDB_KEY;

/** Busca series y devuelve título + imdbId (si existe) */
export async function searchSeriesTMDB(query: string) {
  const url = `${API}/search/tv?query=${encodeURIComponent(query)}&include_adult=false&language=es-ES&page=1&api_key=${KEY}`;
  const { results } = await fetch(url).then(r => r.json());

  // extrae imdbId para poder usar Torrentio / Peerflix
  const enriched = await Promise.all(
    results.map(async (item: any) => {
      const idsUrl = `${API}/tv/${item.id}/external_ids?api_key=${KEY}`;
      const ids = await fetch(idsUrl).then(r => r.json());
      return {
        id: ids.imdb_id || `tmdb-${item.id}`,
        name: item.name,
        poster: item.poster_path
          ? `https://image.tmdb.org/t/p/w185${item.poster_path}`
          : undefined,
        year: item.first_air_date?.slice(0, 4),
      };
    })
  );

  // filtra los que NO tengan imdbId (los add-ons de torrents lo necesitan)
  return enriched.filter(m => m.id.startsWith('tt'));
}

/** Detalles con temporadas y episodios */
export async function fetchSeason(tmdbId: number, season: number) {
  const url = `${API}/tv/${tmdbId}/season/${season}?language=es-ES&api_key=${KEY}`;
  return fetch(url).then(r => r.json());
}
