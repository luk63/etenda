import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
    },
    chunkSizeWarningLimit: 1600,
    target: 'esnext',
  },
  server: {
    port: 3000
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext'
    }
  }
})
