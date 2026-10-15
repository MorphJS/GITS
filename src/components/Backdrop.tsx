import { useEffect, useRef } from 'react'
import { gsap, prefersReduced, ScrollTrigger } from '../motion'

// Un único fondo fijo detrás de TODAS las secciones (en vez de un fondo por sección):
// no hay bordes entre secciones y el color cambia de forma continua con el scroll.
// Cada "tono" mueve y atenúa tres manchas de color (naranja, laguna, rojo/cobre) → solo transform + opacity.
type Tone = [a: [number, number, number], b: [number, number, number], c: [number, number, number]] // [x%, y%, opacidad]

const TONES: Record<string, Tone> = {
  top: [[40, -30, 0], [-40, 40, 0], [0, 0, 0]],
  historia: [[45, -25, 0.5], [-45, 35, 0.22], [10, 55, 0.18]],
  arte: [[55, 40, 0.18], [-30, -10, 0.5], [20, 55, 0.22]],
  fondos: [[-40, 30, 0.3], [40, 0, 0.18], [0, -20, 0.5]],
  concept: [[40, 35, 0.28], [-45, -15, 0.45], [-10, 55, 0.14]],
  boxset: [[0, 10, 0.55], [-50, 45, 0.15], [50, -20, 0.3]],
  footer: [[0, 30, 0.2], [-40, 40, 0.1], [40, 40, 0.1]],
}

export default function Backdrop() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const blobs = gsap.utils.toArray<HTMLElement>('.bd__blob')
      const apply = (key: string, instant = false) => {
        const tone = TONES[key]
        blobs.forEach((el, i) => {
          const [x, y, o] = tone[i]
          gsap.to(el, { xPercent: x, yPercent: y, opacity: o, duration: instant || prefersReduced() ? 0 : 2.2, ease: 'power2.inOut', overwrite: 'auto' })
        })
      }
      apply('top', true)
      const map: [string, string][] = [['#top', 'top'], ['#historia', 'historia'], ['#arte', 'arte'], ['#fondos', 'fondos'], ['#concept', 'concept'], ['#boxset', 'boxset'], ['.footer', 'footer']]
      map.forEach(([sel, key]) => {
        // Se resuelve desde document: dentro del contexto, los selectores en texto se limitan al fondo.
        const trigger = document.querySelector(sel)
        if (!trigger) return
        ScrollTrigger.create({
          trigger, start: 'top 55%', end: 'bottom 55%',
          onEnter: () => apply(key), onEnterBack: () => apply(key),
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div className="bd" ref={root} aria-hidden="true">
      <div className="bd__blob bd__blob--a"><i /></div>
      <div className="bd__blob bd__blob--b"><i /></div>
      <div className="bd__blob bd__blob--c"><i /></div>
    </div>
  )
}
