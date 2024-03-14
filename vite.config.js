import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    assetsInclude: ['**/*.glb'],
    base: '/',
  }

  if (command !== 'serve') {
    config.base = '/hoanghuyduc/'
  }

  return config
})
