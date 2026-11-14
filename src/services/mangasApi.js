
const cacheMangas = new Map();

const baseApi = `${import.meta.env.BASE_URL}api`;

export async function obtenerMangas(categoria, signal) {
    if (cacheMangas.has(categoria)) {
        return cacheMangas.get(categoria);
    }

    const respuesta = await fetch(
        `${baseApi}/mangas?categoria=${encodeURIComponent(categoria)}`,
        { signal }
    );

    if (!respuesta.ok) {
        const error = new Error(
            `Error HTTP ${respuesta.status}`
        );

        error.status = respuesta.status;
        throw error;
    }

    const mangas = await respuesta.json();

    if (!signal?.aborted) {
        cacheMangas.set(categoria, mangas);
    }

    return mangas;
}
