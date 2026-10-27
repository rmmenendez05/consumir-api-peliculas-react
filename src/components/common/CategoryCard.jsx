// Tarjeta de categoría: color sólido del género con su icono grande de fondo.
// `isolate` mantiene el recorte redondeado al escalar sin afectar al difuminado del carrusel.
export default function CategoryCard ({ title, icon: Icon, color, selected = false, onClick, tabIndex }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={selected}
            aria-label={`Filtrar por ${title}`}
            tabIndex={tabIndex}
            className={`category-card group relative isolate overflow-hidden w-full text-left cursor-pointer
                h-32 sm:h-40 lg:h-44 rounded-3xl sm:rounded-4xl border
                ${color}
                flex flex-col justify-end p-4 sm:p-5
                transition duration-200 ease-out hover:scale-105
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white
                ${selected ? "border-white ring-2 ring-white" : "border-white/10"}`}
        >
            {/* Icono de fondo */}
            <Icon
                aria-hidden="true"
                className="pointer-events-none absolute -right-4 -bottom-6 size-28 sm:size-36 lg:size-40
                    text-white/15 -rotate-12
                    transition-transform duration-300 ease-out
                    group-hover:scale-110 group-hover:-rotate-6"
            />

            <span className="relative text-white text-lg sm:text-2xl font-black leading-tight select-none drop-shadow">
                {title}
            </span>
        </button>
    )
}
