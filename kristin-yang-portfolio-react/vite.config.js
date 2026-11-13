import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nmdpAccess } from './server/nmdp-vite.js';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react(), nmdpAccess()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
});
