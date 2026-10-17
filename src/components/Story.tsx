import { useCallback, useEffect, useRef, useState } from 'react'
import { ArtImg } from '../art'
import { CHAPTERS, GLOSSARY, STORY_ART } from '../data'
import { gsap, prefersReduced, scrollToY, ScrollTrigger } from '../motion'

const TOTAL = CHAPTERS.length

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export default function Story() {
  const reduced = useRef(prefersReduced()).current
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reduced) return

    const ctx = gsap.context(() => {
      const years = gsap.utils.toArray<HTMLElement>('.story__yr')
      const figures = gsap.utils.toArray<HTMLElement>('.story__fig')
      const copies = gsap.utils.toArray<HTMLElement>('.story__copy-item')

      let shown = -1

      function show(i: number, instant = false) {
        const outTime = instant ? 0 : 0.25
        const wait = instant ? 0 : 0.22

        years.forEach((el, k) => {
          if (k === i) {
            gsap.to(el, { opacity: 1, yPercent: 0, duration: instant ? 0 : 0.8, delay: wait, ease: 'power3.out', overwrite: 'auto' })
          } else {
            gsap.to(el, { opacity: 0, yPercent: k < i ? -35 : 35, duration: outTime, ease: 'power2.in', overwrite: 'auto' })
          }
        })

        figures.forEach((el, k) => {
          if (k === i) {
            gsap.to(el, { opacity: 1, yPercent: 0, scale: 1, rotate: 0, duration: instant ? 0 : 1, delay: wait, ease: 'power3.out', overwrite: 'auto' })
          } else {
            gsap.to(el, { opacity: 0, yPercent: k < i ? -5 : 5, scale: 0.95, rotate: k < i ? -3 : 3, duration: outTime, ease: 'power2.in', overwrite: 'auto' })
          }
        })

        copies.forEach((el, k) => {
          if (k === i) {
            gsap.to(el, { opacity: 1, y: 0, duration: instant ? 0 : 0.7, delay: wait + 0.08, ease: 'power3.out', overwrite: 'auto' })
          } else {
            gsap.to(el, { opacity: 0, y: k < i ? -20 : 20, duration: outTime, ease: 'power2.in', overwrite: 'auto' })
          }
        })

        shown = i
        setActive(i)
      }

      show(0, true)

      ScrollTrigger.create({
        trigger: track.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const i = Math.min(TOTAL - 1, Math.floor(self.progress * TOTAL))
          if (i !== shown) show(i)
        },
      })

      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const area = stage.current!
        const tiltY = gsap.quickTo('.story__art', 'rotationY', { duration: 1, ease: 'power3.out' })
        const tiltX = gsap.quickTo('.story__art', 'rotationX', { duration: 1, ease: 'power3.out' })
        const driftX = gsap.quickTo('.story__years', 'x', { duration: 1.2, ease: 'power3.out' })
        const driftY = gsap.quickTo('.story__years', 'y', { duration: 1.2, ease: 'power3.out' })

        const onMove = (e: PointerEvent) => {
          const rect = area.getBoundingClientRect()
          const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1
          const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1
          tiltY(nx * 14)
          tiltX(-ny * 10)
          driftX(-nx * 26)
          driftY(-ny * 16)
        }
        area.addEventListener('pointermove', onMove)
        return () => area.removeEventListener('pointermove', onMove)
      }
    }, root)

    return () => ctx.revert()
  }, [reduced])

  const goTo = useCallback((i: number) => {
    const el = track.current!
    const top = el.getBoundingClientRect().top + window.scrollY
    scrollToY(top + (el.offsetHeight - window.innerHeight) * ((i + 0.5) / TOTAL))
  }, [])

  if (reduced) {
    return (
      <section className="story story--static section" id="historia" ref={root}>
        <span className="mono label">01 / Historia</span>
        <h2 className="display">Del manga a <em>la red</em></h2>
        <ol className="story__list">
          {CHAPTERS.map((c, i) => (
            <li key={c.year}>
              <div className="frame"><ArtImg id={STORY_ART[i]} sizes="(max-width: 899px) 80vw, 30vw" /></div>
              <div>
                <span className="mono chapter__year">{c.year}</span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <Glossary />
      </section>
    )
  }

  return (
    <section className="story" id="historia" ref={root}>
      <div className="story__track" ref={track} style={{ ['--n' as string]: TOTAL }}>
        <div className="story__stage" ref={stage}>
          <div className="story__top mono">
            <span className="label">01 / Historia</span>
            <span>{pad(active + 1)} / {pad(TOTAL)}</span>
          </div>

          <div className="story__years" aria-hidden="true">
            {CHAPTERS.map((c) => <span className="story__yr" key={c.year}>{c.year}</span>)}
          </div>

          <div className="story__art" aria-hidden="true">
            {CHAPTERS.map((c, i) => (
              <figure className="story__fig" key={c.year}>
                <div className="frame">
                  <ArtImg id={STORY_ART[i]} sizes="(max-width: 899px) 60vw, 34vh" eager={i < 2} />
                </div>
                <figcaption className="mono">FIG. {pad(i + 1)}</figcaption>
              </figure>
            ))}
          </div>

          <div className="story__copy">
            {CHAPTERS.map((c, i) => (
              <article className="story__copy-item" key={c.year} aria-hidden={i !== active}>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </article>
            ))}
          </div>

          <nav className="story__nav mono" aria-label="Línea de tiempo">
            {CHAPTERS.map((c, i) => (
              <button key={c.year} type="button" className={i === active ? 'is-on' : ''} onClick={() => goTo(i)}>
                {c.year}
              </button>
            ))}
          </nav>
        </div>
      </div>
      <Glossary />
    </section>
  )
}

function Glossary() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReduced()) return

    const ctx = gsap.context(() => {
      gsap.from('.glossary__item', {
        opacity: 0,
        y: 48,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <div className="glossary section" ref={ref}>
      <span className="mono label">Glosario</span>
      <dl>
        {GLOSSARY.map((g) => (
          <div key={g.term} className="glossary__item">
            <dt>{g.term}</dt>
            <dd>{g.text}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
