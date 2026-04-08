import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui";

export function Navbar() {
  return (
      <TabsList role="navigation" className="z-40 px-8 pt-6  flex sticky top-0 md:flex flex-1  w-full">
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="projects">Projects</TabsTrigger>
        <TabsTrigger value="contact">Contact</TabsTrigger>
      </TabsList>
  );
}
