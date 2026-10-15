import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// Chrome bloquea <script type="module"> y los recursos con "crossorigin" al abrir un HTML con doble clic
// (file://), y la página queda en blanco. Como entrega escolar, el build se emite como script clásico
// (IIFE + defer) para que dist/index.html funcione igual con doble clic, en un servidor o en GitHub Pages.
function classicScript(): Plugin {
  return {
    name: 'classic-script',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler: (html) =>
        html
          .replace(/<script type="module" crossorigin src="([^"]+)"><\/script>/, '<script defer src="$1"></script>')
          .replace(/ crossorigin(="[^"]*")?/g, ''),
    },
  }
}

// base './' → rutas relativas: el build funciona en cualquier subruta de GitHub Pages
// (usuario.github.io/repo/) sin tener que conocer el nombre del repo.
export default defineConfig({
  base: './',
  plugins: [react(), classicScript()],
  build: {
    target: 'es2020',
    modulePreload: false,
    cssCodeSplit: false,
    rollupOptions: { output: { format: 'iife', inlineDynamicImports: true } },
  },
})
