import React, { SVGProps } from "react";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components";
import { cn } from "@/lib/utils";

interface CalloutProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  variant?: "info" | "success" | "destructive";
}
export function Callout({
  variant = "info",
  icon,
  title,
  description,
}: CalloutProps) {
  return (
    <Item className="flex gap-4 max-w-xl items-center bg-secondary-foreground px-5 py-3 rounded-xl">
      {icon && (
        <ItemMedia
          className={cn(
            "border-2 size-11 p-1.5 rounded-full",
            variant === "info"
              ? "border-blue-500 bg-blue-100 text-blue-500"
              : "",
            variant === "success"
              ? " border-success-500 bg-success-100 text-success-500"
              : "",
            variant === "destructive"
              ? " border-destructive-500 bg-destructive-100 text-destructive-500"
              : "",
          )}
        >
          {icon}
        </ItemMedia>
      )}
      <ItemContent>
        <ItemTitle className="text-xl font-bold font-sans text-white">
          {title}
        </ItemTitle>
        {description && <ItemDescription>{description}</ItemDescription>}
      </ItemContent>
    </Item>
  );
}
