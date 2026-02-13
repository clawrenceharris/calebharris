import React, { ReactNode } from "react";
import {
  ElevatedItem,
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  description: string;
  icon?: ReactNode;
  descriptionClassName?: string;
  titleClassName?: string;
  className?: string;
}
export function InfoItem({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
  icon,
}: Props) {
  return (
    <Item
      className={cn(
        "flex backdrop-blur-xl  bg-black/10 flex-row items-center gap-3 text-sm rounded-xl hover:bg-black/20",
        className,
      )}
    >
      {icon && (
        <ItemMedia>
          <ElevatedItem className="text-primary-500">{icon}</ElevatedItem>
        </ItemMedia>
      )}

      <ItemContent className="line-clamp-1 ">
        <ItemTitle
          className={cn(
            "text-[#ADB7BE] text-sm uppercase flex items-center",
            titleClassName,
          )}
        >
          {title}
        </ItemTitle>
        <ItemDescription className={cn("text-ellipsis", descriptionClassName)}>
          {description}
        </ItemDescription>
      </ItemContent>
    </Item>
  );
}
