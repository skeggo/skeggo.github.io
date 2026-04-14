import { motion } from 'framer-motion'
import { profile } from '../data'
import MatrixRain from '../components/MatrixRain'
import TerminalWindow from '../components/TerminalWindow'

const endpoints = [
  {
    label: 'GitHub',
    address: 'github.com/Skeggo',
    href: profile.github,
    proto: 'SSH/HTTPS',
    latency: '12ms',
    color: 'hover:text-accent',
  },
  {
    label: 'LinkedIn',
    address: 'linkedin.com/in/seif-koubaa',
    href: profile.linkedin,
    proto: 'HTTPS',
    latency: '8ms',
    color: 'hover:text-cyan',
  },
  {
    label: 'Email',
    address: profile.email,
    href: `mailto:${profile.email}`,
    proto: 'SMTP',
    latency: '<1ms',
    color: 'hover:text-gold',
  },
]

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
}
const row = {
  hidden:  { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
}

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-24 px-6 bg-surface/30">
      <MatrixRain opacity={0.03} />

      <div className="relative max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div className="mb-12"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.4 }}
        >
          <p className="font-mono text-xs text-muted mb-1">
            <span className="text-accent">$</span> ./connect.sh --target seif_koubaa --all-endpoints
          </p>
          <h2 className="font-mono text-3xl font-bold text-heading">Get In Touch</h2>
          <div className="section-line mt-3" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

          {/* Left: message terminal */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <TerminalWindow title="sk@portfolio · ./message.txt">
              <div className="px-5 py-5 space-y-4">
                <p className="font-mono text-xs text-muted">
                  <span className="text-accent">$</span>{' '}
                  <span className="text-heading">cat</span>{' '}
                  <span className="text-cyan">message.txt</span>
                </p>
                <div className="border-t border-border" />
                <p className="text-text text-sm leading-relaxed">
                  I&apos;m actively looking for opportunities in cybersecurity, AI, and full-stack engineering.
                  Whether it&apos;s an internship, a project collaboration, or just a conversation — my inbox is always open.
                </p>
                <div className="border-t border-border" />
                <div className="space-y-1 font-mono text-xs">
                  <p><span className="text-muted">LOCATION</span> <span className="text-border mx-2">···</span><span className="text-heading">{profile.location}</span></p>
                  <p><span className="text-muted">PHONE   </span> <span className="text-border mx-2">···</span><span className="text-heading">{profile.phone}</span></p>
                  <p><span className="text-muted">STATUS  </span> <span className="text-border mx-2">···</span><span className="text-accent">● AVAILABLE</span></p>
                </div>
                <p className="font-mono text-xs text-muted">
                  <span className="text-accent">$</span>{' '}
                  <span className="inline-block w-2 h-3.5 bg-accent align-middle animate-pulse" />
                </p>
              </div>
            </TerminalWindow>
          </motion.div>

          {/* Right: ping interface */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.2 }}
          >
            <TerminalWindow title="sk@portfolio · ./network/ping">
              <div className="px-5 py-5 space-y-4">
                <p className="font-mono text-xs text-muted">
                  <span className="text-accent">$</span>{' '}
                  <span className="text-heading">ping</span>{' '}
                  <span className="text-cyan">--all-endpoints</span>{' '}
                  <span className="text-muted">seif_koubaa</span>
                </p>

                <div className="border-t border-border" />

                {/* Table header */}
                <div className="grid grid-cols-3 font-mono text-[10px] text-muted pb-1 border-b border-border">
                  <span>ENDPOINT</span>
                  <span className="text-center">PROTO</span>
                  <span className="text-right">STATUS</span>
                </div>

                {/* Endpoint rows */}
                <motion.div className="space-y-3" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  {endpoints.map(({ label, address, href, proto, latency, color }) => (
                    <motion.a key={label} href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      variants={row}
                      className={`group grid grid-cols-3 items-center font-mono text-xs gap-2 py-2 border-b border-border/40 text-muted transition-colors ${color}`}
                    >
                      <div className="min-w-0">
                        <p className="text-heading text-[11px] font-semibold group-hover:text-current transition-colors truncate">{label}</p>
                        <p className="text-[10px] text-muted truncate">{address}</p>
                      </div>
                      <p className="text-center text-[10px]">{proto}</p>
                      <div className="text-right">
                        <span className="inline-flex items-center gap-1 text-[10px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                          ONLINE
                        </span>
                        <p className="text-[10px] text-muted">{latency}</p>
                      </div>
                    </motion.a>
                  ))}
                </motion.div>

                <div className="border-t border-border pt-3 space-y-1">
                  <p className="font-mono text-xs text-accent">
                    [3/3 endpoints reachable]
                  </p>
                  <p className="font-mono text-xs text-accent">
                    [CONNECTION ESTABLISHED]
                  </p>
                  <p className="font-mono text-xs text-muted mt-2">
                    <span className="text-accent">&gt;</span> Send transmission?{' '}
                    <span className="text-heading">[Y/n]</span>:{' '}
                    <span className="inline-block w-2 h-3.5 bg-accent align-middle animate-pulse" />
                  </p>
                </div>
              </div>
            </TerminalWindow>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
        >
          <span className="font-mono text-xs text-muted">
            <span className="text-accent">Seif eddine Koubaa</span> · {new Date().getFullYear()}
          </span>
        </motion.div>
      </div>
    </section>
  )
}
