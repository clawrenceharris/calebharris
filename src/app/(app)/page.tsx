"use client";

import { Suspense } from "react";
import HomePage from "./HomePage";
import { TooltipProvider } from "@/components";

export default function Home() {
  return (
   

    
    <Suspense
      fallback={
        <div className="flex h-dvh w-full items-center justify-center text-muted-foreground">
          Loading...
        </div>
      }
    >
      <TooltipProvider>
        <HomePage />
      </TooltipProvider>
    </Suspense>
   
  );
}
