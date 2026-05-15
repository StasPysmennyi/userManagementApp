import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    environmentMatchGlobs: [['src/__tests__/components/**', 'jsdom']],
    setupFiles: ['src/__tests__/setup.ts'],
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
});
