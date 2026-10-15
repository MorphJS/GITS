import { useEffect, useRef } from 'react'
import { BOX_CONTENTS } from '../data'
import { gsap, prefersReduced } from '../motion'

export default function BoxSet() {
  const root = useRef<HTMLElement>(null)
  const box = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = box.current!
    const ctx = gsap.context(() => {
      gsap.set(el, { rotationY: -24, rotationX: 8 })
      if (prefersReduced()) return

      const ry = gsap.quickTo(el, 'rotationY', { duration: 0.9, ease: 'power3.out' })
      const rx = gsap.quickTo(el, 'rotationX', { duration: 0.9, ease: 'power3.out' })
      const hoverable = window.matchMedia('(hover: hover) and (pointer: fine)').matches

      if (hoverable) {
        // El mouse se normaliza a [-1, 1] respecto al centro de la sección y se mapea a un ángulo.
        const onMove = (e: PointerEvent) => {
          const r = root.current!.getBoundingClientRect()
          const nx = ((e.clientX - r.left) / r.width) * 2 - 1
          const ny = ((e.clientY - r.top) / r.height) * 2 - 1
          ry(-24 + nx * 34)
          rx(8 - ny * 16)
        }
        const sec = root.current!
        sec.addEventListener('pointermove', onMove)
        return () => sec.removeEventListener('pointermove', onMove)
      }
      // Sin mouse (táctil): vaivén automático.
      gsap.to(el, { rotationY: 12, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="boxset section" id="boxset" ref={root}>
            <div className="boxset__grid">
        <div className="boxset__text">
          <span className="mono label">05 / Legacy Box Set</span>
          <h2 className="display">Edición <em>Legacy</em></h2>
          <p className="lead">Un concepto de colección que reúne la saga en una sola caja.</p>
          <ul className="boxset__list">
            {BOX_CONTENTS.map((c, i) => (
              <li key={c}><span className="mono">{String(i + 1).padStart(2, '0')}</span>{c}</li>
            ))}
          </ul>
          <p className="mono note">Concepto escolar · No es un producto real ni está a la venta.</p>
        </div>

        <div className="boxset__stage" aria-hidden="true">
          <div className="box" ref={box}>
            <div className="face face--front">
              <span className="mono face__top">EDICIÓN CONCEPTO</span>
              <img src="./brand/gits-logo-alpha.png" alt="" width={965} height={175} />
              <span className="mono face__bottom">LEGACY BOX SET<br />Nº 0001</span>
            </div>
            <div className="face face--back" />
            <div className="face face--left"><span className="mono">GHOST IN THE SHELL — LEGACY BOX SET</span></div>
            <div className="face face--right" />
            <div className="face face--top" />
            <div className="face face--bottom" />
          </div>
          <div className="box-shadow" />
        </div>
      </div>
    </section>
  )
}
