import { tmdbFetch } from "./client"

// Obtener peliculas populares
export const getPopular = (page=1, opts) => {
    return tmdbFetch("/movie/popular", { page }, opts);
}

// Obtener peliculas mejor valoradas
export const getTopRated = (page=1, opts) => {
    return tmdbFetch("/movie/top_rated", { page }, opts);
}

// Obtener peliculas en cartelera (en España)
export const getNowPlaying = (page=1, opts) => {
    return tmdbFetch("/movie/now_playing", { page, region: "ES" }, opts);
}

// Obtener proximos estrenos (en España)
export const getUpcoming = (page=1, opts) => {
    return tmdbFetch("/movie/upcoming", { page, region: "ES" }, opts);
}

// Obtener peliculas en tendencia esta semana
export const getTrending = (page=1, opts) => {
    return tmdbFetch("/trending/movie/week", { page }, opts);
}

// Buscar peliculas en especifico
export const searchSpecificFilm = (query, page=1, opts) => {
    return tmdbFetch("/search/movie", {query, page}, opts);
}

// Obtener información de una pelicula
export const getFilm = (id, opts) => {
    return tmdbFetch(`/movie/${id}`, { append_to_response: "credits,videos" }, opts);
}

// Fecha (AAAA-MM-DD) desplazada `days` días respecto a hoy
const dateFromToday = (days = 0) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
}

// Catálogos que se pueden elegir en la Home.
// `discover` son los parámetros de /discover/movie que imitan ese catálogo,
// necesarios para poder filtrar por género (las listas normales no lo permiten).
export const CATALOGS = [
    { id: "popular",     label: "Populares",       fetch: getPopular,
      discover: () => ({ sort_by: "popularity.desc" }) },
    { id: "trending",    label: "Tendencias",      fetch: getTrending,
      discover: null },
    { id: "top_rated",   label: "Mejor valoradas", fetch: getTopRated,
      discover: () => ({ sort_by: "vote_average.desc", "vote_count.gte": 300 }) },
    { id: "now_playing", label: "En cartelera",    fetch: getNowPlaying,
      discover: () => ({ sort_by: "popularity.desc", region: "ES", with_release_type: "2|3",
                         "release_date.gte": dateFromToday(-30), "release_date.lte": dateFromToday() }) },
    { id: "upcoming",    label: "Próximamente",    fetch: getUpcoming,
      discover: () => ({ sort_by: "popularity.desc", region: "ES", with_release_type: "2|3",
                         "release_date.gte": dateFromToday(1) }) },
]

// Páginas de tendencias que se revisan al filtrar por género
const TRENDING_PAGES = 3;

// Obtener un catálogo, opcionalmente filtrado por género
export const getCatalog = async (catalogId, genreId, opts) => {
    const catalog = CATALOGS.find(c => c.id === catalogId) ?? CATALOGS[0];

    if (!genreId) return catalog.fetch(1, opts);

    if (catalog.discover) {
        return tmdbFetch("/discover/movie", { ...catalog.discover(), with_genres: genreId, page: 1 }, opts);
    }

    // Tendencias no existe en /discover: se piden varias páginas y se filtra aquí
    const pages = await Promise.all(
        Array.from({ length: TRENDING_PAGES }, (_, i) => catalog.fetch(i + 1, opts))
    );
    const results = pages
        .flatMap(page => page.results ?? [])
        .filter(film => film.genre_ids?.includes(genreId));
    return { results };
}
