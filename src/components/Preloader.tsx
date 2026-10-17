import { useEffect, useRef } from 'react'
import { gsap, prefersReduced } from '../motion'

export default function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const num = useRef<HTMLSpanElement>(null)
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fast = prefersReduced()

    const ctx = gsap.context(() => {
      const count = { value: 0 }

      const tl = gsap.timeline({ onComplete: onDone })

      tl.to(count, {
        value: 100,
        duration: fast ? 0.3 : 1.8,
        ease: 'power2.inOut',
        onUpdate() {
          const n = Math.round(count.value)
          if (num.current) num.current.textContent = String(n).padStart(3, '0')
          if (bar.current) bar.current.style.transform = `scaleX(${n / 100})`
        },
      })

      tl.to(root.current, { yPercent: -100, duration: fast ? 0.2 : 0.95, ease: 'power4.inOut' }, '+=0.15')
      tl.set(root.current, { display: 'none' })
    }, root)

    return () => ctx.revert()
  }, [onDone])

  return (
    <div className="preloader" ref={root} role="status" aria-label="Cargando">
      <span className="mono preloader__label">GITS // ARCHIVO — CARGANDO</span>
      <span className="preloader__num" ref={num}>000</span>
      <div className="preloader__track"><div className="preloader__bar" ref={bar} /></div>
    </div>
  )
}
