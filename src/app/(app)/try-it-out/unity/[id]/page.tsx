"use client";

import UnityGame from "@/features/game/components/unity-game";
import { useProject } from "@/features/project/hooks";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const { project } = useProject(id);
  if (!project) {
    return <div>Project not found</div>;
  }
  return (
    <main className="flex-1 w-full h-full overflow-hidden">
      <section className="mx-auto w-full max-w-5xl h-full overflow-hidden bg-primary-foreground rounded-2xl shadow-md shadow-black/50 flex flex-col">
        <header className="shrink-0 px-4 py-4 md:px-8 md:py-6 border-b border-border/30 bg-primary-foreground/70 backdrop-blur-md">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-border/30 bg-secondary-foreground/60 px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary-foreground/80 transition-colors"
              >
                <ArrowLeft className="size-4" />
                Back
              </Link>
              <div>
                <h1 className="text-2xl font-bold">{project.title}</h1>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-hidden p-4 md:p-8">
          <div className="h-full w-full overflow-hidden rounded-xl border border-border/30 bg-black/10">
            <UnityGame gameId={id} />
          </div>
        </div>
      </section>
    </main>
  );
}
