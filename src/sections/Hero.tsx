import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import heroImg from '../assets/hero.webp'
import { profile } from '../data'
import MatrixRain from '../components/MatrixRain'
import { useTranslation } from '../contexts/LanguageContext'

function GlitchName({ text }: { text: string }) {
  const [active, setActive] = useState(false)
  useEffect(() => {
    const fire = () => { setActive(true); setTimeout(() => setActive(false), 350) }
    const id = setInterval(fire, 4500 + Math.random() * 2000)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="relative inline-block">
      <span className="font-mono text-4xl sm:text-5xl md:text-6xl font-bold text-heading leading-tight select-none">{text}</span>
      {active && (
        <>
          <span className="absolute inset-0 font-mono text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-red-400 opacity-80 pointer-events-none"
            style={{ animation: 'glitch-1 0.35s steps(1) forwards' }}>{text}</span>
          <span className="absolute inset-0 font-mono text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-cyan-400 opacity-80 pointer-events-none"
            style={{ animation: 'glitch-2 0.35s steps(1) forwards' }}>{text}</span>
        </>
      )}
    </div>
  )
}

const GitHubIcon   = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
const LinkedInIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
const DownloadIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.14, delayChildren: 0.5 } } }
const rowAnim = { hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0, transition: { duration: 0.3 } } }

export default function Hero() {
  const { t } = useTranslation()
  const h = t.hero

  return (
    <section id="hero" className="relative min-h-screen grid-bg flex flex-col justify-center pt-20 pb-16 px-6 overflow-hidden">
      <MatrixRain opacity={0.15} />
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 40% 55%, rgba(63,185,80,0.07) 0%, transparent 70%)' }} />

      <div className="relative max-w-5xl mx-auto w-full flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

        {/* LEFT: Terminal */}
        <motion.div className="flex-1 min-w-0 w-full"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        >
          <div className="rounded-lg overflow-hidden border border-border"
            style={{ boxShadow: '0 0 0 1px rgba(63,185,80,0.08), 0 20px 60px rgba(0,0,0,0.5)' }}
          >
            {/* Chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-surface2 border-b border-border">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-accent/80" />
              <span className="ml-3 font-mono text-xs text-muted">operator@sk-portfolio <span className="text-accent">~</span>/profile</span>
            </div>
            {/* Body */}
            <div className="bg-bg/80 backdrop-blur-sm px-6 py-6 space-y-1">
              <motion.p className="font-mono text-sm text-muted mb-4"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              >
                <span className="text-accent">$</span> <span className="text-heading">./identify</span> <span className="text-cyan">--target</span> <span className="text-muted">seif_koubaa --verbose</span>
              </motion.p>

              <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-2">
                {h.rows.map(({ key, value }) => (
                  <motion.div key={key} variants={rowAnim} className="flex items-baseline gap-3 font-mono text-sm">
                    <span className="text-muted w-24 shrink-0 text-xs">{key}</span>
                    <span className="text-border">·····</span>
                    {value === null ? (
                      <GlitchName text={profile.name} />
                    ) : value?.startsWith('●') ? (
                      <span className="text-accent font-semibold">{value}</span>
                    ) : key === 'FOCUS' ? (
                      <span className="text-cyan text-xs">{value}</span>
                    ) : (
                      <span className="text-heading">{value}</span>
                    )}
                  </motion.div>
                ))}
              </motion.div>

              <motion.p className="font-mono text-sm text-muted mt-5"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
              >
                <span className="text-accent">$</span> <span className="inline-block w-2 h-4 bg-accent align-middle animate-pulse" />
              </motion.p>
            </div>
          </div>

          {/* Bio */}
          <motion.p className="text-text text-sm leading-relaxed mt-4 max-w-lg"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }}
          >{h.bio}</motion.p>

          {/* CTAs */}
          <motion.div className="flex flex-wrap gap-3 mt-5"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.3 }}
          >
            {[
              { href: profile.github,  label: 'GitHub',   icon: <GitHubIcon />,   style: 'hover:border-accent hover:text-accent' },
              { href: profile.linkedin, label: 'LinkedIn', icon: <LinkedInIcon />, style: 'hover:border-cyan hover:text-cyan' },
            ].map(({ href, label, icon, style }) => (
              <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-4 py-2 bg-surface2 border border-border text-muted text-sm font-mono rounded transition-all duration-200 ${style}`}
              >{icon} {label}</a>
            ))}
            <a href={h.resumeFile} download={h.resumeDL}
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/40 text-accent text-sm font-mono rounded hover:bg-accent/20 transition-all"
            ><DownloadIcon /> {h.resumeBtn}</a>
          </motion.div>
        </motion.div>

        {/* RIGHT: Photo */}
        <motion.div className="shrink-0 flex flex-col items-center gap-4"
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="relative p-3">
            <div className="corner-bracket relative p-1">
              <span />
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 overflow-hidden"
                style={{ boxShadow: '0 0 30px rgba(63,185,80,0.18)' }}
              >
                <img src={heroImg} alt="Seif eddine Koubaa" className="w-full h-full object-cover grayscale-[20%]" />
                <div className="scan-line" />
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(180deg, rgba(63,185,80,0.05) 0%, transparent 50%, rgba(63,185,80,0.08) 100%)' }} />
              </div>
            </div>
            <span className="absolute -top-1 -right-1 font-mono text-[10px] text-accent/60 bg-bg border border-accent/20 px-1.5 py-0.5 rounded">ID:SK_2026</span>
            <span className="absolute -bottom-1 -left-1 font-mono text-[10px] text-muted bg-bg border border-border px-1.5 py-0.5 rounded">0x4B4F55424141</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-muted border border-border rounded-full px-3 py-1.5 bg-surface">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            {h.openTo}
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            {h.stats.map(({ n, label }) => (
              <div key={n} className="border border-border rounded px-3 py-2 bg-surface/60">
                <p className="font-mono text-base font-bold text-accent">{n}</p>
                <p className="font-mono text-[10px] text-muted whitespace-pre-line leading-tight mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.2 }}
      >
        <span className="text-xs font-mono text-muted">scroll</span>
        <span className="w-px h-8 bg-gradient-to-b from-muted to-transparent" />
      </motion.div>
    </section>
  )
}
