import { CATALOGS } from "../../api/movies";

// Selector de catálogo. En móvil se desplaza en horizontal en vez de saltar de línea.
export default function CatalogTabs ({ active, onChange }) {
    return (
        <div
            role="group"
            aria-label="Catálogo de películas"
            className="flex gap-2 mt-6 overflow-x-auto pb-1 -mx-1 px-1 [scrollbar-width:none]"
        >
            {CATALOGS.map(({ id, label }) => {
                const isActive = id === active;
                return (
                    <button
                        key={id}
                        type="button"
                        onClick={() => onChange(id)}
                        aria-pressed={isActive}
                        className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap
                            transition-colors cursor-pointer
                            ${isActive
                                ? "bg-blue-600 text-white"
                                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white"}`}
                    >
                        {label}
                    </button>
                );
            })}
        </div>
    )
}
