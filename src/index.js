import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { registerServiceWorker } from './pwa/sw.js';

import './styles/global.css';

Sentry.init({
  dsn: "https://124156695a204373a0311bcedd09c9ea@o603945.ingest.sentry.io/5744584",
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

registerServiceWorker();
