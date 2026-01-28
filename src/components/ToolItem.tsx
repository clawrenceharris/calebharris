import { Tool } from "@/types";
import Image from "next/image";
import React from "react";

interface Props {
  tool: Tool;
}
export function ToolItem({ tool }: Props) {
  return (
    <div
      className="
      cursor-pointer
       border-[rgb(27,27,27)] border
    relative inline-flex items-center
    rounded-full pl-0.5 pt-0.5
    bg-neutral-[rgb(29,29,29)]
    text-sm 
    shadow-md
    bg-[linear-gradient(145deg,rgba(255,255,255,0.35),rgba(255,255,255,0.10)_35%,rgb(29,29,29))]
   
  "
    >
      <span className="gap-2 h-full items-center flex bg-secondary-foreground p-2 rounded-full">
        <div className="inline-flex">
        <Image width={20} height={20} alt={tool.name} src={tool.imageUrl} />
        </div>
       
        {tool.name}
      </span>
    </div>
  );
}
