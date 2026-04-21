import { useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data'
import MatrixRain from '../components/MatrixRain'
import TerminalWindow from '../components/TerminalWindow'
import { useTranslation } from '../contexts/LanguageContext'

const FORMSPREE_ID = 'mrerawgj'

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
  const { t } = useTranslation()
  const c = t.contact

  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [message, setMessage] = useState('')
  const [status,  setStatus]  = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      if (res.ok) {
        setStatus('success')
        setName(''); setEmail(''); setMessage('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full bg-bg border border-border rounded px-3 py-2 font-mono text-sm text-heading placeholder-muted/50 focus:outline-none focus:border-accent/60 transition-colors'

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
            <span className="text-accent">$</span> {c.cmd.slice(2)}
          </p>
          <h2 className="font-mono text-3xl font-bold text-heading">{c.title}</h2>
          <div className="section-line mt-3" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* LEFT: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.1 }}
          >
            <TerminalWindow title="sk@portfolio · ./send_message.sh">
              <div className="px-5 py-5 space-y-4">
                <p className="font-mono text-xs text-muted">
                  <span className="text-accent">$</span>{' '}
                  <span className="text-heading">{c.formCmd.slice(2)}</span>
                </p>
                <div className="border-t border-border" />

                {status === 'success' ? (
                  <motion.div className="py-6 text-center space-y-3"
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  >
                    <p className="font-mono text-sm text-accent">{c.successMsg}</p>
                    <p className="font-mono text-xs text-muted">
                      <span className="text-accent">$</span>{' '}
                      <span className="inline-block w-2 h-3.5 bg-accent align-middle animate-pulse" />
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="font-mono text-[11px] text-muted block mb-1">
                        <span className="text-accent">&gt;</span> {c.nameLbl}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={c.namePh}
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[11px] text-muted block mb-1">
                        <span className="text-accent">&gt;</span> {c.emailLbl}
                      </label>
                      <input
                        type="email"
                        required
                        placeholder={c.emailPh}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[11px] text-muted block mb-1">
                        <span className="text-accent">&gt;</span> {c.msgLbl}
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder={c.msgPh}
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    {status === 'error' && (
                      <p className="font-mono text-xs text-red-400">{c.errorMsg}</p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full font-mono text-sm px-4 py-2.5 bg-accent/10 border border-accent/40 text-accent rounded hover:bg-accent/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === 'sending' ? c.sending : c.sendBtn}
                    </button>
                  </form>
                )}
              </div>
            </TerminalWindow>
          </motion.div>

          {/* RIGHT: info + ping */}
          <div className="space-y-5">
            {/* Info card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.15 }}
            >
              <TerminalWindow title="sk@portfolio · ./message.txt">
                <div className="px-5 py-5 space-y-4">
                  <p className="font-mono text-xs text-muted">
                    <span className="text-accent">$</span>{' '}
                    <span className="text-heading">cat</span>{' '}
                    <span className="text-cyan">message.txt</span>
                  </p>
                  <div className="border-t border-border" />
                  <div className="space-y-1 font-mono text-xs">
                    <p>
                      <span className="text-muted">{c.locationLbl}</span>
                      <span className="text-border mx-2">···</span>
                      <span className="text-heading">{profile.location}</span>
                    </p>
                    <p>
                      <span className="text-muted">{c.phoneLbl}</span>
                      <span className="text-border mx-2">···</span>
                      <span className="text-heading">{profile.phone}</span>
                    </p>
                    <p>
                      <span className="text-muted">{c.statusLbl}</span>
                      <span className="text-border mx-2">···</span>
                      <span className="text-accent">{c.available}</span>
                    </p>
                  </div>
                  <p className="font-mono text-xs text-muted">
                    <span className="text-accent">$</span>{' '}
                    <span className="inline-block w-2 h-3.5 bg-accent align-middle animate-pulse" />
                  </p>
                </div>
              </TerminalWindow>
            </motion.div>

            {/* Ping card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.25 }}
            >
              <TerminalWindow title="sk@portfolio · ./network/ping">
                <div className="px-5 py-5 space-y-4">
                  <p className="font-mono text-xs text-muted">
                    <span className="text-accent">$</span>{' '}
                    <span className="text-heading">ping</span>{' '}
                    <span className="text-cyan">--all-endpoints</span>
                  </p>
                  <div className="border-t border-border" />

                  <div className="grid grid-cols-3 font-mono text-[10px] text-muted pb-1 border-b border-border">
                    <span>{c.colEndpoint}</span>
                    <span className="text-center">{c.colProto}</span>
                    <span className="text-right">{c.colStatus}</span>
                  </div>

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
                            {c.onlineLbl}
                          </span>
                          <p className="text-[10px] text-muted">{latency}</p>
                        </div>
                      </motion.a>
                    ))}
                  </motion.div>

                  <div className="border-t border-border pt-3 space-y-1">
                    <p className="font-mono text-xs text-accent">{c.allOk}</p>
                    <p className="font-mono text-xs text-accent">{c.established}</p>
                    <p className="font-mono text-xs text-muted mt-2">
                      <span className="text-accent">&gt;</span> {c.transmit}{' '}
                      <span className="inline-block w-2 h-3.5 bg-accent align-middle animate-pulse" />
                    </p>
                  </div>
                </div>
              </TerminalWindow>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <motion.div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
        >
          <span className="font-mono text-xs text-muted">
            <span className="text-accent">Seif eddine Koubaa</span>
          </span>
        </motion.div>
      </div>
    </section>
  )
}
