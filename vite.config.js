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
      external: ['ethers'],
      input: path.resolve(__dirname, 'index.html'),
      output: {
        globals: {
          ethers: 'ethers'
        }
      }
    },
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    },
    chunkSizeWarningLimit: 1600,
    target: 'esnext',
  },
  server: {
    port: 3000
  },
  optimizeDeps: {
    include: [
      'ethers',
      'react',
      'react-dom',
      'react-router-dom',
      '@rainbow-me/rainbowkit',
      '@tanstack/react-query',
      'wagmi',
      'viem',
      'framer-motion'
    ],
    esbuildOptions: {
      target: 'esnext'
    }
  }
})
