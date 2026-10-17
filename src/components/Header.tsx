import type { MouseEvent } from 'react'
import { scrollToSection } from '../motion'

const LINKS = [
  { hash: '#historia', label: 'Historia' },
  { hash: '#arte', label: 'Arte' },
  { hash: '#fondos', label: 'Fondos' },
  { hash: '#concept', label: 'Concept' },
  { hash: '#boxset', label: 'Box' },
]

function go(e: MouseEvent, hash: string) {
  e.preventDefault()
  scrollToSection(hash)
}

export default function Header() {
  return (
    <header className="header">
      <a className="mono header__brand" href="#top" onClick={(e) => go(e, '#top')}>
        GITS<span>//</span><b>ARCHIVO</b>
      </a>
      <nav className="header__nav" aria-label="Secciones">
        {LINKS.map(({ hash, label }) => (
          <a key={hash} className="mono" href={hash} onClick={(e) => go(e, hash)}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  )
}
