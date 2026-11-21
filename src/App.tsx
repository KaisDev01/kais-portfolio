import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, ArrowUpRight, Download, Mail, MapPin, Copy, Check, Command, Menu, X,
  Brain, Sparkles, Server, LayoutTemplate, Database, GraduationCap, Languages, HeartHandshake, Bot,
} from 'lucide-react'
import { profile, stats, experience, projects, skills, marquee, education, languages } from './data'
import { NeuralCanvas, Cursor, Magnetic, Tilt, Typewriter, Counter, Reveal, SectionTitle, spotlightMove, Github } from './components/fx'
import AgentChat from './components/AgentChat'
import CommandPalette from './components/CommandPalette'
import AgentDiagram from './components/AgentDiagram'

const nav = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

const skillIcons = { brain: Brain, sparkles: Sparkles, server: Server, layout: LayoutTemplate, database: Database } as const

function Navbar() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    nav.forEach((n) => { const el = document.getElementById(n.id); if (el) obs.observe(el) })
    return () => { window.removeEventListener('scroll', onScroll); obs.disconnect() }
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <motion.div className="h-[2px] origin-left bg-gradient-to-r from-violet-500 via-cyan-400 to-pink-400" style={{ scaleX: progress }} />
      <div className={`mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 sm:px-5 ${scrolled ? 'mx-3 border border-white/10 bg-[#0b0b16]/75 shadow-xl backdrop-blur-xl sm:mx-auto' : ''}`}>
        <a href="#top" className="group flex items-center gap-2 font-display text-lg font-bold text-white">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 text-sm transition group-hover:rotate-12">KB</span>
          <span className="hidden sm:inline">Kais<span className="text-violet-400">.</span></span>
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <a key={n.id} href={`#${n.id}`} className={`relative rounded-lg px-3.5 py-2 text-sm transition ${active === n.id ? 'text-white' : 'text-zinc-400 hover:text-white'}`}>
              {active === n.id && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-lg bg-white/[0.07]" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={() => window.dispatchEvent(new Event('open-palette'))} className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-400 transition hover:text-white sm:flex" aria-label="Open command palette">
            <Command size={13} /> <span>Ctrl K</span>
          </button>
          <a href={profile.cv} target="_blank" rel="noreferrer" className="hidden items-center gap-1.5 rounded-lg bg-white px-3.5 py-2 text-sm font-semibold text-black transition hover:bg-cyan-200 sm:flex">
            <Download size={15} /> CV
          </a>
          <button onClick={() => setOpen(!open)} className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-white md:hidden" aria-label="Menu">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mx-3 mt-2 rounded-2xl border border-white/10 bg-[#0b0b16]/95 p-2 backdrop-blur-xl md:hidden">
            {nav.map((n) => (
              <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-zinc-300 hover:bg-white/5 hover:text-white">{n.label}</a>
            ))}
            <a href={profile.cv} target="_blank" rel="noreferrer" className="mt-1 flex items-center gap-2 rounded-xl bg-white px-4 py-3 font-semibold text-black"><Download size={16} /> Download CV</a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

function Hero() {
  const words = profile.name.split(' ')
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28">
      <div className="absolute inset-0 grid-bg" />
      <NeuralCanvas />
      <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-violet-600/25 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[120px]" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3.5 py-1.5 text-sm text-emerald-200">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" /></span>
            Available for freelance & new challenges
          </motion.div>

          <h1 className="font-display text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
            {words.map((w, i) => (
              <motion.span key={i} className={`mr-[0.25em] inline-block ${i === 0 ? 'text-gradient' : ''}`} initial={{ opacity: 0, y: 40, rotateX: -40 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ delay: 0.15 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                {w}
              </motion.span>
            ))}
          </h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-6 font-display text-xl text-zinc-300 sm:text-2xl">
            .NET engineer building <span className="text-cyan-300"><Typewriter words={profile.roles} /></span>
          </motion.p>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }} className="mt-5 max-w-xl text-zinc-400">
            I turn LLMs into reliable products — multi-agent systems, RAG pipelines and MCP tooling on top of clean, tested ASP.NET Core backends.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a href="#projects" className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-6 py-3.5 font-semibold text-white shadow-[0_10px_40px_-10px_rgba(139,92,246,0.9)]">
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                See my work <ArrowRight size={18} className="transition group-hover:translate-x-1" />
              </a>
            </Magnetic>
            <Magnetic>
              <button onClick={() => window.dispatchEvent(new Event('open-agent'))} className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-white backdrop-blur transition hover:border-violet-400/60 hover:bg-white/10">
                <Bot size={18} /> Chat with my AI
              </button>
            </Magnetic>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.05 }} className="mt-8 flex flex-wrap items-center gap-5 text-sm text-zinc-400">
            <span className="flex items-center gap-1.5"><MapPin size={15} className="text-violet-400" /> {profile.location}</span>
            <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 transition hover:text-white"><Github size={15} /> GitHub</a>
            <a href={`mailto:${profile.email}`} className="flex items-center gap-1.5 transition hover:text-white"><Mail size={15} /> Email</a>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }} className="relative mx-auto w-64 sm:w-80 lg:w-full lg:max-w-sm">
          <Tilt className="rounded-[2rem] p-3">
            <div className="relative aspect-square">
              <div className="absolute -inset-[3px] overflow-hidden rounded-[1.7rem] opacity-90">
                <div className="ring-spin absolute left-1/2 top-1/2 aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="absolute inset-0 overflow-hidden rounded-[1.6rem] bg-zinc-900">
                <img src="/kais.jpg" alt="Portrait of Kais Ben Hadj Hassen" className="h-full w-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07070d]/70 via-transparent to-transparent" />
              </div>
            </div>
            <div className="flex items-center justify-between px-2 pb-1 pt-4" style={{ transform: 'translateZ(40px)' }}>
              <div>
                <p className="font-display font-semibold text-white">Kais Ben Hadj Hassen</p>
                <p className="font-mono text-xs text-zinc-400">.NET · Agentic AI · RAG</p>
              </div>
              <span className="rounded-lg bg-violet-500/15 px-2 py-1 font-mono text-xs text-violet-300">v2026</span>
            </div>
          </Tilt>
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }} className="absolute -left-6 top-10 hidden rounded-xl border border-white/10 bg-[#11111f]/90 px-3 py-2 font-mono text-xs text-cyan-200 shadow-xl backdrop-blur sm:block">
            <span className="text-violet-400">await</span> agent.RunAsync()
          </motion.div>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }} className="absolute -right-4 bottom-24 hidden rounded-xl border border-white/10 bg-[#11111f]/90 px-3 py-2 text-xs text-zinc-200 shadow-xl backdrop-blur sm:block">
            🧠 GPT-4o · Claude
          </motion.div>
        </motion.div>
      </div>

      <motion.a href="#about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-zinc-500 sm:flex" aria-label="Scroll down">
        scroll
        <span className="flex h-9 w-5 justify-center rounded-full border border-white/20 pt-1.5"><motion.span className="h-1.5 w-1 rounded-full bg-white" animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 1.6 }} /></span>
      </motion.a>
    </section>
  )
}

function Marquee() {
  const items = [...marquee, ...marquee]
  return (
    <div className="marquee-wrap relative overflow-hidden border-y border-white/5 bg-white/[0.015] py-5 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div className="marquee flex w-max gap-10">
        {items.map((m, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-lg font-medium text-zinc-500 transition hover:text-white">
            {m} <span className="text-violet-500">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-28">
      <SectionTitle kicker="about me" title={<>Engineer by training, <span className="text-gradient">AI builder</span> by obsession.</>} />
      <div className="grid gap-6 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <div onMouseMove={spotlightMove} className="spotlight h-full rounded-3xl p-8">
            <p className="text-lg leading-relaxed text-zinc-300">{profile.summary}</p>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                  <p className="font-display text-3xl font-bold text-white sm:text-4xl"><Counter to={s.value} suffix={s.suffix} /></p>
                  <p className="mt-1 text-xs text-zinc-400">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <div className="grid gap-6">
          <Reveal delay={0.1}>
            <div onMouseMove={spotlightMove} className="spotlight rounded-3xl p-6">
              <p className="mb-4 flex items-center gap-2 font-display font-semibold text-white"><GraduationCap size={18} className="text-violet-400" /> Education</p>
              {education.map((e) => (
                <div key={e.title} className="mb-3 last:mb-0">
                  <p className="text-sm font-medium text-zinc-200">{e.title}</p>
                  <p className="text-xs text-zinc-500">{e.school} · {e.year}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div onMouseMove={spotlightMove} className="spotlight rounded-3xl p-6">
              <p className="mb-4 flex items-center gap-2 font-display font-semibold text-white"><Languages size={18} className="text-cyan-300" /> Languages</p>
              <div className="flex flex-wrap gap-2">
                {languages.map((l) => (
                  <span key={l.name} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-zinc-200">{l.name} <span className="text-zinc-500">· {l.level}</span></span>
                ))}
              </div>
              <p className="mt-5 flex items-start gap-2 text-sm text-zinc-400"><HeartHandshake size={16} className="mt-0.5 shrink-0 text-pink-400" /> Volunteer at AVAPACS, supporting cancer patients in Sousse.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function ExperienceSection() {
  const [open, setOpen] = useState(0)
  return (
    <section id="experience" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-28">
      <SectionTitle kicker="experience" title={<>Where I've been <span className="text-gradient">shipping</span>.</>} sub="Click a role to expand the details." />
      <div className="relative">
        <div className="absolute bottom-0 left-[11px] top-0 w-px bg-gradient-to-b from-violet-500 via-cyan-400/50 to-transparent sm:left-[15px]" />
        <div className="space-y-5">
          {experience.map((e, i) => {
            const isOpen = open === i
            return (
              <Reveal key={e.project} delay={i * 0.05}>
                <div className="relative pl-10 sm:pl-14">
                  <span className={`absolute left-0 top-6 grid h-6 w-6 place-items-center rounded-full border-2 transition sm:h-8 sm:w-8 ${isOpen ? 'border-cyan-300 bg-cyan-400/20' : 'border-violet-500/60 bg-[#07070d]'}`}>
                    <span className={`h-2 w-2 rounded-full ${isOpen ? 'bg-cyan-300' : 'bg-violet-400'}`} />
                  </span>
                  <div onMouseMove={spotlightMove} className="spotlight rounded-3xl">
                    <button onClick={() => setOpen(isOpen ? -1 : i)} className="flex w-full flex-col gap-2 p-6 text-left sm:flex-row sm:items-center sm:justify-between" aria-expanded={isOpen}>
                      <div>
                        <p className="font-display text-xl font-semibold text-white">{e.role}</p>
                        <p className="text-sm text-zinc-400">{e.company} · <span className="text-violet-300">{e.project}</span></p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-zinc-300">{e.period}</span>
                        <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="grid h-8 w-8 place-items-center rounded-full bg-white/5 text-lg text-zinc-300">+</motion.span>
                      </div>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                          <div className="px-6 pb-6">
                            <ul className="space-y-2.5">
                              {e.points.map((p) => (
                                <li key={p} className="flex gap-3 text-zinc-300"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-violet-400 to-cyan-300" />{p}</li>
                              ))}
                            </ul>
                            <div className="mt-5 flex flex-wrap gap-2">
                              {e.stack.map((s) => <span key={s} className="rounded-md border border-violet-400/20 bg-violet-500/10 px-2.5 py-1 font-mono text-xs text-violet-200">{s}</span>)}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-28">
      <SectionTitle kicker="selected work" title={<>Projects that <span className="text-gradient">think</span>.</>} sub="From voice-driven marketplaces to agents that write specs." />

      <Reveal>
        <div onMouseMove={spotlightMove} className="spotlight mb-8 grid items-center gap-8 overflow-hidden rounded-3xl p-6 sm:p-10 lg:grid-cols-2">
          <div>
            <span className="rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-3 py-1 text-xs font-semibold text-white">Featured · Live architecture</span>
            <h3 className="mt-5 font-display text-3xl font-bold text-white sm:text-4xl">El-Las</h3>
            <p className="mt-2 text-lg text-violet-200">Voice-first AI marketplace</p>
            <p className="mt-4 text-zinc-400">{projects[0].description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['.NET 8', 'Semantic Kernel', 'LangChain', 'MCP', 'GPT-4o', 'Claude Sonnet', 'Whisper', 'React Native'].map((t) => (
                <span key={t} className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-zinc-300">{t}</span>
              ))}
            </div>
          </div>
          <AgentDiagram />
        </div>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-3">
        {projects.slice(1).map((p, i) => (
          <Reveal key={p.name} delay={i * 0.1} className="h-full">
            <Tilt className="group flex flex-col rounded-3xl p-7">
              <div className={`mb-6 h-1.5 w-16 rounded-full bg-gradient-to-r ${p.accent} transition-all duration-500 group-hover:w-full`} />
              <div className="flex items-start justify-between" style={{ transform: 'translateZ(30px)' }}>
                <div>
                  <h3 className="font-display text-2xl font-bold text-white">{p.name}</h3>
                  <p className="mt-1 text-sm text-zinc-400">{p.tagline}</p>
                </div>
                <ArrowUpRight className="text-zinc-500 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" />
              </div>
              <p className="mt-5 flex-1 text-sm leading-relaxed text-zinc-400">{p.description}</p>
              <p className="mt-5 font-mono text-xs text-cyan-300/90">→ {p.metric}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tags.map((t) => <span key={t} className="rounded-md bg-white/5 px-2 py-1 text-xs text-zinc-300">{t}</span>)}
              </div>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Skills() {
  const [active, setActive] = useState(0)
  const Icon = skillIcons[skills[active].icon as keyof typeof skillIcons]
  return (
    <section id="skills" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-28">
      <SectionTitle kicker="toolbox" title={<>The <span className="text-gradient">stack</span> behind it.</>} sub="Pick a category to explore." />
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0 [scrollbar-width:none]">
          {skills.map((s, i) => {
            const I = skillIcons[s.icon as keyof typeof skillIcons]
            return (
              <button key={s.group} onClick={() => setActive(i)} className={`relative flex shrink-0 items-center gap-3 rounded-2xl px-5 py-4 text-left transition ${active === i ? 'text-white' : 'text-zinc-400 hover:text-white'}`}>
                {active === i && <motion.span layoutId="skill-pill" className="absolute inset-0 -z-10 rounded-2xl border border-violet-400/30 bg-gradient-to-r from-violet-600/25 to-cyan-500/10" transition={{ type: 'spring', stiffness: 350, damping: 30 }} />}
                <I size={18} className={active === i ? 'text-cyan-300' : ''} />
                <span className="font-medium">{s.group}</span>
                <span className="ml-auto hidden font-mono text-xs text-zinc-500 lg:inline">{s.items.length}</span>
              </button>
            )
          })}
        </div>
        <div onMouseMove={spotlightMove} className="spotlight min-h-[280px] rounded-3xl p-8">
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
              <div className="mb-8 flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 text-white"><Icon size={22} /></span>
                <h3 className="font-display text-2xl font-bold text-white">{skills[active].group}</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {skills[active].items.map((it, i) => (
                  <motion.span
                    key={it}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04, type: 'spring', stiffness: 300, damping: 18 }}
                    whileHover={{ y: -4, scale: 1.05 }}
                    data-cursor
                    className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-zinc-200 transition-colors hover:border-cyan-300/50 hover:bg-cyan-400/10 hover:text-white"
                  >
                    {it}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard?.writeText(profile.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }
  return (
    <section id="contact" className="relative scroll-mt-24 px-5 py-28">
      <Reveal className="mx-auto max-w-5xl">
        <div onMouseMove={spotlightMove} className="spotlight relative overflow-hidden rounded-[2.5rem] px-6 py-16 text-center sm:px-16 sm:py-20">
          <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[600px] -translate-x-1/2 rounded-full bg-violet-600/30 blur-[100px]" />
          <p className="relative font-mono text-sm text-cyan-300"><span className="text-violet-400">//</span> let's talk</p>
          <h2 className="relative mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Got an idea that needs <span className="text-gradient">an AI brain?</span>
          </h2>
          <p className="relative mx-auto mt-5 max-w-xl text-lg text-zinc-400">I'm open to freelance missions and full-time roles. Let's build something smart together.</p>
          <div className="relative mt-10 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 font-semibold text-black transition hover:bg-cyan-200">
                <Mail size={18} /> Say hello
              </a>
            </Magnetic>
            <Magnetic>
              <button onClick={copy} className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-4 font-mono text-sm text-zinc-200 transition hover:border-violet-400/60">
                {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                {copied ? 'Copied!' : profile.email}
              </button>
            </Magnetic>
          </div>
          <div className="relative mt-8 flex justify-center gap-3">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-zinc-300 transition hover:-translate-y-1 hover:text-white"><Github size={18} /></a>
            <a href={profile.cv} target="_blank" rel="noreferrer" aria-label="Download CV" className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-zinc-300 transition hover:-translate-y-1 hover:text-white"><Download size={18} /></a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

export default function App() {
  return (
    <div className="noise">
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <ExperienceSection />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <footer className="border-t border-white/5 px-5 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm text-zinc-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Kais Ben Hadj Hassen. Built with React, Tailwind & Framer Motion.</p>
          <p className="font-mono text-xs">Press <kbd className="rounded border border-white/10 px-1.5 py-0.5">Ctrl</kbd> + <kbd className="rounded border border-white/10 px-1.5 py-0.5">K</kbd> to navigate</p>
        </div>
      </footer>
      <CommandPalette />
      <AgentChat />
    </div>
  )
}
