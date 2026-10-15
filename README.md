# Ghost in the Shell — Archivo

Sitio web escolar sobre el universo de Ghost in the Shell. Proyecto sin fines de lucro, hecho para entrega.

**Stack:** Vite · React · TypeScript · GSAP + ScrollTrigger · Lenis

## Secciones
Hero · Historia · Ilustraciones · Fondos · Concept arts · Legacy Box Set (concepto escolar, no es un producto real).

## Uso

```bash
npm install
npm run dev        # desarrollo en http://localhost:5173
npm run build      # genera dist/ (base './': funciona en cualquier subruta de GitHub Pages)
npm run preview    # sirve dist/ en local
npm run check      # (con preview en el puerto 4173) capturas Playwright en 4 viewports + errores de consola
```

`npm run check` necesita Chromium: `npx playwright install chromium` (una sola vez).

## Imágenes
Los WebP optimizados ya están en `public/img/` (dos tamaños por obra, cada uno menor a 300 KB).
Los originales no se suben (pesan ~64 MB): viven en `art-source/`, ignorada por git.
Para regenerar los WebP hay que tener los originales en `art-source/` y ejecutar `npm run images`.
Qué obra va en cada sección se define en `src/data.ts`.

## Accesibilidad y rendimiento
- Respeta `prefers-reduced-motion`: sin scroll suave ni pin, y la Historia pasa a una lista simple.
- En móvil la galería horizontal usa scroll nativo con snap.
- Solo se animan `transform` y `opacity`.

## Créditos
Ghost in the Shell © Shirow Masamune / Kodansha / Production I.G.
Ilustraciones: theghostintheshell.jp ("Shirow Masamune Artworks in the Shell"). Material de producción y video: aportados por el autor del proyecto.
Proyecto escolar sin fines de lucro, no publicado.
