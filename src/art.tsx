import manifest from './art-manifest.json'
import { BACKGROUNDS, CONCEPTS, ILLUSTRATIONS } from './data'

type Size = { w: number; h: number }
const sizesOf = (id: string) => manifest[id as keyof typeof manifest] as unknown as Record<'800' | '2000', Size>

const ALL = [...ILLUSTRATIONS, ...BACKGROUNDS, ...CONCEPTS]
const altOf = (id: string) => ALL.find((w) => w.id === id)?.alt ?? ''

export const aspectOf = (id: string) => {
  const s = sizesOf(id)['2000']
  return s.w / s.h
}

type Props = { id: string; sizes: string; eager?: boolean; className?: string; draggable?: boolean }

// Imagen responsiva: dos tamaños WebP + dimensiones reales (reserva espacio, evita saltos de layout).
export function ArtImg({ id, sizes, eager, className }: Props) {
  const s = sizesOf(id)
  // Si la fuente es pequeña, los dos tamaños coinciden: se deja un solo candidato en srcset.
  const srcSet = s['800'].w === s['2000'].w
    ? `./img/${id}-800.webp ${s['800'].w}w`
    : `./img/${id}-800.webp ${s['800'].w}w, ./img/${id}-2000.webp ${s['2000'].w}w`
  return (
    <img
      className={className}
      src={`./img/${id}-800.webp`}
      srcSet={srcSet}
      sizes={sizes}
      width={s['2000'].w}
      height={s['2000'].h}
      alt={altOf(id)}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      draggable={false}
    />
  )
}
