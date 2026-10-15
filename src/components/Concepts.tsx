import { useEffect, useRef, useState } from 'react'
import { ArtImg, aspectOf } from '../art'
import { CONCEPTS } from '../data'
import { gsap, prefersReduced } from '../motion'

const ZOOM = 2.4
const pad = (n: number) => String(n).padStart(2, '0')

// Dossier: índice de obras a la izquierda y visor con zoom a la derecha. Al pasar el mouse la
// imagen se amplía y se desplaza según el cursor (solo transform), con retícula y lectura de coordenadas.
export default function Concepts() {
  const root = useRef<HTMLElement>(null)
  const view = useRef<HTMLDivElement>(null)
  const readout = useRef<HTMLSpanElement>(null)
  const [i, setI] = useState(0)
  const work = CONCEPTS[i]

  useEffect(() => {
    const v = view.current!
    const ctx = gsap.context(() => {
      const img = () => v.querySelector<HTMLElement>('.dossier__img')!
      const lineX = v.querySelector<HTMLElement>('.dossier__lx')!
      const lineY = v.querySelector<HTMLElement>('.dossier__ly')!
      const still = prefersReduced()
      let zoomed = false

      const update = (nx: number, ny: number) => {
        const r = v.getBoundingClientRect()
        gsap.to(img(), { x: -(nx - 0.5) * (ZOOM - 1) * r.width, y: -(ny - 0.5) * (ZOOM - 1) * r.height, duration: still ? 0 : 0.7, ease: 'power3.out', overwrite: 'auto' })
        gsap.to(lineX, { x: nx * r.width, duration: 0.15, overwrite: 'auto' })
        gsap.to(lineY, { y: ny * r.height, duration: 0.15, overwrite: 'auto' })
        if (readout.current) readout.current.textContent = `X ${nx.toFixed(2)}  Y ${ny.toFixed(2)}  ·  ${ZOOM.toFixed(1)}×`
      }
      const enter = () => { zoomed = true; v.classList.add('is-zoom'); gsap.to(img(), { scale: ZOOM, duration: still ? 0 : 0.8, ease: 'power3.out', overwrite: 'auto' }) }
      const leave = () => {
        zoomed = false; v.classList.remove('is-zoom')
        gsap.to(img(), { scale: 1, x: 0, y: 0, duration: still ? 0 : 0.8, ease: 'power3.out', overwrite: 'auto' })
        if (readout.current) readout.current.textContent = `ZOOM 1.0×`
      }
      const pos = (e: PointerEvent) => {
        const r = v.getBoundingClientRect()
        return [Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)), Math.min(1, Math.max(0, (e.clientY - r.top) / r.height))] as const
      }
      const onMove = (e: PointerEvent) => { if (e.pointerType === 'touch') return; if (!zoomed) enter(); update(...pos(e)) }
      const onLeave = (e: PointerEvent) => { if (e.pointerType !== 'touch') leave() }
      // Táctil: un toque alterna el zoom en ese punto.
      const onTap = (e: PointerEvent) => {
        if (e.pointerType !== 'touch') return
        if (zoomed) leave(); else { enter(); update(...pos(e)) }
      }
      v.addEventListener('pointermove', onMove)
      v.addEventListener('pointerleave', onLeave)
      v.addEventListener('pointerup', onTap)
      return () => {
        v.removeEventListener('pointermove', onMove)
        v.removeEventListener('pointerleave', onLeave)
        v.removeEventListener('pointerup', onTap)
      }
    }, root)
    return () => ctx.revert()
  }, [])

  // Al cambiar de obra se reinicia el zoom.
  useEffect(() => { view.current?.classList.remove('is-zoom'); if (readout.current) readout.current.textContent = 'ZOOM 1.0×' }, [i])

  return (
    <section className="concepts section" id="concept" ref={root}>
      <div className="concepts__head">
        <span className="mono label">04 / Concept arts</span>
        <h2 className="display">Obra <em>a obra</em></h2>
        <p className="lead">Material de producción de Production I.G.: storyboards, dibujos clave y diseños de armas y vehículos. Pasa el cursor para inspeccionar cada trazo.</p>
      </div>

      <div className="dossier">
        <ol className="dossier__index" aria-label="Obras">
          {CONCEPTS.map((w, k) => (
            <li key={w.id}>
              <button type="button" className={k === i ? 'is-on' : ''} onClick={() => setI(k)} aria-current={k === i}>
                <span className="mono">{pad(k + 1)}</span>
                <span className="dossier__t">{w.title}</span>
              </button>
            </li>
          ))}
        </ol>

        <div className="dossier__stage">
          <div className="dossier__view" ref={view} style={{ ['--ar' as string]: aspectOf(work.id) }}>
            <ArtImg key={work.id} id={work.id} className="dossier__img" sizes="(max-width: 899px) 220vw, 2000px" eager />
            <i className="dossier__lx" /><i className="dossier__ly" />
            <b className="dossier__c dossier__c--tl" /><b className="dossier__c dossier__c--tr" />
            <b className="dossier__c dossier__c--bl" /><b className="dossier__c dossier__c--br" />
          </div>
          <div className="dossier__meta mono">
            <span>FIG. {pad(i + 1)} / {pad(CONCEPTS.length)}</span>
            <span ref={readout}>ZOOM 1.0×</span>
          </div>
        </div>

        <aside className="dossier__info">
          <span className="mono label">Obra {pad(i + 1)}</span>
          <h3 key={work.id}>{work.title}</h3>
          <p>Dibujo de producción de Production I.G., aportado por el autor del proyecto.</p>
          <p className="credit mono">© Production I.G. / Shirow Masamune / Kodansha</p>
        </aside>
      </div>
    </section>
  )
}
