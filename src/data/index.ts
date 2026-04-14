export type Project = {
  id: string
  title: string
  subtitle: string
  description: string
  tags: string[]
  date: string
  hackathon?: { place: '1st' | '2nd' | '3rd'; org: string }
  github?: string   // e.g. 'https://github.com/Skeggo/repo-name'
  live?: string     // e.g. 'https://project.pages.dev'
}

export type SkillGroup = {
  category: string
  icon: string
  items: string[]
}

export type HackathonWin = {
  place: '1st' | '2nd' | '3rd'
  event: string
  org: string
  date: string
  project: string
  description: string
  tags: string[]
}

export const profile = {
  name: 'Seif eddine Koubaa',
  title: 'ICT Engineering Student',
  bio: 'Cybersecurity & AI Enthusiast with strong analytical skills and a drive for innovation. Detail-oriented, adaptable, and focused on securing systems and building intelligent solutions.',
  email: 'seifkoubaa5@gmail.com',
  phone: '+216 98715818',
  location: 'Tunis, Tunisia',
  linkedin: 'https://www.linkedin.com/in/seif-koubaa-303a78292/',
  github: 'https://github.com/Skeggo',
  education: {
    degree: 'ICT Engineering',
    school: 'INSAT',
    schoolFull: 'National Institute of Applied Science and Technology',
    period: '2023 – 2028',
  },
}

export const projects: Project[] = [
  {
    id: 'truth-engine',
    title: 'Truth Engine',
    subtitle: 'AI Misinformation Detection Platform',
    description:
      'AI-powered platform for misinformation detection using a FastAPI and NestJS backend with a modular processing pipeline. Integrated LLM-driven semantic analysis and prompt engineering to evaluate content authenticity, contextual consistency, and source credibility. Leveraged Cloudflare Workers AI for serverless edge inference.',
    tags: ['FastAPI', 'NestJS', 'LLM', 'Cloudflare Workers AI', 'Prompt Engineering'],
    date: 'Apr 2026',
    hackathon: { place: '1st', org: 'GDSC FST – Menacraft AI Hackathon' },
  },
  {
    id: 'redops',
    title: 'RedOps',
    subtitle: 'AI-Powered Web Pentesting & Red Team Automation',
    description:
      'Modular red-team automation platform for web application security testing. Built with a FastAPI backend, Redis-based job queue, and Dockerized infrastructure. Integrates httpx, katana, ffuf, and nuclei for surface discovery and exploit detection, extended with AI-driven reasoning for attack hypothesis generation and risk scoring.',
    tags: ['FastAPI', 'Redis', 'Docker', 'httpx', 'katana', 'ffuf', 'nuclei', 'AI'],
    date: 'Jan 2026',
  },
  {
    id: 'wealth-mgmt',
    title: 'Wealth Management System',
    subtitle: 'AI + Blockchain Finance Platform',
    description:
      'Innovative wealth management platform for Tunisian startups and companies, integrating AI, cybersecurity, n8n automation, and real estate tokenization via blockchain and Hedera. Developed during a 48-hour hackathon challenge.',
    tags: ['AI', 'n8n', 'Blockchain', 'Hedera', 'Cybersecurity'],
    date: 'Nov 2025',
    hackathon: { place: '3rd', org: 'Esprit Business School – AIxCyber Hackathon' },
  },
  {
    id: 'cve-agent-rag',
    title: 'CVE-AGENT-RAG',
    subtitle: 'AI-Driven Cyber Threat Intelligence Automation',
    description:
      'AI-powered system that automates CVE data retrieval and semantic search using n8n workflows and Pinecone vector database. Designed an intelligent RAG pipeline for contextual vulnerability analysis, real-time querying, and threat summarization.',
    tags: ['n8n', 'Pinecone', 'RAG', 'Vector DB', 'FastAPI'],
    date: 'Oct 2025',
  },
  {
    id: 'ai-recommender',
    title: 'AI Training Recommender',
    subtitle: 'Intelligent Training Recommendation Engine',
    description:
      'AI model that recommends the most suitable trainings for members based on internal data. Built and integrated into a full-stack web application within 4 hours and deployed through Cloudflare for a production-ready demonstration.',
    tags: ['AI/ML', 'React', 'Cloudflare', 'Full-Stack', 'Python'],
    date: 'Apr 2025',
    hackathon: { place: '1st', org: 'INSAT Junior Entreprise – AI Hackathon' },
  },
]

export const hackathonWins: HackathonWin[] = [
  {
    place: '1st',
    event: 'Menacraft AI Hackathon',
    org: 'GDSC FST',
    date: 'Apr 2026',
    project: 'Truth Engine',
    description:
      'Built an AI-powered misinformation detection platform using LLM semantic analysis, Cloudflare Workers AI, and FastAPI. Deployed end-to-end in a production-like environment.',
    tags: ['FastAPI', 'NestJS', 'LLM', 'Cloudflare Workers AI'],
  },
  {
    place: '3rd',
    event: 'AIxCyber Hackathon',
    org: 'Esprit Business School',
    date: 'Nov 2025',
    project: 'Wealth Management System',
    description:
      'Developed an innovative wealth management platform for Tunisian startups integrating AI, cybersecurity, n8n automation, and real estate tokenization via Hedera blockchain.',
    tags: ['AI', 'n8n', 'Blockchain', 'Hedera'],
  },
  {
    place: '1st',
    event: 'AI Recommendation Hackathon',
    org: 'INSAT Junior Entreprise',
    date: 'Apr 2025',
    project: 'AI Training Recommender',
    description:
      'Built and deployed an AI recommendation model for internal training selection within 4 hours. Integrated into a full-stack web app and shipped to production via Cloudflare.',
    tags: ['AI/ML', 'React', 'Cloudflare', 'Full-Stack'],
  },
]

export const skillGroups: SkillGroup[] = [
  {
    category: 'Cybersecurity',
    icon: '⬡',
    items: [
      'Network Reconnaissance',
      'Vulnerability Assessment',
      'Penetration Testing',
      'CTF Player',
      'Burp Suite',
      'Metasploit',
    ],
  },
  {
    category: 'Full-Stack',
    icon: '⬡',
    items: ['Node.js', 'React', 'FastAPI', 'Tailwind CSS', 'Cloudflare Workers', 'Microservices', 'Docker'],
  },
  {
    category: 'AI & Data',
    icon: '⬡',
    items: ['RAG', 'Ollama', 'n8n', 'LangChain', 'Qdrant', 'HuggingFace'],
  },
  {
    category: 'Programming',
    icon: '⬡',
    items: ['Python', 'TypeScript / JS', 'C / C++', 'Java', 'SQL', 'PowerShell'],
  },
]
