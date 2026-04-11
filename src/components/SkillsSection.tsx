import React from "react";
import { skillsByCategory } from "@/lib/constants";
import { ToolItem } from "@/components";
import { Brackets, Code, Database, Palette, Server, Wrench } from "lucide-react";
import { Skill } from "@/types";
type SkillCategoryProps = {
  icon: React.ReactNode;
  title: string;
  skills: Skill[];
}
function SkillCategory({icon, title, skills }: SkillCategoryProps) {
  return (
    <div className="flex flex-col gap-5 w-full mb-8 max-w-[400px]">
       <div className="flex items-center gap-2 bg-accent-foreground rounded-md px-4 py-2 w-fit">
            {icon}
          <h3 className="text-lg font-bold">{title}</h3>
          </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <ToolItem key={skill.id} tool={skill.tool} />
        ))}
      </div>
    </div>
  );
}
export function SkillsSection() {
  return (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8">
        <SkillCategory icon={<Brackets className="text-primary-500" />} title="Frontend" skills={skillsByCategory.frontend} />
        
        <SkillCategory icon={<Database className="text-primary-500" />} title="Backend" skills={skillsByCategory.backend} />
        <SkillCategory icon={<Wrench className="text-primary-500" />} title="Tools" skills={skillsByCategory.tools} />
        <SkillCategory icon={<Palette className="text-primary-500" />} title="Design" skills={skillsByCategory.design} />
        <SkillCategory icon={<Code className="text-primary-500" />} title="Other" skills={skillsByCategory.other} />

      </div>
  );
}
