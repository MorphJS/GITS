import { useCallback, useLayoutEffect, useState } from 'react'
import { ScrollTrigger, getLenis, startSmoothScroll } from './motion'
import Preloader from './components/Preloader'
import Header from './components/Header'
import Hero from './components/Hero'
import Story from './components/Story'
import Gallery from './components/Gallery'
import Backdrop from './components/Backdrop'
import Backgrounds from './components/Backgrounds'
import Concepts from './components/Concepts'
import BoxSet from './components/BoxSet'
import Footer from './components/Footer'

export default function App() {
  const [ready, setReady] = useState(false)

  // useLayoutEffect: corre antes que los efectos de los hijos, así el scroll ya está bloqueado
  // cuando arranca el preloader.
  useLayoutEffect(() => {
    document.documentElement.classList.add('is-loading')
    const stop = startSmoothScroll()
    getLenis()?.stop()
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    return () => {
      window.removeEventListener('load', refresh)
      stop()
    }
  }, [])

  const onDone = useCallback(() => {
    document.documentElement.classList.remove('is-loading')
    getLenis()?.start()
    setReady(true)
    ScrollTrigger.refresh()
  }, [])

  return (
    <>
      <Preloader onDone={onDone} />
      <Backdrop />
      <div className="grain" aria-hidden="true" />
      <Header />
      <main>
        <Hero ready={ready} />
        <Story />
        <Gallery />
        <Backgrounds />
        <Concepts />
        <BoxSet />
      </main>
      <Footer />
    </>
  )
}
