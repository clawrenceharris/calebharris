import React, { ReactNode } from "react";
import {
  ElevatedItem,
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components";

interface Props {
  title: string;
  description: string;
  icon?: ReactNode;
}
export function InfoItem({ title, description, icon }: Props) {
  return (
    <Item className="flex backdrop-blur-xl bg-black/10 flex-row items-center gap-3 text-sm rounded-xl hover:bg-black/20">
      {icon && (
        <ItemMedia>
          <ElevatedItem className="text-primary-500">{icon}</ElevatedItem>
        </ItemMedia>
      )}

      <ItemContent>
        <ItemTitle className="text-[#ADB7BE] text-sm uppercase flex items-center ">
          {title}
        </ItemTitle>
        <ItemDescription className="text-sm">{description}</ItemDescription>
      </ItemContent>
    </Item>
  );
}
