import { useEffect, useRef, useState } from "react"
import CategorySection from "../components/home/CategorySection"
import StartSection from "../components/home/StartSection"
import FilmResults from "../components/home/FilmResults"
import CatalogTabs from "../components/home/CatalogTabs"
import { CATALOGS } from "../api/movies"

// Tiempo (ms) sin teclear antes de lanzar la búsqueda
const SEARCH_DELAY_MS = 400;


export default function Home () {
    // Texto que se escribe en el buscador
    const [searchQuery, setSearchQuery] = useState("");
    // Búsqueda enviada (vacía = se muestra el catálogo elegido)
    const [activeQuery, setActiveQuery] = useState("");
    // Catálogo elegido (populares, tendencias...)
    const [catalog, setCatalog] = useState(CATALOGS[0].id);
    // Género elegido en el carrusel (null = todos)
    const [genre, setGenre] = useState(null);
    const resultsRef = useRef(null);

    // Búsqueda automática al escribir: espera a que el usuario deje de teclear
    // para no lanzar una petición por cada letra. Vacío = vuelve al catálogo.
    useEffect(() => {
        const id = setTimeout(() => setActiveQuery(searchQuery.trim()), SEARCH_DELAY_MS);
        return () => clearTimeout(id);
    }, [searchQuery]);

    const scrollToResults = () =>
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

    const clearSearch = () => {
        setSearchQuery("");
        setActiveQuery("");
    };

    const handleSearchChange = (value) => setSearchQuery(value);

    // Con Enter se busca al instante y se baja hasta los resultados
    const handleSearchSubmit = () => {
        setActiveQuery(searchQuery.trim());
        scrollToResults();
    };

    // Elegir un catálogo cancela la búsqueda (se mantiene el género)
    const handleCatalogChange = (id) => {
        setCatalog(id);
        clearSearch();
    };

    // Pulsar un género lo aplica sobre el catálogo actual; pulsarlo otra vez lo quita
    const handleGenreSelect = (category) => {
        setGenre(prev => prev?.genreId === category.genreId ? null : category);
        clearSearch();
        scrollToResults();
    };

    const catalogLabel = CATALOGS.find(c => c.id === catalog)?.label;
    const isSearching = Boolean(activeQuery);

    return (
        <main className="mx-auto flex w-[95%] flex-col py-10">
            <div className="w-full">
                <StartSection
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                    onSearchSubmit={handleSearchSubmit}
                />
                <CategorySection
                    selectedId={isSearching ? null : genre?.genreId}
                    onSelect={handleGenreSelect}
                />
            </div>
            <section ref={resultsRef} className="mt-16 w-full scroll-mt-20">
                <h2 className="text-4xl sm:text-5xl font-bold text-white">
                    {isSearching
                        ? `Resultados para «${activeQuery}»`
                        : genre
                            ? <>{genre.title} <span className="text-zinc-500">·</span> {catalogLabel}</>
                            : catalogLabel}
                </h2>

                <div className="flex flex-wrap items-center gap-x-4">
                    <CatalogTabs
                        active={isSearching ? null : catalog}
                        onChange={handleCatalogChange}
                    />
                    {genre && !isSearching && (
                        <button
                            type="button"
                            onClick={() => setGenre(null)}
                            aria-label={`Quitar el filtro de ${genre.title}`}
                            className={`mt-6 mb-1 shrink-0 flex items-center gap-2 rounded-full px-4 py-2
                                text-sm font-semibold text-white cursor-pointer
                                transition-opacity hover:opacity-80 ${genre.color}`}
                        >
                            {genre.title}
                            <span aria-hidden="true" className="text-base leading-none">×</span>
                        </button>
                    )}
                </div>

                <FilmResults
                    query={activeQuery}
                    catalog={catalog}
                    genreId={genre?.genreId ?? null}
                />
            </section>
        </main>
    )
}
