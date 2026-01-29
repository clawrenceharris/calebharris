import { cn } from "@/lib/utils";
import React from "react";

export function ElevatedItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        `
      cursor-pointer
       border-[rgb(27,27,27)] border
    relative inline-flex items-center
    rounded-full pl-0.5 pt-0.5
    bg-neutral-[rgb(29,29,29)]
    text-sm 
    shadow-md
    
    bg-[linear-gradient(145deg,rgba(255,255,255,0.35),rgba(255,255,255,0.10)_35%,rgb(29,29,29))]
   
  `,
        className,
      )}
    >
      <span className="gap-2 h-full items-center flex bg-secondary-foreground p-2 rounded-full">
        {children}
      </span>
    </div>
  );
}
