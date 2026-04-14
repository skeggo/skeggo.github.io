import { useEffect, useRef } from 'react'

// Katakana + latin + numbers — classic Matrix charset
const CHARS =
  'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン' +
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&'

const FONT_SIZE = 14
const INTERVAL  = 42   // ~24 fps — matches the film pacing

export default function MatrixRain({ opacity = 0.15 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let drops: number[] = []
    let animId: number
    let lastTime = 0

    const init = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      const cols = Math.floor(canvas.width / FONT_SIZE)
      // Stagger starting positions so it doesn't all drop at once
      drops = Array.from({ length: cols }, () => Math.random() * -60)
    }

    init()
    window.addEventListener('resize', init)

    const draw = (ts: number) => {
      animId = requestAnimationFrame(draw)
      if (ts - lastTime < INTERVAL) return
      lastTime = ts

      // Semi-transparent overlay — controls trail length
      ctx.fillStyle = 'rgba(7, 11, 14, 0.055)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${FONT_SIZE}px monospace`

      drops.forEach((y, i) => {
        const x    = i * FONT_SIZE
        const char = CHARS[Math.floor(Math.random() * CHARS.length)]

        // Bright white-green head
        ctx.fillStyle = '#e0ffe8'
        ctx.fillText(char, x, y * FONT_SIZE)

        // One step behind — vivid green
        if (y > 1) {
          ctx.fillStyle = '#3fb950'
          ctx.fillText(
            CHARS[Math.floor(Math.random() * CHARS.length)],
            x,
            (y - 1) * FONT_SIZE,
          )
        }

        // Reset column when off-screen (randomised so columns don't sync)
        if (y * FONT_SIZE > canvas.height && Math.random() > 0.974) {
          drops[i] = 0
        }

        // Each column falls at a slightly different speed
        drops[i] += 0.4 + Math.random() * 0.6
      })
    }

    animId = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', init)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity }}
    />
  )
}
