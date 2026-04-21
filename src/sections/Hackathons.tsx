import { motion } from 'framer-motion'
import { hackathonWins, type HackathonWin } from '../data'
import MatrixRain from '../components/MatrixRain'
import TerminalWindow from '../components/TerminalWindow'
import { useTranslation } from '../contexts/LanguageContext'

const placeStyle: Record<string, { badge: string; border: string; glow: string }> = {
  '1st': { badge: 'text-gold   border-gold/40   bg-gold/10',   border: 'border-gold/20',   glow: 'rgba(227,179,65,0.10)' },
  '2nd': { badge: 'text-cyan   border-cyan/40   bg-cyan/10',   border: 'border-cyan/20',   glow: 'rgba(121,192,255,0.10)' },
  '3rd': { badge: 'text-bronze border-bronze/40 bg-bronze/10', border: 'border-bronze/20', glow: 'rgba(176,128,96,0.10)' },
}
const trophy: Record<string, string> = { '1st': '🏆', '2nd': '🥈', '3rd': '🥉' }

function WinCard({ win, index }: { win: HackathonWin; index: number }) {
  const { t, lang } = useTranslation()
  const h = t.hackathons
  const s = placeStyle[win.place]

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: index * 0.12 }}
      whileHover={{ y: -3 }}
    >
      <TerminalWindow title={`sk@portfolio · ./missions/${win.event.toLowerCase().replace(/\s+/g, '-')}`} className="h-full">
        <div className="px-5 py-4 flex flex-col gap-3" style={{ boxShadow: `inset 0 0 40px ${s.glow}` }}>
          <p className="font-mono text-xs text-muted">
            <span className="text-accent">$</span> <span className="text-heading">cat</span> <span className="text-cyan">mission_brief.txt</span>
          </p>
          <div className="border-t border-border" />
          <div className="flex items-center justify-between gap-3">
            <span className={`font-mono text-xs font-semibold px-2.5 py-1 rounded border ${s.badge}`}>
              {trophy[win.place]} {h.place[win.place]}
            </span>
            <span className="font-mono text-xs text-muted shrink-0">{win.date}</span>
          </div>
          <div className="space-y-1.5">
            {[
              { key: h.opKey,      val: win.event },
              { key: h.orgKey,     val: win.org },
              { key: h.projectKey, val: win.project },
            ].map(({ key, val }) => (
              <div key={key} className="flex items-baseline gap-3 font-mono text-sm">
                <span className="text-muted text-xs w-24 shrink-0">{key}</span>
                <span className="text-border">···</span>
                <span className={key === h.projectKey ? 'text-accent' : 'text-heading'}>{val}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-border" />
          <div>
            <p className="font-mono text-[11px] text-muted mb-2"><span className="text-accent">&gt;</span> {h.summaryLbl.slice(2)}</p>
            <p className="text-sm text-text leading-relaxed">{lang === 'fr' ? win.descriptionFr : win.description}</p>
          </div>
          <div>
            <p className="font-mono text-[11px] text-muted mb-2"><span className="text-accent">{h.toolsLbl}</span> ──────────</p>
            <div className="flex flex-wrap gap-1.5">
              {win.tags.map(tag => (
                <span key={tag} className="font-mono text-[11px] px-2 py-0.5 bg-surface2 border border-border text-muted rounded">{tag}</span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-accent mt-1">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />{h.successLbl}
          </div>
        </div>
      </TerminalWindow>
    </motion.div>
  )
}

export default function Hackathons() {
  const { t } = useTranslation()
  const h = t.hackathons

  return (
    <section id="hackathons" className="relative overflow-hidden py-24 px-6 bg-surface/30">
      <MatrixRain opacity={0.03} />
      <div className="relative max-w-5xl mx-auto">
        <motion.div className="mb-12"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.4 }}
        >
          <p className="font-mono text-xs text-muted mb-1">
            <span className="text-accent">$</span> {h.cmd.slice(2)}
          </p>
          <h2 className="font-mono text-3xl font-bold text-heading">{h.title}</h2>
          <div className="section-line mt-3" />
          <p className="font-mono text-xs text-muted mt-3">{h.stats}</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {hackathonWins.map((win, i) => <WinCard key={win.event} win={win} index={i} />)}
        </div>
      </div>
    </section>
  )
}
