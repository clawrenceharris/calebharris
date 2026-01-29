import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui";

export function Navbar() {
  return (
    <div className="min-w-full z-99 px-8 pt-5 justify-end flex mb-6 sticky top-0">
      <TabsList className=" md:flex flex-1 max-w-md w-full">
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="projects">Projects</TabsTrigger>
        <TabsTrigger value="contact">Contact</TabsTrigger>
      </TabsList>
    </div>
  );
}
