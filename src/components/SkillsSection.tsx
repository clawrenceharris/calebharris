import React from "react";
import { skills } from "@/constants/skills";
import { Skill } from "@/components";

export function SkillsSection() {
  return (
    <>
      <h2 className="text-4xl font-bold text-white mb-6">My Skills</h2>
      <div className="flex flex-wrap gap-6 items-center">
        {skills.map((skill) => (
         <Skill key={skill.id} skill={skill}/>
        ))}
      </div>
    </>
  );
}
