import { scrollToSection } from '../motion'

const LINKS = [
  ['#historia', 'Historia'],
  ['#arte', 'Arte'],
  ['#fondos', 'Fondos'],
  ['#concept', 'Concept'],
  ['#boxset', 'Box'],
] as const

export default function Header() {
  return (
    <header className="header">
      <a className="mono header__brand" href="#top" onClick={(e) => { e.preventDefault(); scrollToSection('#top') }}>
        GITS<span>//</span><b>ARCHIVO</b>
      </a>
      <nav className="header__nav" aria-label="Secciones">
        {LINKS.map(([hash, label]) => (
          <a key={hash} className="mono" href={hash} onClick={(e) => { e.preventDefault(); scrollToSection(hash) }}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  )
}
