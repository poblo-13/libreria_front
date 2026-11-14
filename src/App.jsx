
import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route,
  NavLink
} from 'react-router';

import Inicio from './pages/Inicio';
import Categorias from './pages/Categorias';
import MangasCategoria from './pages/MangasCategoria';
import NoEncontrada from './pages/NoEncontrada';

const Router = import.meta.env.PROD
  ? HashRouter
  : BrowserRouter;

const estiloEnlace = ({ isActive }) =>
  [
    'rounded-lg px-4 py-2 text-sm font-semibold',
    'transition-colors duration-200',
    'focus-visible:outline-2 focus-visible:outline-offset-2',
    'focus-visible:outline-manga-fresh',
    isActive
      ? 'bg-manga-forest text-white'
      : 'text-manga-pale hover:bg-manga-dark hover:text-white'
  ].join(' ');

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-manga-ink">

        <header className="border-b border-manga-dark bg-manga-ink">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">

            <NavLink
              to="/"
              className="flex items-center gap-3"
            >
              <span
                aria-hidden="true"
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-manga-green text-2xl font-black text-white"
              >
                M
              </span>

              <span className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-white">
                  El Manga del Frente
                </span>

                <span className="text-xs text-manga-mint">
                  Tu rincón de mangas
                </span>
              </span>
            </NavLink>

            <nav
              aria-label="Navegación principal"
              className="flex items-center gap-2"
            >
              <NavLink
                to="/"
                end
                className={estiloEnlace}
              >
                Inicio
              </NavLink>

              <NavLink
                to="/categorias"
                className={estiloEnlace}
              >
                Categorías
              </NavLink>
            </nav>

          </div>
        </header>

        <Routes>
          <Route
            path="/"
            element={<Inicio />}
          />

          <Route
            path="/categorias"
            element={<Categorias />}
          />

          <Route
            path="/categoria/:id"
            element={<MangasCategoria />}
          />

          <Route
            path="*"
            element={<NoEncontrada />}
          />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
