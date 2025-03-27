import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  // root: 'public',
  define: {
    'process.env': {},
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  css: {
    postcss: path.resolve(__dirname, './postcss.config.js'),
  },
  test: {
    setupFiles: ['./vitest.setup.ts'],
    environment: 'jsdom',
  },
})
