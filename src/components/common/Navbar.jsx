import { NavLink } from "react-router-dom";
import { useMovieContext } from "../../context/MovieContext";

const linkClass = ({ isActive }) =>
    `transition-colors ${isActive ? "text-blue-400" : "text-zinc-200 hover:text-white"}`;

export default function Navbar () {
    const { favorites } = useMovieContext();

    return (
        <header
            className="sticky top-0 z-50 mx-auto flex flex-wrap justify-between items-center gap-2 py-2 px-4 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur"
        >
            <h1
                className="text-white font-bold select-none truncate">Rodrigo Moreno Menéndez</h1>

            <nav
                id="routes-section"
                className="flex flex-row gap-6 px-4"
            >
                <NavLink to="/" end className={linkClass}>Inicio</NavLink>
                <NavLink to="/favorites" className={linkClass}>
                    Favoritos
                    {favorites.length > 0 && (
                        <span className="ml-1.5 rounded-full bg-red-500 px-1.5 text-xs font-semibold text-white">
                            {favorites.length}
                        </span>
                    )}
                </NavLink>
            </nav>

        </header>
    )
}
