import { Link } from "react-router-dom"
import HeartOutline from "../assets/icons/outline/heart-outline.svg?react"
import MovieGrid from "../components/common/MovieGrid"
import { useMovieContext } from "../context/MovieContext"

export default function Favorites () {
    const { favorites } = useMovieContext();

    return (
        <main className="mx-auto flex w-[95%] flex-col py-10">
            <section className="w-full">
                <h2 className="text-5xl font-bold text-white">Favoritos</h2>

                {favorites.length === 0 ? (
                    <div className="flex flex-col justify-center place-items-center gap-2 mt-16 text-center">
                        <HeartOutline width={50} height={50} className="text-zinc-600" />
                        <p className="text-white font-black text-2xl">Aún no tienes películas favoritas</p>
                        <p className="text-zinc-600">Pulsa el corazón de cualquier película para guardarla aquí.</p>
                        <Link to="/" className="bg-blue-800 rounded-3xl p-3 mt-2 text-white">Explorar películas</Link>
                    </div>
                ) : (
                    <>
                        <p className="text-zinc-400 mt-2">
                            {favorites.length} {favorites.length === 1 ? "película guardada" : "películas guardadas"}
                        </p>
                        <MovieGrid films={favorites} />
                    </>
                )}
            </section>
        </main>
    )
}
