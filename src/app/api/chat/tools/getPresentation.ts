import { tool } from 'ai';
import { z } from 'zod';

export const getPresentation = (tool as any)({
  description:
    'This tool returns a concise personal introduction of Mashfiq Naushad.',
  parameters: z.object({}),
  execute: async () => {
    return {
      presentation:
        "Here is a little bit about me, you can see it above!",
    };
  },
});