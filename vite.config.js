import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['framer-motion'] // Make sure 'framer-motion' is included here
  },
  server: {
    host: '0.0.0.0'
  }
})
