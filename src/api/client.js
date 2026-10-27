import { API_DELAY_MS, API_TIMEOUT_MS } from "../config";

const API_URL = "https://api.themoviedb.org/3";

// Espera `ms`, pero se corta si el componente cancela la petición
function wait(ms, signal) {
    return new Promise((resolve, reject) => {
        if (signal?.aborted) return reject(signal.reason);
        const id = setTimeout(resolve, ms);
        signal?.addEventListener("abort", () => {
            clearTimeout(id);
            reject(signal.reason);
        }, { once: true });
    });
}
const TOKEN = import.meta.env.VITE_API_TOKEN

/* Empleo para consumir la API 
    <params name="url"> Ruta de enlace para la pelicula </params>
    <params name="params"> Parametros de la API </params>
    <params name="signal"> Señal de cancelación del fetch la API </params>
    <return> JSON con el codigo de estado de la API. </return>
*/

export async function tmdbFetch(url, params = {}, {signal} = {}) {
    if (API_DELAY_MS > 0) await wait(API_DELAY_MS, signal);

    // Combina la cancelación del componente con el timeout de la config
    const signals = [signal, API_TIMEOUT_MS > 0 && AbortSignal.timeout(API_TIMEOUT_MS)].filter(Boolean);

    const query = new URLSearchParams( { language: "es-ES", ...params });
    const res = await fetch( `${API_URL}${url}?${query}`, {
        headers: {Authorization: `Bearer ${TOKEN}` },
        signal: signals.length ? AbortSignal.any(signals) : undefined,
    });
    if (!res.ok) throw new Error(`TMDB ${res.status}: ${res.statusText}`);
    return res.json();
}