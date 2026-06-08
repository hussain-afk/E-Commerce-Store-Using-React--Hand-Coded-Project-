import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    headers: {
      // Relax isolation rules so the popup window can talk back to localhost
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
    },
  },
})
