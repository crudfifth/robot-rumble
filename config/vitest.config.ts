import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./config/vitest.setup.ts'],
    include: ['./src/**/*.{test,spec}.{js,ts,vue}'],
    exclude: ['**/node_modules/**', '**/dist/**'],
    server: {
      deps: {},
    },
  },
})
