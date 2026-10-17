import { useEffect, useRef } from 'react'
import { gsap, prefersReduced } from '../motion'

export default function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('[data-in]')

      if (prefersReduced()) {
        gsap.set(items, { opacity: 1 })
        return
      }
      if (!ready) {
        gsap.set(items, { opacity: 0, y: 24 })
        return
      }
      gsap.to(items, { opacity: 1, y: 0, duration: 1.4, ease: 'power3.out', stagger: 0.12, delay: 0.1 })
    }, root)

    return () => ctx.revert()
  }, [ready])

  useEffect(() => {
    if (prefersReduced()) {
      video.current?.pause()
      return
    }

    const ctx = gsap.context(() => {
      const scrollTrigger = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true }
      gsap.to('.hero__video', { yPercent: 12, scale: 1.08, ease: 'none', scrollTrigger })
      gsap.to('.hero__center', { yPercent: -18, opacity: 0, ease: 'none', scrollTrigger })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" id="top" ref={root}>
      <video
        ref={video}
        className="hero__video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="./media/hero-poster.jpg"
        aria-hidden="true"
      >
        <source src="./media/hero.webm" type="video/webm" />
        <source src="./media/hero.mp4" type="video/mp4" />
      </video>
      <div className="hero__vignette" aria-hidden="true" />

      <div className="hero__center">
        <h1 className="sr-only">Ghost in the Shell — Archivo</h1>
        <img data-in className="hero__logo" src="./brand/gits-logo-alpha.png" alt="Ghost in the Shell" width={965} height={175} />
        <p data-in className="hero__jp" lang="ja">攻殻機動隊</p>
        <p data-in className="mono hero__sub">Archivo · Proyecto escolar</p>
      </div>

      <div className="hud hud--tl mono" data-in>SECCIÓN 9<br />FIG. 00</div>
      <div className="hud hud--tr mono" data-in>SYS.ONLINE<span className="dot" /></div>
      <div className="hud hud--bl mono" data-in>ARCHIVO<br />V1.0 / 2026</div>
      <div className="hud hud--br mono hero__scroll" data-in>
        <span>SCROLL</span><i className="hero__line" />
      </div>
    </section>
  )
}
