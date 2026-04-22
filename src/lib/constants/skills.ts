import { tools } from "@/lib/constants";
import { Skill } from "@/types";
import { ToolName } from "@/lib/constants/tools";
// Grouped skills by category for easier sectioning in the UI
export const skillsByCategory: Record<
  "frontend" | "backend" | "tools" | "design" | "other",
  Skill[]
> = {
  frontend: [
    {
      id: "1",
      tool: tools[ToolName.React],
    },
    {
      id: "2",
      tool: tools[ToolName.NextJS],
    },
    {
      id: "3",
      tool: tools[ToolName.HTML],
    },
    {
      id: "4",
      tool: tools[ToolName.CSS],
    },
    {
      id: "5",
      tool: tools[ToolName.JavaScript],
    },
    {
      id: "6",
      tool: tools[ToolName.TypeScript],
    },
    {
      id: "7",
      tool: tools[ToolName.Tailwind],
    },
    {
      id: "8",
      tool: tools[ToolName.Sass],
    },
  ],
  backend: [
   
    {
      id: "12",
      tool: tools[ToolName.Express],
    },
    {
      id: "13",
      tool: tools[ToolName.Supabase],
    },
    {
      id: "14",
      tool: tools[ToolName.PostgreSQL],
    },
    {
      id: "15",
      tool: tools[ToolName.Prisma],
    },
    
  ],
  tools: [
    {
      id: "14",
      tool: tools[ToolName.Git],
    },
    {
      id: "15",
        tool: tools[ToolName.Unity],
    },
  ],
  design: [
    {
      id: "16",
      tool: tools[ToolName.Figma],
    },
    {
      id: "17",
      tool: tools[ToolName.Photoshop],
    },
  ],
  other: [
    {
      id: "9",
      tool: tools[ToolName.Python],
    },
    {
      id: "10",
      tool: tools[ToolName.Java],
    },
    {
      id: "11",
      tool: tools[ToolName.CSharp],
    },
    // You can add more tools here if needed
  ],
};
