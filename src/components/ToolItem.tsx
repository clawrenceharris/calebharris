import { Tool } from "@/types";
import Image from "next/image";
import React from "react";
import { ElevatedItem } from "@/components";

interface Props {
  tool: Tool;
}
export function ToolItem({ tool }: Props) {
  return (
    <ElevatedItem>
      <div className="inline-flex">
        <Image className="w-auto h-auto" width={20} height={20} alt={tool.name} src={tool.imageUrl} loading="lazy" />
      </div>

      {tool.name}
    </ElevatedItem>
  );
}
