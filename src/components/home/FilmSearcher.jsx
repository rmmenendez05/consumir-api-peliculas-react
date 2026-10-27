
import MagnifyingGlass from '../../assets/icons/outline/magnifying-glass.svg?react'

export default function FilmSearcher ({ value, onChange, onSubmit }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <form
            id="film-searcher"
            role="search"
            onSubmit={handleSubmit}
            className="flex flex-row border justify-start place-items-center align-center
            gap-3 rounded-lg w-full max-w-md px-3 py-2 bg-zinc-700 text-zinc-500 border-zinc-700
            focus-within:border-blue-500 transition"
        >
            <MagnifyingGlass
                className="size-5 text-zinc-500"
                aria-label="Lupa de busqueda (Icono)"
            />
            <input
                placeholder="Buscar películas, titulos..."
                type="search"
                aria-label="Buscar películas por título"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-transparent text-white placeholder:text-zinc-400 outline-none"
            />
        </form>
    )
}
