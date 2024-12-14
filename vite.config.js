import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react-router-dom',
        '@rainbow-me/rainbowkit',
        '@tanstack/react-query',
        'wagmi',
        'viem',
        'framer-motion',
        // Add any other external dependencies that might be causing issues
      ],
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@rainbow-me/rainbowkit',
      '@tanstack/react-query',
      'wagmi',
      'viem',
      'framer-motion',
    ],
  },
})
