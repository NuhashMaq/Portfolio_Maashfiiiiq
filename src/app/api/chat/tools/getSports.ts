
import { tool } from "ai";
import { z } from "zod";


export const getSports = (tool as any)({
  description:
    "This tool shows extra profile highlights and activities.",
  parameters: z.object({}),
  execute: async () => {
    return "I actively participate in cultural and adventure clubs at RUET and take leadership roles in student organizations.";
  },
});