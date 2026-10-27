import HeartSolid from '../../assets/icons/solid/heart-solid.svg?react'
import HeartOutline from '../../assets/icons/outline/heart-outline.svg?react'
import { useMovieContext } from "../../context/MovieContext"

const FILM_PRINCIPLE_URI = "https://image.tmdb.org/t/p/w500";

// Póster de la película con el botón de favorito en overlay (aparece al hacer hover)
export default function Film({ film }) {
    const { isFavorite, toggleFavorite } = useMovieContext();
    const fav = isFavorite(film.id);

    const handleFav = (e) => {
        e.stopPropagation();
        toggleFavorite(film);
    };

    return (
        <article
            className="
                group relative w-full aspect-[2/3] overflow-hidden rounded-3xl
              bg-zinc-900
                transition duration-300
                hover:-translate-y-1 hover:border-white/30 hover:shadow-2xl
            "
        >
            {film.poster_path && (
                <img
                    className="absolute inset-0 w-full h-full object-cover
                            transition duration-200
                            group-hover:scale-105 group-hover:grayscale group-hover:brightness-90"
                    src={FILM_PRINCIPLE_URI + film.poster_path}
                    alt={film.title}
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
            <button
                type="button"
                onClick={handleFav}
                aria-label={fav ? "Quitar de favoritos" : "Añadir a favoritos"}
                aria-pressed={fav}
                className={`
                    absolute top-3 right-3 z-10
                    grid place-items-center w-10 h-10 rounded-full
                    bg-black/40 backdrop-blur-sm
                    transition duration-300
                    hover:bg-black/60 active:scale-90
                    ${fav
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 focus-visible:opacity-100"}
                `}
            >
                {fav
                    ? <HeartSolid className="w-5 h-5 text-red-500" />
                    : <HeartOutline className="w-5 h-5 text-white" />}
            </button>
        </article>
    );
}
