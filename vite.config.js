// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        images1: resolve(__dirname, 'images/1.html'),
        images2: resolve(__dirname, 'images/2.html'),
        images3: resolve(__dirname, 'images/3.html'),
      },
    },
  },
});
