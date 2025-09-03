import { defineConfig } from 'vite'

// Detect repository name from environment override or default to root
const repo = process.env.GH_PAGES_BASE || ''

export default defineConfig({
  base: repo || '/',
});
