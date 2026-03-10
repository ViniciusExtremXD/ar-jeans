import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/ar-jeans/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
