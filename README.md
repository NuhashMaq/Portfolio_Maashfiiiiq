<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&height=190&text=Mashfiq%20Naushad&fontSize=42&fontAlignY=34&desc=AI%20Native%20Portfolio&descAlignY=57&color=0:0F172A,40:0EA5E9,70:06B6D4,100:22D3EE" alt="Header banner" width="100%" />

<p>
	<img src="https://readme-typing-svg.herokuapp.com?font=Poppins&weight=700&size=22&duration=3000&pause=1000&color=0EA5E9&center=true&vCenter=true&width=900&lines=Conversation-Driven+Portfolio+Product;AI%2FML+Engineer+%7C+NLP+%7C+LLM+Systems;Backend+Pipelines+for+Real-World+Deployment" alt="Typing animation" />
</p>

[![Live Website](https://img.shields.io/badge/Live-maashfiiiiq.vercel.app-0A66C2?style=for-the-badge&logo=vercel&logoColor=white)](https://maashfiiiiq.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.1-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149ECA?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MNPPL%20v1.0-111827?style=for-the-badge)](LICENSE)

</div>

## Identity

<div align="center">

![Name](https://img.shields.io/badge/Name-Mashfiq%20Naushad-0EA5E9?style=for-the-badge)
![Domain](https://img.shields.io/badge/Domain-AI%2FML%20%7C%20NLP%20%7C%20LLM-06B6D4?style=for-the-badge)
![Education](https://img.shields.io/badge/Education-CSE%2C%20RUET-22D3EE?style=for-the-badge)
![Location](https://img.shields.io/badge/Location-Sylhet%2C%20Bangladesh-14B8A6?style=for-the-badge)

</div>

## Product Vision

This repository contains my AI-native portfolio built as an interactive conversation system.
Instead of static scrolling sections, visitors can ask focused questions and receive direct, contextual answers about my projects, technical stack, work experience, and goals.

## Product Snapshot

<div align="center">
	<img src="assets/readme-photo.png" alt="Portfolio snapshot" width="100%" />
</div>

## Experience Highlights

- AI/ML Engineer at BRITTOO.XYZ (Sept 2025 - Present)
- Software Engineering Intern at VIVASOFT LIMITED (Jan 2026 - Present)
- Hands-on work with NLP pipelines, semantic search, RAG, Go services, and production AI integration

## System Capabilities

- Context-aware conversational answers through a guided system prompt
- Tool-assisted responses for projects, skills, resume, and profile sections
- Interactive game modules (song, movie, chess) to increase engagement
- Mobile and desktop optimized interaction flow

## Project Highlights

- EDUPREDICT - AI Performance Analysis Platform
- Smart Rural Health Assistant
- HoloHype - Immersive Commerce Interface
- YouTube UI Clone

## Architecture

```mermaid
flowchart TD
	A[Visitor Query] --> B[Next.js Frontend]
	B --> C[Chat Route Handler]
	C --> D[System Prompt + Tools]
	D --> E[Groq LLM Response]
	D --> F[Project/Resume/Skills Tool Data]
	E --> B
	F --> B
	B --> G[Interactive Cards + Visual Modules]
```

### Architecture Layers

| Layer | Responsibility | Tech |
|---|---|---|
| Interface Layer | Landing, chat, cards, responsive rendering | Next.js, React, Tailwind CSS, Framer Motion |
| Orchestration Layer | Prompting, route handlers, tool execution | Next.js API Routes, AI SDK |
| Intelligence Layer | Conversational response generation | Groq models |
| Content Layer | Projects, profile, skills, resume modules | TypeScript data/components |
| Delivery Layer | Build, deploy, environment security | Vercel, Node 20.x |

## Deployment Architecture

```text
User Browser -> Vercel Edge -> Next.js App Router -> API Route Handlers -> Groq / External APIs
```

- Primary production host: Vercel
- Runtime target: Node 20.x
- Secrets scope: deployment environment variables only

## Folder Structure

```text
ai-native-portfolio/
|- src/
|  |- app/
|  |  |- api/
|  |  |  |- chat/
|  |  |  |- games/
|  |  |  \- github-stars/
|  |  |- chat/
|  |  |- fonts/
|  |  |- layout.tsx
|  |  \- page.tsx
|  |- components/
|  |  |- chat/
|  |  |- projects/
|  |  |- ui/
|  |  \- *.tsx modules
|  |- hooks/
|  \- lib/
|- public/
|  \- projects/, media, logos, resume assets
|- assets/
|- .github/
|- README.md
|- LICENSE
\- package.json
```

### Structure Mapping

| Directory | Purpose |
|---|---|
| `src/app` | App Router pages, layout, and API endpoints |
| `src/components` | Reusable UI blocks and feature modules |
| `src/components/chat` | Chat UX, drawer tools, and game explorer |
| `src/components/projects` | Project showcase cards and project content data |
| `public` | Static assets (images, videos, logos, docs) |
| `.github` | Repository policy and security docs |

## Tech Stack

| Category | Technologies |
|---|---|
| Frontend | Next.js, React, TypeScript |
| UI/UX | Tailwind CSS, shadcn/ui patterns, Framer Motion |
| AI | AI SDK, Groq |
| Backend | Next.js route handlers |
| Tooling | ESLint, PNPM |
| Deployment | Vercel |

<div align="center">
	<img src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind,nodejs,vercel,github,vscode&theme=dark" alt="Stack icons" />
</div>

## Live Metrics

<div align="center">
	<img src="https://github-readme-stats.vercel.app/api?username=NuhashMaq&show_icons=true&theme=tokyonight&hide_border=true&rank_icon=github" alt="GitHub stats" height="165" />
	<img src="https://github-readme-streak-stats.herokuapp.com?user=NuhashMaq&theme=tokyonight&hide_border=true" alt="GitHub streak" height="165" />
</div>

<div align="center">
	<img src="https://github-readme-activity-graph.vercel.app/graph?username=NuhashMaq&bg_color=0f172a&color=38bdf8&line=22d3ee&point=f59e0b&area=true&hide_border=true" alt="Activity graph" width="100%" />
</div>

### Portfolio KPI Snapshot

| KPI | Focus |
|---|---|
| Response Experience | Conversation-first portfolio navigation |
| Build Stack | Production-grade React/Next TypeScript architecture |
| AI Layer | Tool-assisted responses with Groq-backed reasoning |
| Deployment | Vercel-hosted, environment-secured runtime |

## Interaction Flow

```mermaid
sequenceDiagram
	participant U as User
	participant FE as Next.js Frontend
	participant API as Chat API Route
	participant LLM as Groq Model
	U->>FE: Ask portfolio question
	FE->>API: Send query + context
	API->>LLM: Prompt + tool metadata
	LLM-->>API: Structured response
	API-->>FE: Render-ready answer
	FE-->>U: Conversational UI output
```

## Security and Privacy

- No hardcoded runtime secrets.
- Environment variables are used for provider credentials.
- Sensitive provider calls are server-side.
- Security response process is documented in [.github/SECURITY.md](.github/SECURITY.md).

## Operations and Monitoring

- Runtime health checks are enabled for portfolio uptime tracking.
- Monitoring-friendly endpoint is available for external probes.
- Production inference runs on an upgraded Groq usage profile for stable response quality.

Quick check:

```bash
curl http://localhost:3000/api/health
pnpm health:check
```

### Vercel Environment Checklist

- `GROQ_API_KEY` set in Production/Preview/Development
- `TMDB_API_KEY` set in Production/Preview/Development
- `GITHUB_REPO` set to `NuhashMaq/Portfolio_Maashfiiiiq`
- Optional `GITHUB_TOKEN` configured to reduce GitHub API rate limits

## Local Development

1. Clone repository

```bash
git clone https://github.com/NuhashMaq/Portfolio_Maashfiiiiq.git
cd Portfolio_Maashfiiiiq
```

2. Install dependencies

```bash
pnpm install
```

3. Configure `.env.local`

```env
GROQ_API_KEY=your_groq_api_key
TMDB_API_KEY=your_tmdb_api_key
GITHUB_TOKEN=your_github_token_optional
GITHUB_REPO=NuhashMaq/Portfolio_Maashfiiiiq
```

4. Run

```bash
pnpm dev
```

5. Open

```text
http://localhost:3000
```

## Connect

- Website: https://maashfiiiiq.vercel.app
- GitHub: https://github.com/NuhashMaq
- LinkedIn: https://www.linkedin.com/in/mashfiqnaushad/
- Instagram: https://www.instagram.com/__maashfiiiiq__/
- Email: mashfiq.cse.ruet@gmail.com

## License

This project is licensed under the Mashfiq Naushad Personal Portfolio License (MNPPL) v1.0.
See [LICENSE](LICENSE) for terms.

<div align="center">
	<img src="https://capsule-render.vercel.app/api?type=waving&section=footer&height=130&color=0:0F172A,40:0EA5E9,70:06B6D4,100:22D3EE" width="100%" alt="Footer banner" />
</div>
