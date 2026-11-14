
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { obtenerMangas } from '../services/mangasApi';

const formatoPrecio = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
});

function MangasCategoria() {
    const { id } = useParams();
    const [intento, setIntento] = useState(0);

    const [resultado, setResultado] = useState({
        categoria: null,
        intento: 0,
        mangas: [],
        error: null
    });

    const cargando =
        resultado.categoria !== id ||
        resultado.intento !== intento;

    const { mangas, error } = resultado;

    useEffect(() => {
        const controlador = new AbortController();

        async function cargarMangas() {
            try {
                const datos = await obtenerMangas(
                    id,
                    controlador.signal
                );

                if (!controlador.signal.aborted) {
                    setResultado({
                        categoria: id,
                        intento,
                        mangas: datos,
                        error: null
                    });
                }
            } catch (errorPeticion) {
                if (controlador.signal.aborted) return;

                let mensaje;

                if (errorPeticion.status === 404) {
                    mensaje =
                        'La categoría solicitada no existe. Puedes volver al catálogo y seleccionar una disponible.';
                } else if (errorPeticion.status >= 500) {
                    mensaje =
                        'El servicio no está disponible en este momento. Intenta nuevamente.';
                } else {
                    mensaje =
                        'No pudimos obtener los mangas. Comprueba tu conexión e intenta nuevamente.';
                }

                setResultado({
                    categoria: id,
                    intento,
                    mangas: [],
                    error: mensaje
                });
            }
        }

        cargarMangas();

        return () => controlador.abort();
    }, [id, intento]);

    const reintentar = () => {
        setIntento(anterior => anterior + 1);
    };

    return (
        <main className="mx-auto max-w-6xl px-6 py-12 sm:py-16">

            <header className="mb-10">
                <span className="mb-4 inline-block rounded-full bg-manga-pale px-4 py-2 text-sm font-semibold text-manga-forest">
                    Explora nuestra colección
                </span>

                <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-manga-ink sm:text-5xl">
                    Mangas disponibles
                </h1>

                <p className="text-lg leading-relaxed text-manga-dark">
                    Revisa los títulos, sus editoriales y la cantidad
                    de tomos de cada serie.
                </p>
            </header>

            {cargando && (
                <div
                    role="status"
                    className="flex items-center gap-4 rounded-2xl border border-manga-mint bg-manga-pale p-6 text-manga-forest"
                >
                    <span
                        aria-hidden="true"
                        className="h-6 w-6 animate-spin rounded-full border-3 border-manga-mint border-t-manga-forest"
                    />
                    <p>Cargando mangas...</p>
                </div>
            )}

            {!cargando && error && (
                <div
                    role="alert"
                    className="rounded-2xl border border-red-200 bg-red-50 p-6"
                >
                    <h2 className="mb-3 text-xl font-bold text-red-800">
                        No pudimos cargar los mangas
                    </h2>

                    <p className="mb-5 text-red-700">
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={reintentar}
                        className="cursor-pointer rounded-xl bg-manga-forest px-5 py-3 font-semibold text-white transition-colors hover:bg-manga-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-manga-green"
                    >
                        Reintentar
                    </button>
                </div>
            )}

            {!cargando && !error && mangas.length === 0 && (
                <div className="rounded-2xl border border-manga-mint bg-manga-pale p-8">
                    <h2 className="mb-3 text-xl font-bold text-manga-ink">
                        Sin mangas disponibles
                    </h2>

                    <p className="text-manga-dark">
                        No hay mangas disponibles en esta categoría.
                        Puedes explorar otras categorías de nuestro catálogo.
                    </p>
                </div>
            )}

            {!cargando && !error && mangas.length > 0 && (
                <section
                    aria-label="Listado de mangas"
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {mangas.map(manga => (
                        <article
                            key={manga.id}
                            className="flex h-full flex-col rounded-2xl border border-manga-mint bg-white p-7 shadow-sm transition-shadow duration-200 hover:shadow-md"
                        >
                            <span
                                aria-hidden="true"
                                className="mb-6 block h-1 w-12 rounded-full bg-manga-green"
                            />

                            <div className="mb-5 flex items-start justify-between gap-3">
                                <h2 className="min-w-0 flex-1 text-2xl font-bold text-manga-ink">
                                    {manga.titulo}
                                </h2>

                                <span className="shrink-0 whitespace-nowrap rounded-full bg-manga-pale px-3 py-1 text-xs font-semibold text-manga-forest">
                                    {manga.cantidadTomos} tomos
                                </span>
                            </div>

                            <div className="mb-5 space-y-2 text-sm text-manga-dark">
                                <p>
                                    <span className="font-semibold">
                                        Autor:
                                    </span>{' '}
                                    {manga.autor}
                                </p>

                                <p>
                                    <span className="font-semibold">
                                        Editorial:
                                    </span>{' '}
                                    {manga.editorial}
                                </p>

                                <p>
                                    <span className="font-semibold">
                                        Estado:
                                    </span>{' '}
                                    {manga.estado}
                                </p>
                            </div>

                            <p className="mb-6 leading-relaxed text-manga-dark">
                                {manga.descripcion}
                            </p>

                            <div className="mt-auto border-t border-manga-mint pt-5">
                                <p className="mb-2 text-sm text-manga-dark">
                                    Precio referencial por tomo
                                </p>

                                <p className="text-2xl font-extrabold text-manga-ink">
                                    {formatoPrecio.format(manga.precioPorTomo)}
                                </p>

                                <p className="mt-2 text-xs text-manga-dark">
                                    Precio simulado para esta actividad.
                                </p>
                            </div>
                        </article>
                    ))}
                </section>
            )}

            <Link
                to="/categorias"
                className="mt-10 inline-flex items-center gap-2 font-semibold text-manga-forest underline-offset-4 transition-colors hover:text-manga-ink hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-manga-green"
            >
                <span aria-hidden="true">←</span>
                Volver a categorías
            </Link>

        </main>
    );
}

export default MangasCategoria;