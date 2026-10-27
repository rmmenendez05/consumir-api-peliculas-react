import MovieCard from "./MovieCard"

export const GRID_CLASSES = "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mt-6";

export default function MovieGrid({ films }) {
    return (
        <ul className={GRID_CLASSES}>
            {films.map(film => (
                <li key={film.id}>
                    <MovieCard film={film} />
                </li>
            ))}
        </ul>
    );
}
