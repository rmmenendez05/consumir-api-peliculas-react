import Film from "./Film"

// Tarjeta completa: póster con botón de favorito, título y año de estreno
export default function MovieCard({ film }) {
    const year = film.release_date?.slice(0, 4);

    return (
        <>
            <Film film={film} />
            <div className="mt-2 mx-1 flex flex-col gap-1">
                <p className="text-white">{film.title}</p>
                <p className="text-zinc-400">{year || "Sin fecha"}</p>
            </div>
        </>
    );
}
