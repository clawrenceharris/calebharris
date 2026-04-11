import { tools } from "@/lib/constants";
import { Skill } from "@/types";

// Grouped skills by category for easier sectioning in the UI
export const skillsByCategory: Record<
  "frontend" | "backend" | "tools" | "design" | "other",
  Skill[]
> = {
  frontend: [
    {
      id: "1",
      tool: tools.react,
    },
    {
      id: "2",
      tool: tools.nextjs,
    },
    {
      id: "3",
      tool: tools.html,
    },
    {
      id: "4",
      tool: tools.css,
    },
    {
      id: "5",
      tool: tools.javascript,
    },
    {
      id: "6",
      tool: tools.typescript,
    },
    {
      id: "7",
      tool: tools.tailwind,
    },
    {
      id: "8",
      tool: tools.sass,
    },
  ],
  backend: [
   
    {
      id: "12",
      tool: tools.express,
    },
    {
      id: "13",
      tool: tools.supabase,
    },
  ],
  tools: [
    {
      id: "14",
      tool: tools.git,
    },
    {
      id: "15",
      tool: tools.unity,
    },
  ],
  design: [
    {
      id: "16",
      tool: tools.figma,
    },
    {
      id: "17",
      tool: tools.photoshop,
    },
  ],
  other: [
    {
      id: "9",
      tool: tools.python,
    },
    {
      id: "10",
      tool: tools.java,
    },
    {
      id: "11",
      tool: tools.csharp,
    },
    // You can add more tools here if needed
  ],
};
