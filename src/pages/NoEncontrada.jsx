
import { Link } from 'react-router';

function NoEncontrada() {
    return (
        <main className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center px-6 py-16">

            <section className="w-full max-w-2xl text-center">

                <span className="mb-6 inline-block rounded-full bg-manga-pale px-5 py-2 text-sm font-semibold text-manga-forest">
                    Página no encontrada
                </span>

                <h1 className="mb-4 text-7xl font-extrabold tracking-tight text-manga-green sm:text-8xl">
                    404
                </h1>

                <h2 className="mb-5 text-3xl font-bold text-manga-ink sm:text-4xl">
                    Esta historia no está disponible
                </h2>

                <p className="mx-auto mb-10 max-w-lg text-lg leading-relaxed text-manga-dark">
                    La página que buscas no existe o cambió de dirección.
                    Pero todavía quedan muchas historias por descubrir
                    en nuestra librería.
                </p>

                <div className="flex flex-wrap justify-center gap-4">

                    <Link
                        to="/"
                        className="inline-flex items-center justify-center rounded-xl bg-manga-forest px-6 py-3 font-semibold text-white transition-colors hover:bg-manga-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-manga-green"
                    >
                        Volver al inicio
                    </Link>

                    <Link
                        to="/categorias"
                        className="inline-flex items-center justify-center rounded-xl border border-manga-mint bg-white px-6 py-3 font-semibold text-manga-forest transition-colors hover:bg-manga-pale focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-manga-green"
                    >
                        Explorar categorías
                    </Link>

                </div>

            </section>

        </main>
    );
}

export default NoEncontrada;
