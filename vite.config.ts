import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    host: 'localhost',
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'build',
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 5000,
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src/assets/images/' }],
  },
});
