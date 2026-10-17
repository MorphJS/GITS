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

  useLayoutEffect(() => {
    document.documentElement.classList.add('is-loading')
    const stopScroll = startSmoothScroll()
    getLenis()?.stop()

    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)

    return () => {
      window.removeEventListener('load', onLoad)
      stopScroll()
    }
  }, [])

  const finishLoading = useCallback(() => {
    document.documentElement.classList.remove('is-loading')
    getLenis()?.start()
    setReady(true)
    ScrollTrigger.refresh()
  }, [])

  return (
    <>
      <Preloader onDone={finishLoading} />
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
