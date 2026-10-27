import { useMemo } from "react";
import { useTmdb } from "../../hooks/useTmdb";
import { getPopular } from "../../api/movies";
import Film from "../common/Film";


const FAN_STYLES = [
    "left-0 top-14 -rotate-8 z-0 group-hover/fan:-translate-x-4 group-hover/fan:-rotate-12",
    "right-0 top-14 rotate-8 z-0 group-hover/fan:translate-x-4 group-hover/fan:rotate-12",
    "left-1/2 top-0 -translate-x-1/2 z-10",
];

export default function HeroFilms () {
    const { data, loading } = useTmdb((opts) => getPopular(1, opts), []);

    const films = useMemo(() => {
        const withPoster = data?.results?.filter(f => f.poster_path) ?? [];
        return [...withPoster].sort(() => Math.random() - 0.5).slice(0, 3);
    }, [data]);

    if (loading) {
        return (
            <div className="hidden lg:flex flex-1 justify-center" aria-busy="true" aria-label="Cargando películas">
                <div className="relative w-[36rem] h-[30rem] shrink-0">
                    {FAN_STYLES.map((style, idx) => (
                        <div key={idx} className={`absolute w-64 ${style}`}>
                            <div className="skeleton w-full aspect-[2/3] rounded-3xl shadow-2xl shadow-black" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (films.length < 3) return null;

    return (
        <div className="hidden lg:flex flex-1 justify-center">
            <div className="group/fan relative w-[36rem] h-[30rem] shrink-0">
                {films.map((film, idx) => (
                    <div
                        key={film.id}
                        className={`absolute w-64 transition duration-300 ease-out ${FAN_STYLES[idx]}`}
                    >
                        <Film film={film} />
                    </div>
                ))}
            </div>
        </div>
    );
}
