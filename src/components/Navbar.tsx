import { useState, useEffect } from 'react'
import { useTranslation } from '../contexts/LanguageContext'

export default function Navbar() {
  const { t, lang, toggle } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const [active, setActive]     = useState('')

  const links = [
    { label: t.nav.about,      href: '#hero' },
    { label: t.nav.projects,   href: '#projects' },
    { label: t.nav.hackathons, href: '#hackathons' },
    { label: t.nav.skills,     href: '#skills' },
    { label: t.nav.contact,    href: '#contact' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = ['hero', 'projects', 'hackathons', 'skills', 'contact']
    const observer = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }) },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  const handleNav = (href: string) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-surface/90 backdrop-blur-md border-b border-border' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => handleNav('#hero')}
          className="font-mono text-sm text-accent font-semibold tracking-widest hover:opacity-80 transition-opacity"
        >
          SK<span className="text-muted">.dev</span>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
          {links.map(({ label, href }) => (
            <li key={href}>
              <button onClick={() => handleNav(href)}
                className={`px-3 py-1.5 text-sm font-mono transition-colors rounded cursor-pointer border-none bg-transparent ${
                  active === href.slice(1) ? 'text-accent' : 'text-muted hover:text-heading'
                }`}
              >
                {label}
              </button>
            </li>
          ))}

          {/* Language toggle */}
          <li className="ml-2">
            <button onClick={toggle}
              className="px-3 py-1.5 text-sm font-mono border border-border rounded text-muted hover:border-accent hover:text-accent transition-all cursor-pointer bg-transparent"
            >
              {lang === 'en' ? '🇫🇷 FR' : '🇬🇧 EN'}
            </button>
          </li>
        </ul>

        {/* Mobile: lang + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <button onClick={toggle}
            className="font-mono text-xs border border-border rounded px-2 py-1 text-muted hover:text-accent hover:border-accent transition-all bg-transparent"
          >
            {lang === 'en' ? '🇫🇷 FR' : '🇬🇧 EN'}
          </button>
          <button onClick={() => setOpen(o => !o)} aria-label="Toggle menu"
            className="flex flex-col gap-1.5 p-2 cursor-pointer border-none bg-transparent"
          >
            <span className={`block w-5 h-px bg-heading transition-all duration-200 ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-px bg-heading transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-heading transition-all duration-200 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-surface border-b border-border px-6 pb-4 pt-2">
          <ul className="flex flex-col gap-1 list-none m-0 p-0">
            {links.map(({ label, href }) => (
              <li key={href}>
                <button onClick={() => handleNav(href)}
                  className="w-full text-left px-3 py-2 text-sm font-mono text-text hover:text-accent transition-colors cursor-pointer border-none bg-transparent"
                >
                  <span className="text-accent mr-2">&gt;</span>{label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
