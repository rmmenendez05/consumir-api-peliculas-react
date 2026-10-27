import { useTmdb } from "../../hooks/useTmdb";
import { getCatalog, searchSpecificFilm } from "../../api/movies";
import ExclamationCircle from "../../assets/icons/outline/exclamation-circle.svg?react";
import FilmSkeleton from "../common/FilmSkeleton";
import MovieGrid, { GRID_CLASSES } from "../common/MovieGrid";

// Muestra el catálogo elegido (filtrado por género si hay uno) o, si hay búsqueda, sus resultados
export default function FilmResults ({ query, catalog = "popular", genreId = null }) {
    const { data, loading, error, reload } = useTmdb(
        (opts) => query
            ? searchSpecificFilm(query, 1, opts)
            : getCatalog(catalog, genreId, opts),
        [query, catalog, genreId]
    );

    if (loading) {
        return (
            <ul
                className={GRID_CLASSES}
                aria-busy="true"
                aria-label="Cargando películas"
            >
                {Array.from({ length: 12 }, (_, i) => (
                    <li key={i}>
                        <FilmSkeleton />
                    </li>
                ))}
            </ul>
        )
    }
    if (error) {
        return (
            <div className="flex flex-col justify-center place-items-center gap-2 mt-6">
                <ExclamationCircle width={50} height={50} className="text-red-800" />
                <p className="text-white font-black text-2xl">No se pudieron cargar las películas</p>
                <p className="text-zinc-600">Comprueba tu conexión a internet e inténtalo de nuevo en unos segundos.</p>
                <button type="button" onClick={reload} className="bg-blue-800 rounded-3xl p-3 mt-2 text-white cursor-pointer">Intentar de nuevo</button>
            </div>
        );
    }

    const films = data?.results ?? [];

    if (films.length === 0) {
        return (
            <p className="text-zinc-400 text-lg mt-6">
                {query
                    ? <>No se encontraron películas para «{query}».</>
                    : genreId
                        ? "No hay películas de este género en este catálogo ahora mismo."
                        : "No hay películas en este catálogo ahora mismo."}
            </p>
        );
    }

    return <MovieGrid films={films} />;
}
