import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

let lenis: Lenis | null = null
export const getLenis = () => lenis

// Lenis suaviza el scroll; GSAP lo mueve con su propio ticker para que ScrollTrigger y Lenis
// compartan el mismo reloj (un solo requestAnimationFrame, sin desfases en los pins).
export function startSmoothScroll() {
  if (prefersReduced()) return () => {}
  const l = new Lenis({ lerp: 0.1, smoothWheel: true })
  lenis = l
  l.on('scroll', ScrollTrigger.update)
  const tick = (t: number) => l.raf(t * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  return () => {
    gsap.ticker.remove(tick)
    l.destroy()
    lenis = null
  }
}

export function scrollToSection(hash: string) {
  const el = document.querySelector<HTMLElement>(hash)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { duration: 1.6 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

export { gsap, ScrollTrigger }

export function scrollToY(y: number) {
  if (lenis) lenis.scrollTo(y, { duration: 1.4 })
  else window.scrollTo({ top: y, behavior: 'smooth' })
}
