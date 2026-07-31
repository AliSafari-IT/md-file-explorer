import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use /md-file-explorer/ base for GitHub Pages, / for local dev
  base: process.env.GITHUB_ACTIONS ? '/md-file-explorer/' : '/',
  server: {
    port: 3106,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  resolve: {
    alias: {
      // Alias the library to a browser-compatible shim to avoid Node.js module imports
      '@asafarim/md-file-explorer': resolve(__dirname, './src/shims/browser-compat.ts'),
      // Handle fsevents issue on non-macOS platforms
      fsevents: resolve(__dirname, './src/empty-module.js')
    }
  }
})
