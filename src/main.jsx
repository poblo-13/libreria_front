
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.jsx';
import './index.css';

async function iniciarAplicacion() {
  const activarMocks =
    import.meta.env.DEV ||
    import.meta.env.VITE_ENABLE_MSW === 'true';

  if (activarMocks) {
    const { worker } = await import('./mocks/browser');

    await worker.start({
      serviceWorker: {
        url: `${import.meta.env.BASE_URL}mockServiceWorker.js`
      },
      onUnhandledRequest: 'bypass'
    });
  }

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

iniciarAplicacion();
