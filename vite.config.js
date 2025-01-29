import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Garante que os assets sejam carregados corretamente
  server: {
    host: process.env.VITE_HOST || '0.0.0.0', // Host dinâmico
    port: parseInt(process.env.VITE_PORT) || 4173, // Porta dinâmica
  },
});
