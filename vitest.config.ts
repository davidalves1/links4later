/// <reference types="vitest" />

import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    Vue(),
  ],
  test: {
    globals: false,
    watch: false,
    environment: 'jsdom',
    coverage: {
      provider: 'istanbul', // or 'v8'
      reporter: ['clover', 'html'],
    },
  },
})
