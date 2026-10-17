import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

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
