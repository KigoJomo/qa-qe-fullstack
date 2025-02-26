import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  root: './',
  build: {
    outDir: 'dist',
  },
  server: {
    // Automatically open the app in the browser on start
    open: true,
    // Use a specific port (otherwise Vite picks one automatically)
    port: 3000,
    watch: {
      ignored: []
    }
  },
  plugins: [
    tailwindcss()
  ]
});