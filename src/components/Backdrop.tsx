import { useEffect, useRef } from 'react'
import { gsap, prefersReduced, ScrollTrigger } from '../motion'

type Blob = [x: number, y: number, opacity: number]

const TONES: Record<string, Blob[]> = {
  top: [[40, -30, 0], [-40, 40, 0], [0, 0, 0]],
  historia: [[45, -25, 0.5], [-45, 35, 0.22], [10, 55, 0.18]],
  arte: [[55, 40, 0.18], [-30, -10, 0.5], [20, 55, 0.22]],
  fondos: [[-40, 30, 0.3], [40, 0, 0.18], [0, -20, 0.5]],
  concept: [[40, 35, 0.28], [-45, -15, 0.45], [-10, 55, 0.14]],
  boxset: [[0, 10, 0.55], [-50, 45, 0.15], [50, -20, 0.3]],
  footer: [[0, 30, 0.2], [-40, 40, 0.1], [40, 40, 0.1]],
}

const SECTIONS = {
  '#top': 'top',
  '#historia': 'historia',
  '#arte': 'arte',
  '#fondos': 'fondos',
  '#concept': 'concept',
  '#boxset': 'boxset',
  '.footer': 'footer',
}

export default function Backdrop() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const blobs = gsap.utils.toArray<HTMLElement>('.bd__blob')

      function setTone(name: string, instant?: boolean) {
        blobs.forEach((el, i) => {
          const [x, y, opacity] = TONES[name][i]
          gsap.to(el, {
            xPercent: x,
            yPercent: y,
            opacity,
            duration: instant || prefersReduced() ? 0 : 2.2,
            ease: 'power2.inOut',
            overwrite: 'auto',
          })
        })
      }

      setTone('top', true)

      for (const [selector, name] of Object.entries(SECTIONS)) {
        const trigger = document.querySelector(selector)
        if (!trigger) continue
        ScrollTrigger.create({
          trigger,
          start: 'top 55%',
          end: 'bottom 55%',
          onEnter: () => setTone(name),
          onEnterBack: () => setTone(name),
        })
      }
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
