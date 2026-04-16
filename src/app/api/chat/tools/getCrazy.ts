
import { tool } from "ai";
import { z } from "zod";


export const getCrazy = (tool as any)({
  description:
    "This tool will tell the craziest thing I've ever done. Use it when the user asks something like: 'What's the craziest thing you've ever done?'",
  parameters: z.object({}),
  execute: async () => {
    return "One of the craziest things I built is a full AI health assistant with bilingual support, disease prediction, and severity triage designed for underserved rural communities.";
  },
});