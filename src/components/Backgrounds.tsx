import { useEffect, useRef } from 'react'
import { ArtImg } from '../art'
import { BACKGROUNDS } from '../data'
import { gsap, prefersReduced } from '../motion'

export default function Backgrounds() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    if (prefersReduced()) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.vista').forEach((vista) => {
        gsap.fromTo(
          vista.querySelector('img'),
          { yPercent: -8 },
          { yPercent: 8, ease: 'none', scrollTrigger: { trigger: vista, start: 'top bottom', end: 'bottom top', scrub: true } },
        )
        gsap.from(vista.querySelector('.vista__frame'), {
          opacity: 0,
          y: 80,
          duration: 1.3,
          ease: 'power3.out',
          scrollTrigger: { trigger: vista, start: 'top 85%', once: true },
        })
        gsap.from(vista.querySelector('.vista__num'), {
          opacity: 0,
          x: -60,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: { trigger: vista, start: 'top 70%', once: true },
        })
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section className="fondos section" id="fondos" ref={root}>
      <div className="fondos__head">
        <span className="mono label">03 / Fondos</span>
        <h2 className="display">Mundos <em>enteros</em></h2>
        <p className="lead">Escenarios pintados: callejones, torres al atardecer y estructuras de la ciudad.</p>
      </div>

      {BACKGROUNDS.map((w, i) => {
        const n = String(i + 1).padStart(2, '0')
        return (
          <figure className="vista" key={w.id}>
            <div className="vista__frame">
              <ArtImg id={w.id} sizes="100vw" />
              <span className="vista__num" aria-hidden="true">{n}</span>
            </div>
            <figcaption className="mono"><span>FONDO {n}</span><span>{w.title}</span></figcaption>
          </figure>
        )
      })}
    </section>
  )
}
