import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' → rutas relativas: el build funciona en cualquier subruta de GitHub Pages
// (usuario.github.io/repo/) sin tener que conocer el nombre del repo.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: { target: 'es2020' },
})
