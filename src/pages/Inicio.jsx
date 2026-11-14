
import { Link } from 'react-router';

const consejosManga = [
    {
        id: 'lectura',
        titulo: 'Se leen de derecha a izquierda',
        descripcion:
            'Si parece que abriste el manga por el final, tranquilo. La mayoría conserva el sentido de lectura japonés, tanto en las páginas como en las viñetas.'
    },
    {
        id: 'cuidado',
        titulo: 'Cuida tus tomos',
        descripcion:
            'Evita dejarlos al sol directo o en lugares húmedos. Si quieres proteger tu colección, puedes utilizar fundas de polipropileno o polietileno.'
    },
    {
        id: 'editoriales',
        titulo: 'Ojo con las traducciones',
        descripcion:
            'Editoriales como Ivrea Argentina, Ivrea España y Panini pueden utilizar expresiones diferentes. Revisa qué traducción prefieres antes de elegir tus mangas.'
    }
];

function Inicio() {
    return (
        <main className="mx-auto max-w-6xl px-6 py-12 sm:py-16">


            <section className="overflow-hidden rounded-3xl border border-manga-mint bg-manga-pale px-8 py-12 sm:px-12 sm:py-16">

                <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">

                    <div>
                        <span className="mb-6 inline-block rounded-full bg-white px-5 py-3 text-base font-bold text-manga-forest shadow-sm sm:text-lg">
                            Bienvenido a El Manga del Frente
                        </span>

                        <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-manga-ink sm:text-5xl">
                            ¿Qué manga te
                            <span className="block text-manga-green">
                                tinca leer?
                            </span>
                        </h1>

                        <p className="mb-8 max-w-2xl text-lg leading-relaxed text-manga-dark">
                            ¿Ya tienes un género favorito o todavía no sabes
                            qué leer? Date una vuelta por nuestro catálogo.
                            Tenemos mangas de acción, aventura, fantasía,
                            ciencia ficción y romance para distintos gustos.
                        </p>

                        <Link
                            to="/categorias"
                            className="inline-flex items-center justify-center rounded-xl bg-manga-forest px-7 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-manga-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-manga-green"
                        >
                            Ver catálogo
                            <span aria-hidden="true" className="ml-3">
                                →
                            </span>
                        </Link>
                    </div>

                    <div className="overflow-hidden rounded-2xl shadow-md">
                        <img
                            src={`${import.meta.env.BASE_URL}images/mangas-estanteria.jpg`}
                            alt="Estanterías con una colección de mangas organizados por tomos"
                            className="h-80 w-full object-cover object-center sm:h-96 lg:h-[460px]"
                            loading="eager"
                            decoding="async"
                        />
                    </div>

                </div>

            </section>

            <section
                aria-labelledby="consejos-titulo"
                className="py-16"
            >
                <div className="mb-8">
                    <h2
                        id="consejos-titulo"
                        className="mb-3 text-3xl font-bold text-manga-ink"
                    >
                        Antes de empezar a leer
                    </h2>

                    <p className="max-w-2xl text-manga-dark">
                        Tres cosas que conviene saber si estás
                        entrando al mundo del manga.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {consejosManga.map(consejo => (
                        <article
                            key={consejo.id}
                            className="rounded-2xl border border-manga-mint bg-white p-7"
                        >
                            <span
                                aria-hidden="true"
                                className="mb-6 block h-1 w-12 rounded-full bg-manga-green"
                            />

                            <h3 className="mb-3 text-xl font-bold text-manga-ink">
                                {consejo.titulo}
                            </h3>

                            <p className="leading-relaxed text-manga-dark">
                                {consejo.descripcion}
                            </p>
                        </article>
                    ))}
                </div>
            </section>

        </main>
    );
}

export default Inicio;
