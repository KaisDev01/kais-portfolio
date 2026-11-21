import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, Send, X, Wrench, Sparkles } from 'lucide-react'
import { profile, experience, skills, education } from '../data'

type Msg = { from: 'bot' | 'user'; text: string; tool?: string }

const suggestions = ['What do you build?', 'Tell me about El-Las', 'Your tech stack?', 'Are you available?', 'Education']

// A tiny, local "agent": routes the question to a tool, then answers. No API calls.
function route(q: string): { tool: string; answer: string } {
  const s = q.toLowerCase()
  const has = (...k: string[]) => k.some((w) => s.includes(w))

  if (has('el-las', 'ellas', 'el las', 'marketplace', 'voice'))
    return { tool: 'get_project("El-Las")', answer: `El-Las is my current freelance project: a P2P rental & services marketplace driven by a voice AI assistant. An orchestrator agent routes to search, matchmaking and support agents (Semantic Kernel + LangChain), which reach listings, bookings and profiles through MCP servers. A RAG pipeline does semantic search over the catalogue. Backend is .NET 8 N-Layer with an Expo React Native app.` }
  if (has('penlyzard', 'spec'))
    return { tool: 'get_project("Penlyzard")', answer: `Penlyzard (DevNewTech, 2023–2026) automates writing functional specifications with generative AI. Agentic workflows chain analysis → drafting → validation and produce docs, diagrams and business schemas. Built with .NET 8, Blazor WASM, Azure OpenAI (GPT-4o), EF Core and MySQL, with xUnit and GitHub Actions CI/CD.` }
  if (has('stack', 'tech', 'skill', 'language', 'tools', 'framework'))
    return { tool: 'list_skills()', answer: skills.map((g) => `${g.group}: ${g.items.slice(0, 5).join(', ')}`).join('\n') }
  if (has('rag', 'mcp', 'agent', 'llm', 'semantic', 'langchain'))
    return { tool: 'search_knowledge("agentic AI")', answer: `That's my core focus. I design multi-agent systems (orchestrator + specialised agents), expose business tools to agents through MCP servers, and build RAG pipelines with embeddings, vector stores and semantic search. I orchestrate GPT-4o, GPT-4o mini, Claude Sonnet, Whisper and text-embedding-3 with Semantic Kernel and LangChain.` }
  if (has('experience', 'work', 'job', 'career', 'company', 'years'))
    return { tool: 'get_experience()', answer: experience.map((e) => `• ${e.role} — ${e.company} (${e.project}), ${e.period}`).join('\n') }
  if (has('education', 'study', 'degree', 'school', 'university'))
    return { tool: 'get_education()', answer: education.map((e) => `• ${e.title} — ${e.school}, ${e.year}`).join('\n') }
  if (has('available', 'hire', 'freelance', 'contact', 'email', 'reach', 'work with'))
    return { tool: 'check_availability()', answer: `Yes — I'm a freelancer based in ${profile.location} and open to new challenges, remote or on-site. The fastest way to reach me is ${profile.email}. You can also hit "Download CV" at the top.` }
  if (has('where', 'location', 'live', 'based', 'sofia', 'tunisia'))
    return { tool: 'get_profile("location")', answer: `I'm based in ${profile.location}. I studied engineering in Sousse, Tunisia, and I'm open to remote and on-site work.` }
  if (has('hello', 'hi', 'hey', 'salut', 'bonjour'))
    return { tool: 'greet()', answer: `Hey 👋 I'm Kais's portfolio agent. Ask me about his projects, stack, experience or availability.` }
  if (has('what do you', 'build', 'do you do', 'who are you', 'about'))
    return { tool: 'get_profile()', answer: profile.summary }
  if (has('volunteer', 'avapacs', 'engagement'))
    return { tool: 'get_profile("engagement")', answer: `Outside of code, I volunteer with the AVAPACS association, supporting cancer patients in Sousse.` }
  return { tool: 'fallback()', answer: `I'm a small local agent, so I don't know that one yet 🙂 Try asking about El-Las, Penlyzard, my stack, experience, education or availability — or email ${profile.email}.` }
}

export default function AgentChat() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: 'bot', text: `Hi! I'm Kais's AI agent 🤖 Ask me anything about his work.` },
  ])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState<string | null>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onOpen = () => setOpen(true)
    window.addEventListener('open-agent', onOpen)
    return () => window.removeEventListener('open-agent', onOpen)
  }, [])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [msgs, thinking])

  const ask = (q: string) => {
    if (!q.trim() || thinking) return
    setMsgs((m) => [...m, { from: 'user', text: q }])
    setInput('')
    const { tool, answer } = route(q)
    setThinking(tool)
    setTimeout(() => {
      setThinking(null)
      setMsgs((m) => [...m, { from: 'bot', text: answer, tool }])
    }, 900 + Math.random() * 500)
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-3.5 font-medium text-white shadow-[0_10px_40px_-10px_rgba(139,92,246,0.8)]"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring' }}
        aria-label={open ? 'Close AI agent chat' : 'Open AI agent chat'}
      >
        {open ? <X size={20} /> : <Bot size={20} />}
        <span className="hidden sm:inline">{open ? 'Close' : 'Ask my AI agent'}</span>
        {!open && <span className="absolute -right-0.5 -top-0.5 h-3 w-3 animate-ping rounded-full bg-pink-400" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="fixed bottom-24 right-4 z-50 flex h-[520px] max-h-[75vh] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0c0c18]/95 shadow-2xl backdrop-blur-xl sm:right-6"
          >
            <div className="flex items-center gap-3 border-b border-white/10 bg-gradient-to-r from-violet-600/20 to-cyan-500/10 px-5 py-4">
              <div className="relative grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400">
                <Sparkles size={18} className="text-white" />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#0c0c18] bg-emerald-400" />
              </div>
              <div>
                <p className="font-display font-semibold text-white">Kais.agent</p>
                <p className="font-mono text-xs text-emerald-300">online · runs locally</p>
              </div>
            </div>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {msgs.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={m.from === 'user' ? 'flex justify-end' : ''}>
                  <div className="max-w-[88%]">
                    {m.tool && (
                      <p className="mb-1 flex items-center gap-1.5 font-mono text-[11px] text-violet-300/80">
                        <Wrench size={11} /> {m.tool}
                      </p>
                    )}
                    <div
                      className={`whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        m.from === 'user' ? 'rounded-br-md bg-gradient-to-r from-violet-600 to-indigo-600 text-white' : 'rounded-bl-md border border-white/5 bg-white/5 text-zinc-200'
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                </motion.div>
              ))}
              {thinking && (
                <div>
                  <p className="mb-1 flex items-center gap-1.5 font-mono text-[11px] text-cyan-300">
                    <Wrench size={11} className="animate-spin" /> calling {thinking}
                  </p>
                  <div className="inline-flex gap-1 rounded-2xl rounded-bl-md border border-white/5 bg-white/5 px-4 py-3">
                    {[0, 1, 2].map((d) => (
                      <motion.span key={d} className="h-1.5 w-1.5 rounded-full bg-zinc-400" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: d * 0.15 }} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none]">
              {suggestions.map((s) => (
                <button key={s} onClick={() => ask(s)} className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300 transition hover:border-violet-400/60 hover:text-white">
                  {s}
                </button>
              ))}
            </div>
            <form onSubmit={(e) => { e.preventDefault(); ask(input) }} className="flex items-center gap-2 border-t border-white/10 p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about projects, stack…"
                aria-label="Message"
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-violet-500 focus:outline-none"
              />
              <button type="submit" aria-label="Send" className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 text-white transition hover:opacity-90">
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
