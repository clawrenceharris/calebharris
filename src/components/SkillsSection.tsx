import React from "react";
import { skills } from "@/lib/constants";
import { Skill } from "@/components";

export function SkillsSection() {
  return (
    <>
      <div className="flex flex-wrap gap-6 items-center">
        {skills.map((skill) => (
          <Skill key={skill.id} skill={skill} />
        ))}
      </div>
    </>
  );
}
