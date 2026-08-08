"use client";

import { Suspense } from "react";
import HomePage from "./HomePage";
import { TooltipProvider } from "@/components";

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="text-muted-foreground flex h-dvh w-full items-center justify-center">
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
