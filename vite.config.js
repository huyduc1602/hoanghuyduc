import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb'],
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        '404': './public/404.html'
      }
    }
  }
})
