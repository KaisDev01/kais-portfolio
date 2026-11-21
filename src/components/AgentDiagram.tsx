import { motion } from 'framer-motion'
import { Mic, Brain, Search, Users, LifeBuoy, Database, Plug } from 'lucide-react'

// Animated architecture of El-Las: voice → orchestrator → agents → MCP / RAG
const agents = [
  { label: 'Search', icon: Search, x: 18 },
  { label: 'Matching', icon: Users, x: 50 },
  { label: 'Support', icon: LifeBuoy, x: 82 },
]

// map 0-100 percentage coords onto the 160x110 viewBox so dots stay round
const p = (d: string) => { let k = 0; return d.replace(/-?[\d.]+/g, (n) => String(+n * (k++ % 2 === 0 ? 1.6 : 1.1))) }

function Node({ icon: Icon, label, sub, className = '' }: { icon: typeof Mic; label: string; sub?: string; className?: string }) {
  return (
    <div className={`flex items-center gap-2 rounded-xl border border-white/10 bg-[#11111f]/90 px-2 py-1.5 shadow-lg sm:px-3 sm:py-2 backdrop-blur ${className}`}>
      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg sm:h-8 sm:w-8 bg-gradient-to-br from-violet-500/30 to-cyan-400/20 text-cyan-200">
        <Icon size={14} />
      </span>
      <div className="leading-tight">
        <p className="whitespace-nowrap text-[11px] font-semibold text-white sm:text-sm">{label}</p>
        {sub && <p className="hidden whitespace-nowrap font-mono text-[10px] text-zinc-500 sm:block">{sub}</p>}
      </div>
    </div>
  )
}

function Pulse({ d, delay = 0, color = '#22d3ee' }: { d: string; delay?: number; color?: string }) {
  return (
    <>
      <path d={d} stroke="rgba(255,255,255,0.12)" strokeWidth="0.4" fill="none" strokeDasharray="1 1.2" vectorEffect="non-scaling-stroke" />
      <circle r="1.1" fill={color}>
        <animateMotion dur="2.4s" begin={`${delay}s`} repeatCount="indefinite" path={d} />
      </circle>
    </>
  )
}

export default function AgentDiagram() {
  return (
    <div className="relative mx-auto aspect-[16/11] w-full max-w-xl">
      <svg viewBox="0 0 160 110" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
        <Pulse d={p("M50 12 L50 36")} />
        {agents.map((a, i) => (
          <Pulse key={a.label} d={p(`M50 44 C50 52, ${a.x} 52, ${a.x} 60`)} delay={0.4 + i * 0.3} color="#a78bfa" />
        ))}
        {agents.map((a, i) => (
          <Pulse key={a.label + 't'} d={p(`M${a.x} 68 C${a.x} 76, ${i === 0 ? 30 : 70} 78, ${i === 0 ? 30 : 70} 86`)} delay={1 + i * 0.25} color="#f472b6" />
        ))}
      </svg>

      <motion.div className="absolute left-1/2 top-[2%] -translate-x-1/2" initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <Node icon={Mic} label="Voice request" sub="Whisper" />
      </motion.div>

      <motion.div className="absolute left-1/2 top-[33%] -translate-x-1/2" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
        <div className="relative">
          <span className="absolute inset-0 -z-10 animate-ping rounded-xl bg-violet-500/20" />
          <Node icon={Brain} label="Orchestrator" sub="Semantic Kernel" className="border-violet-400/40" />
        </div>
      </motion.div>

      {agents.map((a, i) => (
        <motion.div key={a.label} className="absolute top-[57%] -translate-x-1/2" style={{ left: `${a.x}%` }} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.35 + i * 0.1 }}>
          <Node icon={a.icon} label={a.label} />
        </motion.div>
      ))}

      <motion.div className="absolute left-[30%] top-[84%] -translate-x-1/2" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.7 }}>
        <Node icon={Plug} label="MCP servers" sub="listings · bookings" />
      </motion.div>
      <motion.div className="absolute left-[70%] top-[84%] -translate-x-1/2" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8 }}>
        <Node icon={Database} label="RAG · vectors" sub="text-embedding-3" />
      </motion.div>
    </div>
  )
}
