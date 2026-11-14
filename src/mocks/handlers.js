
import { http, HttpResponse, delay } from 'msw';

const baseApi = `${import.meta.env.BASE_URL}api`;

const categorias = [
    {
        id: 'accion',
        nombre: 'Acción',
        descripcion: 'Mangas con combates y desafíos.'
    },
    {
        id: 'aventura',
        nombre: 'Aventura',
        descripcion: 'Historias de viajes y exploración.'
    },
    {
        id: 'fantasia',
        nombre: 'Fantasía',
        descripcion: 'Mundos imaginarios y elementos mágicos.'
    },
    {
        id: 'ciencia-ficcion',
        nombre: 'Ciencia ficción',
        descripcion: 'Historias de tecnología y futuros posibles.'
    },
    {
        id: 'romance',
        nombre: 'Romance',
        descripcion: 'Historias centradas en relaciones personales.'
    }
];

const mangasPorCategoria = {
    accion: [
        {
            id: '1',
            titulo: 'Naruto',
            autor: 'Masashi Kishimoto',
            editorial: 'Panini Argentina',
            cantidadTomos: 72,
            estado: 'Finalizado',
            precioPorTomo: 10990,
            descripcion: 'Naruto Uzumaki es un joven ninja que busca ganarse el respeto de su aldea y cumplir su sueño de convertirse en Hokage.'
        },
        {
            id: '2',
            titulo: 'Jujutsu Kaisen',
            autor: 'Gege Akutami',
            editorial: 'Panini Argentina',
            cantidadTomos: 30,
            estado: 'Finalizado',
            precioPorTomo: 11990,
            descripcion: 'Yuji Itadori termina involucrado en el mundo de las maldiciones después de encontrarse con un peligroso objeto sobrenatural.'
        }
    ],

    aventura: [
        {
            id: '3',
            titulo: 'One Piece',
            autor: 'Eiichiro Oda',
            editorial: 'Ivrea Argentina',
            cantidadTomos: 110,
            estado: 'En publicación',
            precioPorTomo: 10990,
            descripcion: 'Monkey D. Luffy comienza su viaje por los mares con el objetivo de encontrar el legendario tesoro One Piece y convertirse en el Rey de los Piratas.'
        },
        {
            id: '4',
            titulo: 'Hunter x Hunter',
            autor: 'Yoshihiro Togashi',
            editorial: 'Ivrea Argentina',
            cantidadTomos: 38,
            estado: 'En publicación',
            precioPorTomo: 11990,
            descripcion: 'Gon Freecss decide convertirse en Hunter para seguir los pasos de su padre y conocer el mundo que existe más allá de su hogar.'
        }
    ],

    fantasia: [
        {
            id: '5',
            titulo: 'Fullmetal Alchemist',
            autor: 'Hiromu Arakawa',
            editorial: 'Ivrea Argentina',
            cantidadTomos: 27,
            estado: 'Finalizado',
            precioPorTomo: 12990,
            descripcion: 'Los hermanos Edward y Alphonse Elric buscan recuperar lo que perdieron después de intentar utilizar la alquimia para traer de vuelta a su madre.'
        },
        {
            id: '6',
            titulo: 'Frieren',
            autor: 'Kanehito Yamada',
            editorial: 'Ivrea Argentina',
            cantidadTomos: 15,
            estado: 'En publicación',
            precioPorTomo: 11990,
            descripcion: 'Tras derrotar al Rey Demonio, la elfa Frieren emprende un nuevo viaje mientras intenta comprender mejor a las personas y el paso del tiempo.'
        }
    ],

    'ciencia-ficcion': [
        {
            id: '7',
            titulo: 'Akira',
            autor: 'Katsuhiro Otomo',
            editorial: 'Ovni Press',
            cantidadTomos: 6,
            estado: 'Finalizado',
            precioPorTomo: 39990,
            descripcion: 'En una ciudad reconstruida después de una gran catástrofe, Kaneda y Tetsuo se ven involucrados en secretos relacionados con experimentos y poderes extraordinarios.'
        },
        {
            id: '8',
            titulo: 'Ghost in the Shell',
            autor: 'Masamune Shirow',
            editorial: 'Ovni Press',
            cantidadTomos: 3,
            estado: 'Finalizado',
            precioPorTomo: 21990,
            descripcion: 'En un futuro donde humanos y tecnología están profundamente conectados, la mayor Motoko Kusanagi investiga delitos relacionados con sistemas informáticos y cuerpos artificiales.'
        },
        {
            id: '11',
            titulo: 'Steins;Gate',
            autor: 'Yomi Sarachi',
            editorial: 'Ivrea España',
            cantidadTomos: 3,
            estado: 'Finalizado',
            precioPorTomo: 13990,
            descripcion: 'Un grupo de amigos en Akihabara descubre una manera de enviar mensajes al pasado, pero sus experimentos terminan atrayendo la atención de una misteriosa organización.'
        }
    ],

    romance: [
        {
            id: '9',
            titulo: 'Kimi ni Todoke',
            autor: 'Karuho Shiina',
            editorial: 'Planeta Cómic',
            cantidadTomos: 30,
            estado: 'Finalizado',
            precioPorTomo: 9990,
            descripcion: 'Sawako es una estudiante tímida que tiene dificultades para relacionarse con sus compañeros, hasta que comienza a acercarse a Kazehaya.'
        },
        {
            id: '10',
            titulo: 'Horimiya',
            autor: 'HERO y Daisuke Hagiwara',
            editorial: 'Norma Editorial',
            cantidadTomos: 17,
            estado: 'Finalizado',
            precioPorTomo: 10990,
            descripcion: 'Hori y Miyamura parecen tener vidas muy distintas en el colegio, pero al conocerse fuera de clases descubren facetas inesperadas del otro.'
        }
    ],

    'prueba-vacia': []
};

export const handlers = [
    http.get(`${baseApi}/categorias`, async () => {
        await delay(800);

        return HttpResponse.json(categorias);
    }),

    http.get(`${baseApi}/mangas`, async ({ request }) => {
        await delay(800);

        const url = new URL(request.url);
        const categoria = url.searchParams.get('categoria');

        if (!categoria) {
            return HttpResponse.json(
                { mensaje: 'Debes indicar una categoría.' },
                { status: 400 }
            );
        }

        if (categoria === 'error-servidor') {
            return HttpResponse.json(
                { mensaje: 'Error interno simulado del servidor.' },
                { status: 500 }
            );
        }

        if (!Object.hasOwn(mangasPorCategoria, categoria)) {
            return HttpResponse.json(
                { mensaje: 'Categoría no encontrada.' },
                { status: 404 }
            );
        }

        return HttpResponse.json(mangasPorCategoria[categoria]);
    })
];
