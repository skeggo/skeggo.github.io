import type { ReactNode } from 'react'

interface Props {
  title: string
  children: ReactNode
  className?: string
}

export default function TerminalWindow({ title, children, className = '' }: Props) {
  return (
    <div
      className={`rounded-lg overflow-hidden border border-border bg-bg/80 ${className}`}
      style={{ boxShadow: '0 0 0 1px rgba(63,185,80,0.06), 0 16px 40px rgba(0,0,0,0.4)' }}
    >
      {/* Chrome */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-surface2 border-b border-border">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-accent/70" />
        <span className="ml-3 font-mono text-xs text-muted truncate">{title}</span>
      </div>
      <div className="bg-bg/80 backdrop-blur-sm">{children}</div>
    </div>
  )
}
