import { motion } from 'framer-motion'
import { skillGroups } from '../data'
import MatrixRain from '../components/MatrixRain'
import TerminalWindow from '../components/TerminalWindow'
import { useTranslation } from '../contexts/LanguageContext'

const moduleColor: Record<string, { key: string; tag: string }> = {
  'Cybersecurity': { key: 'text-accent', tag: 'hover:border-accent/50 hover:text-accent hover:bg-accent/5' },
  'Full-Stack':    { key: 'text-cyan',   tag: 'hover:border-cyan/50   hover:text-cyan   hover:bg-cyan/5' },
  'AI & Data':     { key: 'text-gold',   tag: 'hover:border-gold/50   hover:text-gold   hover:bg-gold/5' },
  'Programming':   { key: 'text-bronze', tag: 'hover:border-bronze/50 hover:text-bronze hover:bg-bronze/5' },
}
const moduleKey: Record<string, string> = {
  'Cybersecurity': 'cybersecurity.mod',
  'Full-Stack':    'fullstack.mod',
  'AI & Data':     'ai_data.mod',
  'Programming':   'programming.mod',
}

export default function Skills() {
  const { t } = useTranslation()
  const s = t.skills

  return (
    <section id="skills" className="relative overflow-hidden py-24 px-6">
      <MatrixRain opacity={0.03} />
      <div className="relative max-w-5xl mx-auto">
        <motion.div className="mb-12"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.4 }}
        >
          <p className="font-mono text-xs text-muted mb-1">
            <span className="text-accent">$</span> {s.cmd.slice(2)}
          </p>
          <h2 className="font-mono text-3xl font-bold text-heading">{s.title}</h2>
          <div className="section-line mt-3" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5 }}
        >
          <TerminalWindow title="sk@portfolio · ~/.skills.conf">
            <div className="px-6 py-5 space-y-6">
              <p className="font-mono text-xs text-muted">
                <span className="text-accent">$</span> <span className="text-heading">{s.verboseCmd.slice(2)}</span>
              </p>

              {skillGroups.map((group, gi) => {
                const c = moduleColor[group.category]
                const dots = '·'.repeat(Math.max(4, 28 - moduleKey[group.category].length))
                return (
                  <motion.div key={group.category}
                    initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.35, delay: gi * 0.1 }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-xs text-muted">{s.loading}</span>
                      <span className={`font-mono text-xs font-semibold ${c.key}`}>{moduleKey[group.category]}</span>
                      <span className="font-mono text-xs text-muted flex-1">{dots}</span>
                      <span className="font-mono text-xs text-accent">{s.allLoaded.includes('CHARGÉS') ? 'OK' : 'OK'}</span>
                    </div>
                    <div className="pl-4 border-l border-border ml-2">
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((skill, si) => (
                          <motion.span key={skill}
                            className={`font-mono text-xs px-2.5 py-1 bg-surface2 border border-border text-muted rounded cursor-default transition-all duration-200 ${c.tag}`}
                            initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }} transition={{ duration: 0.2, delay: gi * 0.1 + si * 0.04 }}
                          >{skill}</motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )
              })}

              <motion.div className="border-t border-border pt-4 space-y-1"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }} transition={{ delay: 0.5 }}
              >
                <p className="font-mono text-xs text-accent">{s.allLoaded} {skillGroups.length}/{skillGroups.length} ✓</p>
                <p className="font-mono text-xs text-muted">
                  {s.langLbl} <span className="text-heading">English</span>
                  <span className="text-border mx-2">·</span>
                  <span className="text-heading">Français</span>
                  <span className="text-muted ml-2">{s.langNote}</span>
                </p>
                <p className="font-mono text-xs text-muted mt-2">
                  <span className="text-accent">$</span> <span className="inline-block w-2 h-3.5 bg-accent align-middle animate-pulse" />
                </p>
              </motion.div>
            </div>
          </TerminalWindow>
        </motion.div>
      </div>
    </section>
  )
}
