import { Tool } from "@/types";
export const enum ToolName {
  Unity = "unity",
  Tailwind = "tailwind",
  JavaScript = "javascript",
  Java = "java",
  Git = "git",
  React = "react",
    TypeScript = "typescript",
  CSharp = "csharp",
  CSS = "css",
  HTML = "html",
  NextJS = "nextjs",
  Python = "python",
  Express = "express",
  Figma = "figma",
  Photoshop = "photoshop",
  Sass = "sass",
  Supabase = "supabase",
  PostgreSQL = "postgresql",
  Prisma = "prisma",
}
export const tools: Record<string, Tool> = {
  [ToolName.Unity]: {
    id: "1",
    imageUrl: "https://i.ibb.co/0MfdvxV/unity.png",
      name: "Unity",
  },
  [ToolName.Tailwind]: {
    id: "2",
    imageUrl: "https://i.ibb.co/tJ70m5g/Tailwind-CSS-Logo-svg.png",
    name: "Tailwind",
  },

  [ToolName.JavaScript]: {
    id: "3",
    name: "JavaScript",
    imageUrl: "https://i.ibb.co/wSJTygg/js.png",
  },
  [ToolName.Java]: {
    id: "4",
    name: "Java",
    imageUrl: "https://i.ibb.co/KWFND31/java.png",
  },

  [ToolName.Git]: {
    id: "6",
    imageUrl: "https://i.ibb.co/QkNnMjv/Git-icon-svg.png",
    name: "Git",
  },

  [ToolName.React]: {
    id: "7",
    name: "React",
    imageUrl: "https://i.ibb.co/5K9yz4L/react-logo.png",
  },

  [ToolName.TypeScript]: {
    id: "8",
    name: "TypeScript",
    imageUrl: "https://i.ibb.co/kKw3gzG/typescript.png",
  },
    [ToolName.CSharp]: {
    id: "9",
    name: "C#",
    imageUrl: "https://i.ibb.co/jh79z6p/c-sharp.png",
  },
  [ToolName.CSS]: {
    id: "10",
    name: "CSS",
    imageUrl: "https://i.ibb.co/0sGFZKv/css-3.png",
  },
  [ToolName.HTML]: {
    id: "11",
    name: "HTML",
    imageUrl: "https://i.ibb.co/D5hb0tn/html-5.png",
  },

  [ToolName.NextJS]: {
    id: "12",
    name: "NextJS",
    imageUrl: "https://i.ibb.co/QrhgVcR/nextjs-256x256.png",
  },
  [ToolName.Python]: {
    id: "13",
      name: "Python",
    imageUrl: "https://i.ibb.co/MZh1pbd/python.png",
  },
  [ToolName.Express]: {
    id: "14",
    name: "Express",
    imageUrl: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/express-js-icon.png",
  },
    [ToolName.Figma]: {
    id: "15",
    name: "Figma",
    imageUrl:
      "https://img.icons8.com/?size=100&id=W0YEwBDDfTeu&format=png&color=000000",
  },
  
  [ToolName.Photoshop]: {
    id: "16",
    name: "Photoshop",
    imageUrl: "https://i.ibb.co/hXvhCbh/photoshop-png-logo-3085.png",
  },

  [ToolName.Sass]: {
    id: "17",
    name: "Sass",
    imageUrl: "https://sass-lang.com/assets/img/styleguide/seal-color.png",
  },

  [ToolName.Supabase]: {
    id: "18",
    name: "Supabase",
    imageUrl: "https://img.icons8.com/?size=100&id=grZaE9tjqDyr&format=png&color=000000g",
  },
  [ToolName.PostgreSQL]: {
    id: "19",
    name: "PostgreSQL",
    imageUrl: "https://i.ibb.co/s7qZ6NG/postgresql-relational-database-management-system-object-relational-database-elephants-0cb587a1994577.png",
  },
  [ToolName.Prisma]: {
    id: "20",
    name: "Prisma",
    imageUrl: "https://i.ibb.co/7NZCxx8J/pngwing-com.png",
  },
  
};
