
let cacheCategorias = null;

const baseApi = `${import.meta.env.BASE_URL}api`;

export async function obtenerCategorias(signal) {
    if (cacheCategorias !== null) {
        return cacheCategorias;
    }

    const respuesta = await fetch(
        `${baseApi}/categorias`,
        { signal }
    );

    if (!respuesta.ok) {
        const error = new Error(
            `Error HTTP ${respuesta.status}`
        );

        error.status = respuesta.status;
        throw error;
    }

    const categorias = await respuesta.json();

    if (!signal?.aborted) {
        cacheCategorias = categorias;
    }

    return categorias;
}
