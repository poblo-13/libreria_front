
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { obtenerCategorias } from '../services/categoriasApi';

function Categorias() {
    const [intento, setIntento] = useState(0);

    const [resultado, setResultado] = useState({
        intento: -1,
        categorias: [],
        error: null
    });

    const cargando = resultado.intento !== intento;
    const { categorias, error } = resultado;

    useEffect(() => {
        const controlador = new AbortController();

        async function cargarCategorias() {
            try {
                const datos = await obtenerCategorias(controlador.signal);

                if (!controlador.signal.aborted) {
                    setResultado({
                        intento,
                        categorias: datos,
                        error: null
                    });
                }
            } catch (errorPeticion) {
                if (controlador.signal.aborted) return;

                const mensaje = errorPeticion.status >= 500
                    ? 'El servicio no está disponible. Intenta nuevamente.'
                    : 'No pudimos obtener las categorías. Comprueba tu conexión e intenta nuevamente.';

                setResultado({
                    intento,
                    categorias: [],
                    error: mensaje
                });
            }
        }

        cargarCategorias();

        return () => controlador.abort();
    }, [intento]);

    const reintentar = () => {
        setIntento(anterior => anterior + 1);
    };

    return (
        <main className="mx-auto max-w-6xl px-6 py-12 sm:py-16">

            <header className="mb-10">
                <span className="mb-4 inline-block rounded-full bg-manga-pale px-4 py-2 text-sm font-semibold text-manga-forest">
                    Nuestro catálogo
                </span>

                <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-manga-ink sm:text-5xl">
                    Categorías de mangas
                </h1>

                <p className="max-w-2xl text-lg leading-relaxed text-manga-dark">
                    Explora nuestras categorías y descubre historias
                    que se adapten a tus gustos.
                </p>
            </header>

            {cargando && (
                <div
                    role="status"
                    className="rounded-2xl border border-manga-mint bg-manga-pale p-8 text-manga-forest"
                >
                    Cargando categorías...
                </div>
            )}

            {!cargando && error && (
                <div
                    role="alert"
                    className="rounded-2xl border border-red-200 bg-red-50 p-6"
                >
                    <p className="mb-4 text-red-700">
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

            {!cargando && !error && categorias.length === 0 && (
                <p className="rounded-2xl bg-manga-pale p-6 text-manga-dark">
                    No hay categorías disponibles en este momento.
                </p>
            )}

            {!cargando && !error && categorias.length > 0 && (
                <section
                    aria-label="Listado de categorías"
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {categorias.map(categoria => (
                        <Link
                            key={categoria.id}
                            to={`/categoria/${categoria.id}`}
                            className="group flex flex-col rounded-2xl border border-manga-mint bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-manga-green hover:bg-manga-pale hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-manga-green"
                        >
                            <span
                                aria-hidden="true"
                                className="mb-6 block h-1 w-12 rounded-full bg-manga-green transition-all duration-200 group-hover:w-20"
                            />

                            <h2 className="mb-3 text-xl font-bold text-manga-ink">
                                {categoria.nombre}
                            </h2>

                            <p className="mb-6 flex-1 leading-relaxed text-manga-dark">
                                {categoria.descripcion}
                            </p>

                            <span className="font-semibold text-manga-forest">
                                Ver mangas
                                <span
                                    aria-hidden="true"
                                    className="ml-2"
                                >
                                    →
                                </span>
                            </span>
                        </Link>
                    ))}
                </section>
            )}

        </main>
    );
}

export default Categorias;
