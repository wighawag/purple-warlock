import logger from 'named-logs-console';
import './service-worker-handler';
import App from './App.svelte';

import 'tailwindcss/tailwind.css';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).logger = logger;

const app = new App({
  target: document.body,
});

export default app;
