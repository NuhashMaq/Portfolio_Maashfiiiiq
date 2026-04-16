
import { tool } from "ai";
import { z } from "zod";


export const getProjects = (tool as any)({
  description:
    "This tool will show a list of all projects made by Mashfiq Naushad",
  parameters: z.object({}),
  execute: async () => {
    return [
      'Here are all my projects:',
      '- EduPredict - AI Performance Analysis Platform',
      '- Smart Rural Health Assistant',
      '- HoloHype - Immersive Commerce Interface',
      '- YouTube UI Clone',
      '',
      'Ask me about any project and I can explain architecture, stack choices, and outcomes.',
    ].join('\n');
  },
});