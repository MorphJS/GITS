import { useEffect, useRef } from 'react'
import { ArtImg, aspectOf } from '../art'
import { CREDIT_ART, ILLUSTRATIONS } from '../data'
import { gsap } from '../motion'

export default function Gallery() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // matchMedia: en escritorio con movimiento permitido la galería se ancla (pin) y avanza en horizontal.
    // En móvil o con reduced-motion queda el scroll horizontal nativo con snap (ver CSS).
    const mm = gsap.matchMedia()
    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const sec = root.current!
      const tr = track.current!
      sec.classList.add('is-pinned')
      const dist = () => Math.max(0, tr.scrollWidth - window.innerWidth)
      const st = { trigger: sec, start: 'top top', end: () => '+=' + dist(), scrub: 1, invalidateOnRefresh: true }
      gsap.to(tr, { x: () => -dist(), ease: 'none', scrollTrigger: { ...st, pin: true, anticipatePin: 1 } })
      gsap.to('.gallery__progress i', { scaleX: 1, ease: 'none', scrollTrigger: { ...st, scrub: true } })
      return () => sec.classList.remove('is-pinned')
    })
    return () => mm.revert()
  }, [])

  return (
    <section className="gallery" id="arte" ref={root}>
      <div className="gallery__track" ref={track}>
        <div className="gallery__panel gallery__intro">
          <span className="mono label">02 / Ilustraciones</span>
          <h2 className="display">Tinta, <em>acero</em> y luz</h2>
          <p className="lead">Ilustraciones de Shirow Masamune, el autor del manga original, y un fotograma de la película. Desliza para recorrerlas.</p>
        </div>

        {ILLUSTRATIONS.map((w, i) => (
          <figure className={'gallery__panel gallery__work' + (aspectOf(w.id) > 1 ? ' is-landscape' : '')} key={w.id} style={{ ['--ar' as string]: aspectOf(w.id) }}>
            <div className="frame">
              <ArtImg id={w.id} sizes={aspectOf(w.id) > 1 ? '(max-width: 899px) 86vw, 100vh' : '(max-width: 899px) 62vw, 46vh'} eager={i < 2} />
            </div>
            <figcaption className="mono">FIG. {String(i + 1).padStart(2, '0')} · {w.title}</figcaption>
          </figure>
        ))}

        <div className="gallery__panel gallery__outro">
          <p className="credit mono">{CREDIT_ART}</p>
        </div>
      </div>
      <div className="gallery__progress" aria-hidden="true"><i /></div>
    </section>
  )
}
