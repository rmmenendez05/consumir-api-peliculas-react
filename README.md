# Buscador de películas — PEC React

Aplicación web hecha con React para explorar películas con la API de [TMDB](https://www.themoviedb.org/): catálogos, búsqueda por título, filtro por género y lista de favoritos guardada en el navegador.

**Autor:** Rodrigo Moreno Menéndez

---

## Funcionalidades

- **Catálogos:** Populares, Tendencias, Mejor valoradas, En cartelera y Próximamente.
- **Búsqueda por título:** se lanza sola al escribir, 400 ms después de la última tecla. Con Enter se busca al momento.
- **Filtro por género:** al pulsar una tarjeta del carrusel (Acción, Drama, Terror…), el catálogo elegido se filtra por ese género.
- **Favoritos:** cada película tiene un botón de corazón. Los favoritos se guardan en `localStorage` y siguen ahí al volver a abrir la aplicación. Tienen su propia página en `/favorites`.
- **Estados de carga y error:** mientras se cargan los datos se muestran tarjetas de esqueleto animadas. Si la petición falla, aparece un mensaje con el botón "Intentar de nuevo".
- **Navegación:** barra fija con enlaces a Inicio (`/`) y Favoritos (`/favorites`), hecha con React Router. Muestra cuántos favoritos hay.
- **Diseño responsive:** la cuadrícula pasa de 2 columnas en móvil a 3 en tablet y 6 en escritorio. El carrusel de géneros y los botones de catálogo se adaptan al ancho de la pantalla.

---

## Tecnologías y versiones

| Paquete | Versión | Uso |
|---|---|---|
| [React](https://react.dev/) | 19.3.1 | Librería de interfaz |
| React DOM | 19.3.1 | Renderizado en el navegador |
| [React Router](https://reactrouter.com/) (`react-router-dom`) | 7.18.4 | Navegación entre páginas |
| [Tailwind CSS](https://tailwindcss.com/) | 4.3.3 | Estilos |
| `@tailwindcss/vite` | 4.3.3 | Integración de Tailwind con Vite |
| [Vite](https://vite.dev/) | 8.3.5 | Servidor de desarrollo y compilación |
| `@vitejs/plugin-react` | 6.1.2 | Soporte de React en Vite |
| `vite-plugin-svgr` | 5.2.0 | Importar SVG como componentes de React |
| [Oxlint](https://oxc.rs/) | 1.89.0 | Linter |

Probado con **Node.js 22.14.0** y **npm 10.9.2**. Vite 8 necesita Node.js `^20.19.0` o `>=22.12.0`.

---

## Instalación

### 1. Requisitos previos

- [Node.js](https://nodejs.org/) 20.19 o superior (recomendado 22 LTS).
- Una cuenta gratuita en [TMDB](https://www.themoviedb.org/signup) para conseguir el token de la API.

### 2. Clonar e instalar dependencias

```bash
git clone <url-del-repositorio>
cd app_en_react
npm install
```

### 3. Configurar el token de TMDB

1. En TMDB, entra en **Ajustes → API** y copia el **"Token de acceso de lectura a la API"** (API Read Access Token). Es un texto largo que empieza por `eyJ…`; no es la "API Key" corta.
2. Copia el archivo de ejemplo y pega tu token:

   ```bash
   cp .env.example .env
   ```

   ```env
   VITE_API_TOKEN=tu_token_aqui
   ```

> **Seguridad:** el archivo `.env` está en `.gitignore` y **no se debe subir al repositorio**. Solo se sube `.env.example`, que no contiene ningún token.

### 4. Arrancar la aplicación

```bash
npm run dev
```

Abre la dirección que aparece en la terminal (normalmente http://localhost:5173).

### Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga automática |
| `npm run build` | Compila la versión de producción en `dist/` |
| `npm run preview` | Sirve la versión compilada para probarla |
| `npm run lint` | Revisa el código con Oxlint |

### Opciones de prueba

En [src/config.js](src/config.js) se pueden simular conexiones lentas para ver los estados de carga y de error:

- `API_DELAY_MS`: retraso artificial antes de cada petición, en milisegundos.
- `API_TIMEOUT_MS`: tiempo máximo de espera antes de cancelar la petición y mostrar el error (`0` = sin límite).

---

## Estilo visual

La interfaz usa **Tailwind CSS 4** con clases de utilidad directamente en el JSX. La configuración propia del tema está en [src/index.css](src/index.css), dentro del bloque `@theme`.

- **Tema oscuro:** fondo negro (`#000`) con superficies en grises `zinc` (`zinc-800`, `zinc-900`, `zinc-950`).
- **Tipografía:** [Inter](https://fonts.google.com/specimen/Inter), cargada desde Google Fonts, en pesos de 400 a 700. Títulos grandes y en negrita con interlineado ajustado.
- **Color de acento:** azul (`blue-400` a `blue-800`) para enlaces activos, botones y el catálogo seleccionado. Rojo (`red-500`) para el corazón de favorito.
- **Géneros:** cada tarjeta del carrusel tiene un color sólido y un icono propio:

  | Género | Color | Icono |
  |---|---|---|
  | Acción | `red-600` | Rayo |
  | Drama | `violet-700` | Máscara |
  | Ciencia Ficción | `cyan-600` | Planeta |
  | Comedia | `amber-500` | Cara sonriente |
  | Terror | `zinc-700` | Fantasma |
  | Animación | `fuchsia-600` | Destellos |
  | Romance | `rose-500` | Corazón |
  | Documental | `emerald-600` | Videocámara |

- **Formas:** esquinas muy redondeadas (`rounded-3xl` y `rounded-4xl`) en tarjetas y secciones. Botones de catálogo en forma de píldora.
- **Iconos:** SVG en el estilo de [Heroicons](https://heroicons.com/) (outline y solid), importados como componentes con `vite-plugin-svgr`. Usan `currentColor`, así que toman el color del texto.
- **Animaciones:**
  - Carrusel infinito de géneros, en movimiento continuo y sin pausas.
  - Al pasar el ratón por un póster, se eleva y se pasa a escala de grises, y aparece el botón de favorito.
  - Esqueletos de carga con brillo animado (utilidad `skeleton` en `index.css`).
  - Si el sistema tiene activado "reducir movimiento" (`prefers-reduced-motion`), se desactiva el brillo de los esqueletos de carga. El carrusel de géneros sigue moviéndose.
- **Accesibilidad:** botones con `aria-label` y `aria-pressed`, foco visible al usar el teclado y textos alternativos en los pósters.

---

## Estructura del proyecto

```
src/
├── api/
│   ├── client.js          # fetch a TMDB: token, idioma, retraso y timeout
│   ├── images.js          # URLs de imágenes de TMDB
│   └── movies.js          # Endpoints y catálogos (con filtro por género)
├── assets/icons/          # Iconos SVG (outline, solid y géneros)
├── components/
│   ├── common/
│   │   ├── CategoryCard.jsx   # Tarjeta de género
│   │   ├── Film.jsx           # Póster con botón de favorito
│   │   ├── FilmSkeleton.jsx   # Esqueleto de carga
│   │   ├── MovieCard.jsx      # Póster + título + año
│   │   ├── MovieGrid.jsx      # Cuadrícula de películas
│   │   └── Navbar.jsx         # Barra de navegación fija
│   └── home/
│       ├── CatalogTabs.jsx    # Selector de catálogo
│       ├── CategorySection.jsx# Carrusel de géneros
│       ├── FilmResults.jsx    # Resultados: carga, error y cuadrícula
│       ├── FilmSearcher.jsx   # Barra de búsqueda
│       ├── HeroFilms.jsx      # Pósters destacados de la portada
│       └── StartSection.jsx   # Portada de la Home
├── context/
│   └── MovieContext.jsx   # Contexto de favoritos + hook useMovieContext
├── hooks/
│   └── useTmdb.js         # Hook de peticiones (data, loading, error, reload)
├── pages/
│   ├── Home.jsx           # Página principal (/)
│   └── Favorites.jsx      # Página de favoritos (/favorites)
├── App.jsx                # Rutas y MovieProvider
├── config.js              # Opciones de prueba de la API
├── index.css              # Tailwind, tema y utilidades propias
└── main.jsx               # Punto de entrada
```

### Gestión del estado

- **Favoritos:** [MovieContext.jsx](src/context/MovieContext.jsx) crea el contexto con `createContext` y guarda la lista con `useState`. Un `useEffect` la carga de `localStorage` al iniciar y otro la guarda cada vez que cambia. Los componentes acceden a ella con el hook `useMovieContext()`.
- **Home:** [Home.jsx](src/pages/Home.jsx) guarda el texto de búsqueda, el catálogo y el género elegidos.
- **Peticiones:** el hook [useTmdb.js](src/hooks/useTmdb.js) gestiona `data`, `loading` y `error`. También cancela la petición anterior si cambian los filtros antes de que llegue la respuesta.

---

## Créditos

Datos e imágenes proporcionados por [The Movie Database (TMDB)](https://www.themoviedb.org/). Este producto usa la API de TMDB, pero TMDB no lo respalda ni lo certifica.
