import { motion } from 'framer-motion'
import { hackathonWins, type HackathonWin } from '../data'
import MatrixRain from '../components/MatrixRain'
import TerminalWindow from '../components/TerminalWindow'

const placeStyle: Record<string, { badge: string; label: string; glow: string }> = {
  '1st': { badge: 'text-gold  border-gold/40  bg-gold/10',   label: '1ST PLACE', glow: 'rgba(227,179,65,0.10)' },
  '2nd': { badge: 'text-cyan  border-cyan/40  bg-cyan/10',   label: '2ND PLACE', glow: 'rgba(121,192,255,0.10)' },
  '3rd': { badge: 'text-bronze border-bronze/40 bg-bronze/10', label: '3RD PLACE', glow: 'rgba(176,128,96,0.10)' },
}
const trophy: Record<string, string> = { '1st': '🏆', '2nd': '🥈', '3rd': '🥉' }

function WinCard({ win, index }: { win: HackathonWin; index: number }) {
  const s = placeStyle[win.place]
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: index * 0.12 }}
      whileHover={{ y: -3 }}
    >
      <TerminalWindow
        title={`sk@portfolio · ./missions/${win.event.toLowerCase().replace(/\s+/g, '-')}`}
        className="h-full"
      >
        <div className="px-5 py-4 flex flex-col gap-3"
          style={{ boxShadow: `inset 0 0 40px ${s.glow}` }}
        >
          {/* Command */}
          <p className="font-mono text-xs text-muted">
            <span className="text-accent">$</span>{' '}
            <span className="text-heading">cat</span>{' '}
            <span className="text-cyan">mission_brief.txt</span>
          </p>

          <div className="border-t border-border" />

          {/* Classification + date */}
          <div className="flex items-center justify-between gap-3">
            <span className={`font-mono text-xs font-semibold px-2.5 py-1 rounded border ${s.badge}`}>
              {trophy[win.place]} CLASSIFICATION: {s.label}
            </span>
            <span className="font-mono text-xs text-muted shrink-0">{win.date}</span>
          </div>

          {/* Mission data */}
          <div className="space-y-1.5">
            {[
              { key: 'OPERATION', val: win.event },
              { key: 'ORG',       val: win.org },
              { key: 'PROJECT',   val: win.project },
            ].map(({ key, val }) => (
              <div key={key} className="flex items-baseline gap-3 font-mono text-sm">
                <span className="text-muted text-xs w-20 shrink-0">{key}</span>
                <span className="text-border">···</span>
                <span className={key === 'PROJECT' ? 'text-accent' : 'text-heading'}>{val}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-border" />

          {/* Mission summary */}
          <div>
            <p className="font-mono text-[11px] text-muted mb-2">
              <span className="text-accent">&gt;</span> MISSION SUMMARY
            </p>
            <p className="text-sm text-text leading-relaxed">{win.description}</p>
          </div>

          {/* Tools */}
          <div>
            <p className="font-mono text-[11px] text-muted mb-2">
              <span className="text-accent">TOOLS_USED</span> ──────────────
            </p>
            <div className="flex flex-wrap gap-1.5">
              {win.tags.map(tag => (
                <span key={tag}
                  className="font-mono text-[11px] px-2 py-0.5 bg-surface2 border border-border text-muted rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2 font-mono text-xs text-accent mt-1">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            MISSION STATUS: SUCCESS
          </div>
        </div>
      </TerminalWindow>
    </motion.div>
  )
}

export default function Hackathons() {
  return (
    <section id="hackathons" className="relative overflow-hidden py-24 px-6 bg-surface/30">
      <MatrixRain opacity={0.03} />

      <div className="relative max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div className="mb-12"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.4 }}
        >
          <p className="font-mono text-xs text-muted mb-1">
            <span className="text-accent">$</span> grep -i &quot;victory\|podium&quot; ./mission_log.txt
          </p>
          <h2 className="font-mono text-3xl font-bold text-heading">Hackathon Wins</h2>
          <div className="section-line mt-3" />
          <p className="font-mono text-xs text-muted mt-3">
            <span className="text-accent">3</span> matches found &nbsp;·&nbsp;
            <span className="text-gold">2×</span> first place &nbsp;·&nbsp;
            <span className="text-bronze">1×</span> third place
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {hackathonWins.map((win, i) => (
            <WinCard key={win.event} win={win} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
