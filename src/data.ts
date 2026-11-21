export const profile = {
  name: 'Kais Ben Hadj Hassen',
  firstName: 'Kais',
  title: '.NET Software Engineer · Agentic AI & RAG',
  location: 'Sofia, Bulgaria',
  email: 'kais.belhadjhassen@gmail.com',
  github: 'https://github.com/KaisDev01',
  linkedin: 'https://www.linkedin.com/in/kais-ben-hadj-hassen-22355a21b/',
  cv: '/Kais-Ben-Hadj-Hassen-CV.pdf',
  roles: [
    'AI agents with Semantic Kernel',
    'RAG pipelines that actually answer',
    'MCP servers for real business tools',
    'clean N-Layer .NET backends',
    'Blazor & Angular frontends',
  ],
  summary:
    "I'm a .NET software engineer (C#, ASP.NET Core, Blazor) focused on building applications powered by generative AI: AI agents, RAG, LLM orchestration (OpenAI, Azure OpenAI, Claude) and prompt engineering. I bring solid experience with N-Layer architectures, Angular, CI/CD pipelines, cloud and Docker deployments. Freelancing from Sofia and always up for the next challenge.",
}

export const stats = [
  { value: 3, suffix: '+', label: 'Years shipping .NET' },
  { value: 4, suffix: '', label: 'Production projects' },
  { value: 5, suffix: '+', label: 'LLMs orchestrated' },
  { value: 2, suffix: '', label: 'Working languages' },
]

export type Experience = {
  role: string
  company: string
  project: string
  period: string
  points: string[]
  stack: string[]
}

export const experience: Experience[] = [
  {
    role: '.NET & Agentic AI Engineer',
    company: 'Freelance',
    project: 'El-Las',
    period: 'Mar 2026 — Present',
    points: [
      'Designed and built El-Las, a P2P rental & services marketplace driven by a voice AI assistant.',
      'Multi-agent architecture: an orchestrator routing to specialised agents (search, matchmaking, support) with Semantic Kernel and LangChain.',
      'MCP (Model Context Protocol) servers exposing business tools to the agents: listings, bookings, profiles.',
      'RAG pipeline: embeddings, vector store and semantic search over the listings catalogue.',
      'N-Layer .NET backend with a dedicated AI layer, REST API, SQL Server and an Expo React Native mobile app.',
    ],
    stack: ['.NET 8', 'ASP.NET Core', 'Semantic Kernel', 'LangChain', 'MCP', 'OpenAI', 'Claude', 'SQL Server', 'React Native'],
  },
  {
    role: '.NET & AI Software Engineer',
    company: 'DevNewTech',
    project: 'Penlyzard',
    period: 'Nov 2023 — Mar 2026',
    points: [
      'Enterprise platform that uses generative AI to automate writing functional specifications for business and project teams.',
      'Agentic workflows chaining analysis, drafting and validation to produce technical docs, diagrams and business schemas.',
      'N-Layer architecture, xUnit tests, Azure CI/CD and data-access optimisation (MySQL, EF Core).',
    ],
    stack: ['.NET 8', 'Blazor WASM', 'Azure OpenAI', 'GPT-4o', 'EF Core', 'MySQL', 'xUnit', 'GitHub Actions'],
  },
  {
    role: 'Full Stack .NET & Angular Developer',
    company: 'DevNewTech',
    project: 'Talent Portal',
    period: 'Apr 2023 — Oct 2023',
    points: [
      'Secure HR document portal with encrypted access to contracts and payslips.',
      'Role-based access control (RBAC), admin dashboard and SQL Server data modelling.',
    ],
    stack: ['.NET Core', 'C#', 'Angular', 'TypeScript', 'SQL Server', 'Entity Framework'],
  },
  {
    role: 'Software Engineering Intern',
    company: 'Cydista',
    project: 'Prosiria',
    period: 'Jul 2022 — Feb 2023',
    points: [
      'CLI and web tool generating complete .NET web service solutions following "The Standard" architecture.',
      'AI agent inferring database schemas from business entities; Docker containerisation and CI/CD.',
    ],
    stack: ['.NET', 'C#', 'Blazor WASM', 'SQL Server', 'Docker', 'Generative AI'],
  },
]

export type Project = {
  name: string
  tagline: string
  description: string
  tags: string[]
  accent: string
  metric: string
}

export const projects: Project[] = [
  {
    name: 'El-Las',
    tagline: 'Voice-first AI marketplace',
    description:
      'A P2P rental & services marketplace where a voice assistant does the heavy lifting. An orchestrator agent delegates to search, matchmaking and support agents that reach real data through MCP servers and a RAG layer.',
    tags: ['Multi-agent', 'MCP', 'RAG', 'Whisper', 'React Native'],
    accent: 'from-violet-500 to-fuchsia-500',
    metric: 'Orchestrator + 3 specialised agents',
  },
  {
    name: 'Penlyzard',
    tagline: 'Specs written by agents',
    description:
      'Enterprise platform that turns business needs into functional specifications. Agentic workflows analyse, draft and validate — then output technical documentation, diagrams and business schemas.',
    tags: ['Azure OpenAI', 'Blazor', 'Agentic workflows', 'CI/CD'],
    accent: 'from-cyan-400 to-blue-500',
    metric: 'Analysis → Draft → Validate pipeline',
  },
  {
    name: 'Talent Portal',
    tagline: 'Secure HR documents',
    description:
      'An HR portal giving employees encrypted access to contracts and payslips, with fine-grained RBAC and an admin dashboard on top of a carefully modelled SQL Server database.',
    tags: ['Angular', '.NET Core', 'RBAC', 'SQL Server'],
    accent: 'from-emerald-400 to-teal-500',
    metric: 'Encrypted, role-based access',
  },
  {
    name: 'Prosiria',
    tagline: 'Generate whole .NET services',
    description:
      'CLI + web tool that scaffolds complete .NET web services following "The Standard". An AI agent infers database schemas straight from business entities.',
    tags: ['CLI', 'Blazor', 'Docker', 'Generative AI'],
    accent: 'from-amber-400 to-pink-500',
    metric: 'Entities in, full solution out',
  },
]

export const skills: { group: string; icon: string; items: string[] }[] = [
  { group: 'AI & Agents', icon: 'brain', items: ['AI Agents', 'RAG', 'MCP', 'Semantic Kernel', 'LangChain', 'Multi-agent systems', 'Tool calling', 'Vector databases', 'Prompt Engineering'] },
  { group: 'Models', icon: 'sparkles', items: ['GPT-4o', 'GPT-4o mini', 'Claude Sonnet', 'Azure OpenAI', 'Whisper', 'Embeddings'] },
  { group: 'Backend', icon: 'server', items: ['C# / .NET 8', 'ASP.NET Core', 'REST APIs', 'EF Core', 'Python', 'Java'] },
  { group: 'Frontend', icon: 'layout', items: ['Blazor', 'Angular', 'React Native', 'TypeScript'] },
  { group: 'Data & DevOps', icon: 'database', items: ['SQL Server', 'MySQL', 'MongoDB', 'Docker', 'Kubernetes', 'Azure DevOps', 'CI/CD'] },
]

export const marquee = ['.NET 8', 'C#', 'Semantic Kernel', 'LangChain', 'MCP', 'RAG', 'GPT-4o', 'Claude', 'Azure OpenAI', 'Whisper', 'Blazor', 'Angular', 'React Native', 'TypeScript', 'SQL Server', 'Docker', 'Kubernetes', 'GitHub Actions']

export const education = [
  { title: 'Software Engineering Degree', school: 'École Polytechnique de Sousse', year: '2023' },
  { title: 'Baccalaureate in Mathematics', school: 'Lycée Pilote de Sousse', year: '2018' },
]

export const languages = [
  { name: 'English', level: 'Professional', pct: 85 },
  { name: 'French', level: 'Professional', pct: 90 },
]
