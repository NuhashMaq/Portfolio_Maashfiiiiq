import { tool } from 'ai';
import { z } from 'zod';

export const getInternship = (tool as any)({
  description:
    "Gives a summary of my current work experience, focus areas, and contact information.",
  parameters: z.object({}),
  execute: async () => {
    return `Here is my work and opportunity summary 👇

- 📅 **Availability**: Open to AI/ML opportunities
- 🌍 **Location**: Sylhet, Bangladesh
- 🧑‍💻 **Current Roles**:
  - AI/ML Engineer at BRITTOO.XYZ (Sept 2025 - Present)
  - Software Engineering Intern at VIVASOFT LIMITED (Jan 2026 - Present)
- 🛠️ **Focus**: NLP pipelines, LLM apps, RAG-based semantic search, backend services
- ✅ **What I bring**: Strong backend and pipeline engineering with practical AI deployments.

📬 **Contact me** via:
- Email: mashfiq.cse.ruet@gmail.com
- Phone: +880 1410 056159
- LinkedIn: LinkedIn
- Facebook: Facebook
- Portfolio: Portfolio

Let's build impactful AI systems together.
    `;
  },
});
