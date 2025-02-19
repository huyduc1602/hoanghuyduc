import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    assetsInclude: ['**/*.glb'],
    base: '/',
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      rollupOptions: {
        input: {
          main: './index.html',
          '404': './404.html'
        },
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'openai']
          },
        },
      }
    },
    server: {
      proxy: {
        '/gdrive': {
          target: 'https://drive.google.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/gdrive/, ''),
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              console.log('proxy error', err);
            });
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log('Sending Request to the Target:', req.method, req.url);
            });
            proxy.on('proxyRes', (proxyRes, req, _res) => {
              console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
            });
          },
        },
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:3000', // Fallback for development
          changeOrigin: true,
          secure: false,
        }
      },
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    },
    optimizeDeps: {
      include: ['react-google-picker', 'react', 'react-dom', 'openai']
    },
    define: {
      __FB_APP_ID__: JSON.stringify(env.VITE_FACEBOOK_APP_ID),
    },
  };
});
