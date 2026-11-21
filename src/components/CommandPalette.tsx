import type React from 'react'
import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, User, Briefcase, FolderGit2, Cpu, Mail, Download, Copy, Bot, CornerDownLeft } from 'lucide-react'
import { Github, Linkedin } from './fx'
import { profile } from '../data'

type Cmd = { label: string; hint: string; icon: (p: { size?: number; className?: string }) => React.ReactNode; run: () => void }

const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [idx, setIdx] = useState(0)
  const [toast, setToast] = useState('')

  const cmds: Cmd[] = useMemo(
    () => [
      { label: 'About me', hint: 'Navigate', icon: User, run: () => go('about') },
      { label: 'Experience', hint: 'Navigate', icon: Briefcase, run: () => go('experience') },
      { label: 'Projects', hint: 'Navigate', icon: FolderGit2, run: () => go('projects') },
      { label: 'Skills', hint: 'Navigate', icon: Cpu, run: () => go('skills') },
      { label: 'Contact', hint: 'Navigate', icon: Mail, run: () => go('contact') },
      { label: 'Ask my AI agent', hint: 'Action', icon: Bot, run: () => window.dispatchEvent(new Event('open-agent')) },
      { label: 'Copy email address', hint: 'Action', icon: Copy, run: () => { navigator.clipboard?.writeText(profile.email); setToast('Email copied ✓') } },
      { label: 'Download CV', hint: 'Action', icon: Download, run: () => window.open(profile.cv, '_blank') },
      { label: 'Open GitHub', hint: 'Link', icon: Github, run: () => window.open(profile.github, '_blank') },
      { label: 'Open LinkedIn', hint: 'Link', icon: Linkedin, run: () => window.open(profile.linkedin, '_blank') },
    ],
    [],
  )

  const list = cmds.filter((c) => c.label.toLowerCase().includes(q.toLowerCase()))

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen((o) => !o) }
      if (e.key === 'Escape') setOpen(false)
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener('open-palette', onOpen)
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('open-palette', onOpen) }
  }, [])

  useEffect(() => { setIdx(0) }, [q, open])
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(''), 1800); return () => clearTimeout(t) }, [toast])

  const exec = (c?: Cmd) => { if (!c) return; setOpen(false); setQ(''); setTimeout(c.run, 120) }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[80] flex items-start justify-center bg-black/60 px-4 pt-[18vh] backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
            <motion.div
              initial={{ scale: 0.95, y: -10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -10 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0e0e1a] shadow-2xl"
              role="dialog"
              aria-label="Command palette"
            >
              <div className="flex items-center gap-3 border-b border-white/10 px-4">
                <Search size={18} className="text-zinc-500" />
                <input
                  autoFocus
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowDown') { e.preventDefault(); setIdx((i) => Math.min(i + 1, list.length - 1)) }
                    if (e.key === 'ArrowUp') { e.preventDefault(); setIdx((i) => Math.max(i - 1, 0)) }
                    if (e.key === 'Enter') exec(list[idx])
                  }}
                  placeholder="Type a command or search…"
                  className="h-14 flex-1 bg-transparent text-white placeholder:text-zinc-500 focus:outline-none"
                />
                <kbd className="rounded border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500">ESC</kbd>
              </div>
              <ul className="max-h-80 overflow-y-auto p-2">
                {list.length === 0 && <li className="px-3 py-6 text-center text-sm text-zinc-500">No results.</li>}
                {list.map((c, i) => (
                  <li key={c.label}>
                    <button
                      onMouseEnter={() => setIdx(i)}
                      onClick={() => exec(c)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${i === idx ? 'bg-gradient-to-r from-violet-600/30 to-cyan-500/10 text-white' : 'text-zinc-300'}`}
                    >
                      <c.icon size={16} className={i === idx ? 'text-cyan-300' : 'text-zinc-500'} />
                      <span className="flex-1">{c.label}</span>
                      <span className="text-xs text-zinc-500">{c.hint}</span>
                      {i === idx && <CornerDownLeft size={14} className="text-zinc-400" />}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} className="fixed bottom-24 left-1/2 z-[90] -translate-x-1/2 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-5 py-2.5 text-sm text-emerald-200 backdrop-blur">
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
