import React from "react";
import { cn } from "@/lib/utils";

interface Props {
  name: string;
  onClick: (name: string) => void;
  isSelected?: boolean;
}
export function ProjectTag({ name, onClick, isSelected = false }: Props) {

  return (
    <button
      className={cn("focus-visible:border-ring focus-visible:ring-ring focus-visible:outline-ring rounded-full flex-1 outline-2 outline-transparent hover:bg-white/5 transition-all duration-200 hover:outline-primary  px-5 py-3  text-md cursor-pointer",
        isSelected ? "text-white outline-primary-400 bg-white/5" : "")}
      onClick={() => onClick(name)}
    >
      {name}
    </button>
  );
}
