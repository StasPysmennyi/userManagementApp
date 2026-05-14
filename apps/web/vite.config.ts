import path from 'path';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(__dirname, '../../'), '');

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        src: path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3000,
      strictPort: true,
    },
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(env.API_URL),
    },
  };
});
