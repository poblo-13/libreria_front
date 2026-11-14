
# El Manga del Frente

Aplicación web desarrollada con React que simula el catálogo de una librería especializada en mangas.

Este proyecto fue realizado para la actividad formativa de la Semana 4 de Desarrollo Frontend II, enfocada en la integración entre frontend y backend mediante una API REST simulada.

## Funcionalidades

- Página de inicio con presentación de la librería.
- Navegación mediante React Router.
- Consulta de categorías desde una API REST mock.
- Listado de mangas por categoría.
- Información de títulos, autores, editoriales, tomos y sinopsis.
- Precios referenciales simulados en pesos chilenos.
- Indicadores de carga durante las consultas.
- Manejo de errores HTTP y opción de reintentar.
- Caché en memoria para evitar consultas innecesarias.
- Página personalizada para rutas inexistentes.
- Diseño adaptable a dispositivos móviles.

## Tecnologías utilizadas

- React
- Vite
- JavaScript
- React Router
- Tailwind CSS
- Mock Service Worker (MSW)
- Fetch API
- HTML y CSS

## API REST simulada

La aplicación utiliza MSW para interceptar solicitudes HTTP y entregar respuestas simuladas.

### Endpoints

**GET /api/categorias**

Obtiene las categorías disponibles.

**GET /api/mangas?categoria=accion**

Obtiene los mangas de una categoría determinada.

La API también permite probar respuestas de error HTTP 400, 404 y 500.

## Instalación y ejecución

Clonar el repositorio e instalar las dependencias:

```bash
npm install
```

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

Vite mostrará la dirección local para abrir la aplicación.

## Comprobaciones

Ejecutar el analizador de código:

```bash
npm run lint
```

Generar la versión de producción:

```bash
npm run build
```

Ejecutar la vista previa:

```bash
npm run preview
```

## Estructura principal

```text
src/
├── mocks/
│   ├── browser.js
│   └── handlers.js
├── pages/
│   ├── Inicio.jsx
│   ├── Categorias.jsx
│   ├── MangasCategoria.jsx
│   └── NoEncontrada.jsx
├── services/
│   ├── categoriasApi.js
│   └── mangasApi.js
├── App.jsx
├── index.css
└── main.jsx
```

## Consideraciones

Los datos del catálogo se utilizan con fines académicos.

Los precios son ficticios y no representan ofertas comerciales reales.

La aplicación utiliza una API REST simulada y no requiere un servidor backend independiente.

La versión de demostración activa MSW mediante la configuración de entorno del proyecto.

## Autor

Proyecto académico desarrollado para Desarrollo Frontend II, Duoc UC.
