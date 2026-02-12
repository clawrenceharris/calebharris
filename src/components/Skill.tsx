import React from "react";
import { ToolItem } from "./ToolItem";
import { Skill as SkillType } from "@/types";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui";

export function Skill({ skill }: { skill: SkillType }) {
  const levels = [
    "Novice",
    "Advanced Beginner",
    "Competent",
    "Proficient",
    "Advanced",
  ];

  return (
    <Tooltip>
      <TooltipTrigger>
        <ToolItem tool={skill.tool} />
      </TooltipTrigger>
      <TooltipContent>{levels[skill.skillLevel - 1]}</TooltipContent>
    </Tooltip>
  );
}
