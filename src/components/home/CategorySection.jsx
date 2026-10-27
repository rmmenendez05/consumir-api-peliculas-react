import CategoryCard from "../common/CategoryCard"
import ActionIcon from "../../assets/icons/categories/action.svg?react"
import DramaIcon from "../../assets/icons/categories/drama.svg?react"
import ScifiIcon from "../../assets/icons/categories/scifi.svg?react"
import ComedyIcon from "../../assets/icons/categories/comedy.svg?react"
import HorrorIcon from "../../assets/icons/categories/horror.svg?react"
import AnimationIcon from "../../assets/icons/categories/animation.svg?react"
import RomanceIcon from "../../assets/icons/categories/romance.svg?react"
import DocumentaryIcon from "../../assets/icons/categories/documentary.svg?react"

// Cada género con su id de TMDB, su icono y su color (clases completas para que Tailwind las detecte)
const CATEGORIES = [
    { genreId: 28, title: "Acción",          icon: ActionIcon,      color: "bg-red-600" },
    { genreId: 18, title: "Drama",           icon: DramaIcon,       color: "bg-violet-700" },
    { genreId: 878, title: "Ciencia Ficción", icon: ScifiIcon,       color: "bg-cyan-600" },
    { genreId: 35, title: "Comedia",         icon: ComedyIcon,      color: "bg-amber-500" },
    { genreId: 27, title: "Terror",          icon: HorrorIcon,      color: "bg-zinc-700" },
    { genreId: 16, title: "Animación",       icon: AnimationIcon,   color: "bg-fuchsia-600" },
    { genreId: 10749, title: "Romance",         icon: RomanceIcon,     color: "bg-rose-500" },
    { genreId: 99, title: "Documental",      icon: DocumentaryIcon, color: "bg-emerald-600" },
]

// Veces que se repite la lista en la pista (debe ser par para que el -50% encaje)
const COPIES = 4;

// `selectedId`: género activo. `onSelect` recibe la categoría pulsada.
export default function CategorySection ({ selectedId = null, onSelect }) {
    return (
        <div className="my-10 mb-0 py-4 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            {/* La pista mide lo que ocupan sus tarjetas; al desplazarla -50% el bucle encaja sin saltos.
                La animación no se pausa nunca (ni con hover, ni con foco, ni con "reducir movimiento"). */}
            <ul className="flex w-max animate-scroll-x">
            {
                // Se repite la lista para dar efecto de infinito. Con 4 copias, la mitad de la pista
                // (2 copias) es más ancha que cualquier pantalla y nunca aparece un hueco al final.
                Array.from({ length: COPIES }, () => CATEGORIES).flat().map((category, idx) => {
                    const isCopy = idx >= CATEGORIES.length;
                    return (
                    <li
                        key={idx}
                        aria-hidden={isCopy}
                        className="shrink-0 w-40 sm:w-52 lg:w-64 pr-3 sm:pr-4 py-2"
                    >
                        <CategoryCard
                            {...category}
                            selected={category.genreId === selectedId}
                            onClick={() => onSelect?.(category)}
                            // La copia del bucle no se recorre con el teclado
                            tabIndex={isCopy ? -1 : undefined}
                        />
                    </li>
                    );
                })
            }
            </ul>
        </div>
    );
}
