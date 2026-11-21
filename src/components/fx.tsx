import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform, animate } from 'framer-motion'

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ---------- Neural network particle canvas that reacts to the mouse ---------- */
export function NeuralCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    let w = 0, h = 0, raf = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const mouse = { x: -9999, y: -9999 }
    type P = { x: number; y: number; vx: number; vy: number; r: number }
    let pts: P[] = []

    const resize = () => {
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(110, Math.floor((w * h) / 13000))
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
      }))
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999 }

    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      const LINK = 130
      for (const p of pts) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y
        const d = Math.hypot(dx, dy)
        if (d < 160 && d > 0) {
          p.vx += (dx / d) * 0.04
          p.vy += (dy / d) * 0.04
        }
        p.vx *= 0.985; p.vy *= 0.985
        if (Math.abs(p.vx) < 0.08) p.vx += (Math.random() - 0.5) * 0.05
        if (Math.abs(p.vy) < 0.08) p.vy += (Math.random() - 0.5) * 0.05
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
      }
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i]
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < LINK) {
            const t = 1 - d / LINK
            const g = ctx.createLinearGradient(a.x, a.y, b.x, b.y)
            g.addColorStop(0, `rgba(139,92,246,${t * 0.45})`)
            g.addColorStop(1, `rgba(34,211,238,${t * 0.45})`)
            ctx.strokeStyle = g
            ctx.lineWidth = t * 1.1
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
          }
        }
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y)
        if (md < 200) {
          ctx.strokeStyle = `rgba(244,114,182,${(1 - md / 200) * 0.5})`
          ctx.lineWidth = 0.8
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke()
        }
        ctx.fillStyle = md < 200 ? '#f9a8d4' : 'rgba(196,181,253,0.85)'
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove)
    document.addEventListener('pointerleave', onLeave)
    if (reduced()) { tick(); cancelAnimationFrame(raf) } else tick()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />
}

/* ---------- Custom cursor: dot + lagging ring that grows over interactive elements ---------- */
export function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.5 })
  const ry = useSpring(y, { stiffness: 350, damping: 30, mass: 0.5 })
  const [hover, setHover] = useState(false)
  const [down, setDown] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    setEnabled(true)
    document.body.classList.add('has-cursor')
    const move = (e: PointerEvent) => {
      x.set(e.clientX); y.set(e.clientY)
      const t = e.target as HTMLElement
      setHover(!!t.closest('a, button, [data-cursor], input, textarea'))
    }
    const dn = () => setDown(true)
    const up = () => setDown(false)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerdown', dn)
    window.addEventListener('pointerup', up)
    return () => {
      document.body.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', dn)
      window.removeEventListener('pointerup', up)
    }
  }, [x, y])

  if (!enabled) return null
  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
        style={{ x, y }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-300/60 mix-blend-difference"
        style={{ x: rx, y: ry }}
        animate={{ width: hover ? 56 : 34, height: hover ? 56 : 34, scale: down ? 0.8 : 1, backgroundColor: hover ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      />
    </>
  )
}

/* ---------- Magnetic wrapper ---------- */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(0, { stiffness: 200, damping: 15 })
  const y = useSpring(0, { stiffness: 200, damping: 15 })
  const move = (e: MouseEvent) => {
    const r = ref.current!.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const leave = () => { x.set(0); y.set(0) }
  return (
    <motion.div ref={ref} onMouseMove={move} onMouseLeave={leave} style={{ x, y }} className="inline-block">
      {children}
    </motion.div>
  )
}

/* ---------- Spotlight: sets --mx/--my on the element for the CSS glow ---------- */
export function spotlightMove(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - r.left}px`)
  el.style.setProperty('--my', `${e.clientY - r.top}px`)
}

/* ---------- 3D tilt card ---------- */
export function Tilt({ children, className = '' }: { children: ReactNode; className?: string }) {
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rotX = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 200, damping: 20 })
  const rotY = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 200, damping: 20 })
  const move = (e: MouseEvent<HTMLDivElement>) => {
    spotlightMove(e)
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  const leave = () => { mx.set(0.5); my.set(0.5) }
  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.div
        onMouseMove={move}
        onMouseLeave={leave}
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
        className={`spotlight h-full ${className}`}
      >
        {children}
      </motion.div>
    </div>
  )
}

/* ---------- Typewriter cycling through phrases ---------- */
export function Typewriter({ words }: { words: string[] }) {
  const [i, setI] = useState(0)
  const [text, setText] = useState('')
  const [del, setDel] = useState(false)
  useEffect(() => {
    const word = words[i % words.length]
    const speed = del ? 28 : 55
    const t = setTimeout(() => {
      if (!del && text === word) { setTimeout(() => setDel(true), 1400); return }
      if (del && text === '') { setDel(false); setI(i + 1); return }
      setText(del ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1))
    }, !del && text === word ? 0 : speed)
    return () => clearTimeout(t)
  }, [text, del, i, words])
  return <span className="caret">{text}</span>
}

/* ---------- Count-up number when in view ---------- */
export function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.6, ease: 'easeOut', onUpdate: (v) => setVal(Math.round(v)) })
    return () => c.stop()
  }, [inView, to])
  return <span ref={ref}>{val}{suffix}</span>
}

/* ---------- Reveal on scroll ---------- */
export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SectionTitle({ kicker, title, sub }: { kicker: string; title: ReactNode; sub?: string }) {
  return (
    <Reveal className="mb-14 max-w-2xl">
      <p className="mb-3 font-mono text-sm text-cyan-300/90">
        <span className="text-violet-400">//</span> {kicker}
      </p>
      <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-lg text-zinc-400">{sub}</p>}
    </Reveal>
  )
}

export function Github({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  )
}
