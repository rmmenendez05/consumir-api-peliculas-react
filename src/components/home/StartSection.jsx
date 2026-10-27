import FilmSearcher from "./FilmSearcher"
import HeroFilms from "./HeroFilms"

export default function StartSection ({ searchQuery, onSearchChange, onSearchSubmit }) {
    return (
        <div
            id="home-intro"
                className="
                    p-4 w-full border border-zinc-800 gap-4
                    bg-zinc-800 rounded-4xl h-1/2"
                >
                    <div className="flex flex-row items-center justify-between gap-8 my-10 mx-5">
                        <div className="flex flex-col justify-start gap-5 flex-1">
                            <p className="text-blue-500 text-md font-semibold select-none">Bienvenido a la PEC de Rodrigo Moreno Menéndez</p>
                            <h1 className="text-white font-bold text-5xl md:text-6xl leading-[1.05] tracking-tight select-none">Encuentra tu próxima película favorita.</h1>
                            <p className="text-zinc-400 text-lg md:text-xl leading-snug max-w-xl select-none">Explora lo más popular, busca por título o por género y guarda las que quieras ver en tu lista de favoritos.</p>
                            <FilmSearcher
                                value={searchQuery}
                                onChange={onSearchChange}
                                onSubmit={onSearchSubmit}
                            />
                        </div>
                        <HeroFilms />
                    </div>
        </div>
    )
}
