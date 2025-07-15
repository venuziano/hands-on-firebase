import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { registerServiceWorker } from './pwa/sw.js';

import './styles/global.css';

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DNS,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// registerServiceWorker();
