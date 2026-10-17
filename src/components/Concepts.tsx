import { useEffect, useRef, useState } from 'react'
import { ArtImg, aspectOf } from '../art'
import { CONCEPTS } from '../data'
import { gsap, prefersReduced } from '../motion'

const ZOOM = 2.4

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export default function Concepts() {
  const root = useRef<HTMLElement>(null)
  const view = useRef<HTMLDivElement>(null)
  const readout = useRef<HTMLSpanElement>(null)
  const [current, setCurrent] = useState(0)
  const work = CONCEPTS[current]

  useEffect(() => {
    const box = view.current!

    const ctx = gsap.context(() => {
      const lineX = box.querySelector<HTMLElement>('.dossier__lx')!
      const lineY = box.querySelector<HTMLElement>('.dossier__ly')!
      const getImg = () => box.querySelector<HTMLElement>('.dossier__img')!
      const instant = prefersReduced()
      let zoomed = false

      function setReadout(text: string) {
        if (readout.current) readout.current.textContent = text
      }

      function relative(e: PointerEvent) {
        const rect = box.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width
        const y = (e.clientY - rect.top) / rect.height
        return { x: Math.min(1, Math.max(0, x)), y: Math.min(1, Math.max(0, y)) }
      }

      function follow(x: number, y: number) {
        const rect = box.getBoundingClientRect()
        gsap.to(getImg(), {
          x: -(x - 0.5) * (ZOOM - 1) * rect.width,
          y: -(y - 0.5) * (ZOOM - 1) * rect.height,
          duration: instant ? 0 : 0.7,
          ease: 'power3.out',
          overwrite: 'auto',
        })
        gsap.to(lineX, { x: x * rect.width, duration: 0.15, overwrite: 'auto' })
        gsap.to(lineY, { y: y * rect.height, duration: 0.15, overwrite: 'auto' })
        setReadout(`X ${x.toFixed(2)}  Y ${y.toFixed(2)}  ·  ${ZOOM.toFixed(1)}×`)
      }

      function zoomIn() {
        zoomed = true
        box.classList.add('is-zoom')
        gsap.to(getImg(), { scale: ZOOM, duration: instant ? 0 : 0.8, ease: 'power3.out', overwrite: 'auto' })
      }

      function zoomOut() {
        zoomed = false
        box.classList.remove('is-zoom')
        gsap.to(getImg(), { scale: 1, x: 0, y: 0, duration: instant ? 0 : 0.8, ease: 'power3.out', overwrite: 'auto' })
        setReadout('ZOOM 1.0×')
      }

      const onMove = (e: PointerEvent) => {
        if (e.pointerType === 'touch') return
        if (!zoomed) zoomIn()
        const p = relative(e)
        follow(p.x, p.y)
      }

      const onLeave = (e: PointerEvent) => {
        if (e.pointerType !== 'touch') zoomOut()
      }

      const onTap = (e: PointerEvent) => {
        if (e.pointerType !== 'touch') return
        if (zoomed) {
          zoomOut()
          return
        }
        zoomIn()
        const p = relative(e)
        follow(p.x, p.y)
      }

      box.addEventListener('pointermove', onMove)
      box.addEventListener('pointerleave', onLeave)
      box.addEventListener('pointerup', onTap)

      return () => {
        box.removeEventListener('pointermove', onMove)
        box.removeEventListener('pointerleave', onLeave)
        box.removeEventListener('pointerup', onTap)
      }
    }, root)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    view.current?.classList.remove('is-zoom')
    if (readout.current) readout.current.textContent = 'ZOOM 1.0×'
  }, [current])

  return (
    <section className="concepts section" id="concept" ref={root}>
      <div className="concepts__head">
        <span className="mono label">04 / Concept arts</span>
        <h2 className="display">Obra <em>a obra</em></h2>
        <p className="lead">Material de producción de Production I.G.: storyboards, dibujos clave y diseños de armas y vehículos. Pasa el cursor para inspeccionar cada trazo.</p>
      </div>

      <div className="dossier">
        <ol className="dossier__index" aria-label="Obras">
          {CONCEPTS.map((w, i) => (
            <li key={w.id}>
              <button
                type="button"
                className={i === current ? 'is-on' : ''}
                onClick={() => setCurrent(i)}
                aria-current={i === current}
              >
                <span className="mono">{pad(i + 1)}</span>
                <span className="dossier__t">{w.title}</span>
              </button>
            </li>
          ))}
        </ol>

        <div className="dossier__stage">
          <div className="dossier__view" ref={view} style={{ ['--ar' as string]: aspectOf(work.id) }}>
            <ArtImg key={work.id} id={work.id} className="dossier__img" sizes="(max-width: 899px) 220vw, 2000px" eager />
            <i className="dossier__lx" />
            <i className="dossier__ly" />
            <b className="dossier__c dossier__c--tl" />
            <b className="dossier__c dossier__c--tr" />
            <b className="dossier__c dossier__c--bl" />
            <b className="dossier__c dossier__c--br" />
          </div>
          <div className="dossier__meta mono">
            <span>FIG. {pad(current + 1)} / {pad(CONCEPTS.length)}</span>
            <span ref={readout}>ZOOM 1.0×</span>
          </div>
        </div>

        <aside className="dossier__info">
          <span className="mono label">Obra {pad(current + 1)}</span>
          <h3 key={work.id}>{work.title}</h3>
          <p>Dibujo de producción de Production I.G., aportado por el autor del proyecto.</p>
          <p className="credit mono">© Production I.G. / Shirow Masamune / Kodansha</p>
        </aside>
      </div>
    </section>
  )
}
