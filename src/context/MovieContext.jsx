import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "favorites";

const MovieContext = createContext(null);

// Solo guardamos los campos que necesita la tarjeta
const toFavorite = ({ id, title, poster_path, release_date }) => ({ id, title, poster_path, release_date });

export function MovieProvider({ children }) {
    const [favorites, setFavorites] = useState([]);
    // Evita sobrescribir localStorage con [] antes de haber leído lo guardado
    const [loaded, setLoaded] = useState(false);

    // Cargar los favoritos desde localStorage al iniciar
    useEffect(() => {
        try {
            const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
            if (Array.isArray(stored)) setFavorites(stored);
        } catch {
            // Datos corruptos: se empieza con la lista vacía
        }
        setLoaded(true);
    }, []);

    // Guardar los favoritos cada vez que cambien
    useEffect(() => {
        if (!loaded) return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }, [favorites, loaded]);

    const isFavorite = (id) => favorites.some(movie => movie.id === id);

    const addToFavorites = (movie) =>
        setFavorites(prev => prev.some(m => m.id === movie.id) ? prev : [...prev, toFavorite(movie)]);

    const removeFromFavorites = (id) =>
        setFavorites(prev => prev.filter(movie => movie.id !== id));

    const toggleFavorite = (movie) =>
        isFavorite(movie.id) ? removeFromFavorites(movie.id) : addToFavorites(movie);

    return (
        <MovieContext.Provider value={{ favorites, isFavorite, addToFavorites, removeFromFavorites, toggleFavorite }}>
            {children}
        </MovieContext.Provider>
    );
}

// Custom hook para consumir el contexto
export function useMovieContext() {
    const context = useContext(MovieContext);
    if (!context) throw new Error("useMovieContext debe usarse dentro de <MovieProvider>");
    return context;
}
