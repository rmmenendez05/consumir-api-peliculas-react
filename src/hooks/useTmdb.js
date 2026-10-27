// Hook generico que consume la Capa de la API
import { useEffect, useState } from "react";

export function useTmdb(fn, deps = [])
{
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Al cambiar, se repite la petición (botón "Intentar de nuevo")
    const [attempt, setAttempt] = useState(0);

    useEffect( () => {
        const controller = new AbortController();
        setLoading(true);
        setError(null);

        // Consumir la API
        fn({signal: controller.signal})
            .then(setData)
            .catch(e => e.name !== "AbortError" && setError(e))
            .finally(() => !controller.signal.aborted && setLoading(false));

        return () => controller.abort();
    }, [...deps, attempt]);

    const reload = () => setAttempt(n => n + 1);

    return {data, loading, error, reload};
}
