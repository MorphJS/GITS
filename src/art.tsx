import manifest from './art-manifest.json'
import { BACKGROUNDS, CONCEPTS, ILLUSTRATIONS } from './data'

type Size = { w: number; h: number }

function sizesOf(id: string) {
  return manifest[id as keyof typeof manifest] as unknown as Record<'800' | '2000', Size>
}

const ALL_WORKS = [...ILLUSTRATIONS, ...BACKGROUNDS, ...CONCEPTS]

export function aspectOf(id: string) {
  const { w, h } = sizesOf(id)['2000']
  return w / h
}

type Props = { id: string; sizes: string; eager?: boolean; className?: string }

export function ArtImg({ id, sizes, eager, className }: Props) {
  const s = sizesOf(id)
  const alt = ALL_WORKS.find((w) => w.id === id)?.alt ?? ''

  let srcSet = `./img/${id}-800.webp ${s['800'].w}w`
  if (s['800'].w !== s['2000'].w) {
    srcSet += `, ./img/${id}-2000.webp ${s['2000'].w}w`
  }

  return (
    <img
      className={className}
      src={`./img/${id}-800.webp`}
      srcSet={srcSet}
      sizes={sizes}
      width={s['2000'].w}
      height={s['2000'].h}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      draggable={false}
    />
  )
}
