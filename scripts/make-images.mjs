// Convierte las obras de art-source/ a WebP en dos tamaños (alto 2000 y 800, sin ampliar)
// y escribe src/art-manifest.json con las dimensiones reales (reserva espacio, sin saltos de layout).
// Cada imagen se reintenta con menos calidad hasta pesar menos de 290 KB.
// Uso: npm run images
import sharp from 'sharp'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const src = path.join(root, 'art-source')
const out = path.join(root, 'public', 'img')
await mkdir(out, { recursive: true })

// [id, archivo, recorte opcional]
// Art_of_Ghost_in_the_Shell_91.jpg se omite a propósito: es la misma imagen que 91.png, pero en baja resolución.
const WORKS = [
  ['official-01', 'official-01.jpg'],
  ['official-02', 'official-02.jpg'],
  ['official-03', 'official-03.jpg'],
  ['official-04', 'official-04.jpg'],
  ['official-05', 'official-05.jpg'],
  ['official-06', 'official-06.jpg'],
  ['official-07', 'official-07.jpg'],
  ['official-08', 'official-08.jpg'],
  ['official-09', 'official-09.jpg'],
  ['official-10', 'official-10.jpg'],
  ['gits-head', 'ghostintheshell.jpg'],
  ['sb-025', '025.jpg'],
  ['kd-051', '051.jpg'],
  ['kd-052', '052.jpg'],
  ['kd-053', '053.jpg'],
  ['art-105', 'Art_of_Ghost_in_the_Shell_105.png'],
  ['art-91', 'Art_of_Ghost_in_the_Shell_91.png'],
  ['art-c10', 'Art_of_Ghost_in_the_Shell_C_10.jpg'],
  ['art-c11', 'Art_of_Ghost_in_the_Shell_C_11.jpg'],
  ['tv-016', 'gitstv_016.jpg'],
  // Esta imagen trae esquinas negras escalonadas en la parte baja: se recorta la zona limpia.
  ['bg-65', 'Art_of_Ghost_in_the_Shell_65.jpg', { left: 0, top: 0, width: 1280, height: 640 }],
  ['bg-79', 'Art_of_Ghost_in_the_Shell_79.jpg'],
  ['bg-92', 'Art_of_Ghost_in_the_Shell_92.jpg'],
]

const manifest = {}
for (const [id, file, crop] of WORKS) {
  manifest[id] = {}
  for (const h of [2000, 800]) {
    let q = h === 2000 ? 76 : 72
    let info
    do {
      let img = sharp(path.join(src, file), { limitInputPixels: false })
      if (crop) img = img.extract(crop)
      info = await img.resize({ height: h, withoutEnlargement: true }).webp({ quality: q, effort: 5 }).toFile(path.join(out, `${id}-${h}.webp`))
      q -= 5
    } while (info.size > 290 * 1024 && q > 8)
    manifest[id][h] = { w: info.width, h: info.height, kb: Math.round(info.size / 1024) }
    console.log(`${id}-${h}.webp`, manifest[id][h].kb + ' KB', info.width + 'x' + info.height)
  }
}
await writeFile(path.join(root, 'src', 'art-manifest.json'), JSON.stringify(manifest, null, 1))
