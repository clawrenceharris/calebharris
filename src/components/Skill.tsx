import React from "react";
import { ToolItem } from "./ToolItem";
import { Skill as SkillType } from "@/types";

export function Skill({ skill }: { skill: SkillType }) {
  const levels = [
    "Novice",
    "Advanced Beginner",
    "Competent",
    "Proficient",
    "Advanced",
  ];
  /**
   * 
  
  const style = {
    .callout-container {
      position: relative;
      display: inline-block;
    }
    .callout-box {
      position: absolute;
      top: 90%;
      border-radius: 15px;
      font-size: small;
      z-index: 100;
      left: 50%;
      transform: translateX(-50%);
      background-color: #121212;
      color: #fff;
      text-align: center;
      min-width: 100px;
      padding: 5px;
      border-radius: 5px;
      display: none;
    }
    
  }
   */
  return (
    <div className="relative group">
      <ToolItem
        tool={skill.tool}
      />
        <div className="absolute left-1/2 bg-accent-foreground hidden group-hover:block min-w-[100px] text-center rounded-md -translate-x-1/2 z-9 font-sm p-2 top-full">
          {levels[skill.skillLevel - 1]}
        </div>
    </div>
  );
}
