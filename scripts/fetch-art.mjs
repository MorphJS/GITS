// Descarga el arte oficial listado en el artículo de theghostintheshell.jp.
// Uso (Node 18+, sin dependencias):  node scripts/fetch-art.mjs
// Guarda en art-source/official-XX.jpg. Revisa cada imagen: la muestra incluye
// obras de Shirow Masamune que no son de GITS (Appleseed, Dominion, etc.).
import { mkdir, writeFile, access } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const BASE = 'https://cms.theghostintheshell.jp/app/uploads/2025/04/'
const FILES = [
  'Shirowartworks_H1-scaled.jpg',
  '0beefee0a19731187ee7acf07b05a5d9-scaled.jpg',
  'a9ddc634ea91fee5f6ce78c5cbf09dbb-scaled.jpg',
  'bbf03005992717271ef8802adc6e7cd2-scaled.jpg',
  '2f46db09567ed3a55ce85cf97f84dc94-scaled.jpg',
  '21537b2e90748e85b27b8f57e3d4fafc.jpg',
  'd991750e960716074b860b3e0177e736-scaled.jpg',
  '926eb1f2f3d911ea27f740d4bd348c62-scaled.jpg',
  'f95800eea5ace6dc334fd7a06b76f067-scaled.jpg',
  'ddcbb0e4a4a66f4cf327bbf6e323b528-scaled.jpg',
  '901844637c75b31f5e368012ec6e45c2-scaled.jpg',
  '090cb5363de806ae53f23385447bb83b-scaled.jpg',
  '1e80500ab4c156ccea3a97d4508f8fee-scaled.jpg',
  '1bfc62070285e6551a3edc1924be5859-scaled.jpg',
  '5111454aa68bf56ed3c862e8be1e7e20-scaled.jpg',
]

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const out = path.join(root, 'art-source')
await mkdir(out, { recursive: true })

let n = 0
for (const file of FILES) {
  n++
  const dest = path.join(out, `official-${String(n).padStart(2, '0')}.jpg`)
  try { await access(dest); console.log('ya existe', path.basename(dest)); continue } catch {}
  const res = await fetch(BASE + file, { headers: { 'User-Agent': 'Mozilla/5.0 (proyecto escolar)' } })
  if (!res.ok || !(res.headers.get('content-type') || '').startsWith('image/')) {
    console.warn('falló', file, res.status)
    continue
  }
  await writeFile(dest, Buffer.from(await res.arrayBuffer()))
  console.log('ok', path.basename(dest))
}
console.log('\n© Shirow Masamune / Production I.G / Kodansha. Uso escolar, sin publicar.')
