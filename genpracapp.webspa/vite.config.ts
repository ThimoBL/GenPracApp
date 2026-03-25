import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
  },
  build: {
    rollupOptions: {
      // Remove the `external` option or only use it if you have a specific reason.
    }
  },
  define: {
    'process.env': process.env
  }
})
