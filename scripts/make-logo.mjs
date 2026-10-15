// Deriva una versión con transparencia del logo real (sin redibujarlo):
// recorta el margen negro y usa la luminancia como canal alfa (blanco sobre transparente).
import sharp from 'sharp'

const input = 'public/brand/gits-logo.png'
const output = 'public/brand/gits-logo-alpha.png'
const trimmed = await sharp(input).removeAlpha().trim({ background: '#000000', threshold: 24 }).toBuffer({ resolveWithObject: true })
const { data, info } = await sharp(trimmed.data).extend({ top: 6, bottom: 6, left: 6, right: 6, background: '#000' })
  .raw().toBuffer({ resolveWithObject: true })
const out = Buffer.alloc(info.width * info.height * 4)
for (let i = 0, j = 0; i < data.length; i += info.channels, j += 4) {
  out[j] = out[j + 1] = out[j + 2] = 255
  out[j + 3] = Math.max(data[i], data[i + 1], data[i + 2])
}
await sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } }).png({ compressionLevel: 9 }).toFile(output)
console.log(output, info.width + 'x' + info.height)
