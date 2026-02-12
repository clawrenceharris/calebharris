"use client";

import { Button, Callout, Skeleton } from "@/components";
import { useProject } from "@/features/project/hooks";
import {
  AlertTriangle,
  ArrowLeft,
  ExternalLink,
  FileExclamationPoint,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const { project, isLoading, error } = useProject(id);
  const router = useRouter();

  return (
    <main className="flex-1 w-full h-full overflow-hidden">
      <section className="mx-auto w-full max-w-5xl h-full overflow-hidden bg-primary-foreground rounded-2xl shadow-md shadow-black/50 flex flex-col">
        <header className="shrink-0 px-4 py-4 md:px-8 md:py-6 border-b border-border/30 bg-primary-foreground/70 backdrop-blur-md">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Button onClick={() => router.back()} variant="outline">
                <ArrowLeft className="size-4" />
                Back
              </Button>
              {project && (
                <div>
                  <h1 className="text-2xl font-bold">{project.title}</h1>
                </div>
              )}
            </div>
            {project && project.demoLink && (
              <Link
                href={project.demoLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border/30 bg-primary-500 px-4 py-2 text-sm font-bold hover:bg-primary-600 transition-colors"
              >
                <ExternalLink className="size-4" />
                Visit Project
              </Link>
            )}
          </div>
        </header>

        <div className="flex-1 min-h-0 overflow-hidden p-4 md:p-8">
          <div className="h-full w-full min-h-[500px] overflow-hidden rounded-xl border border-border/30 bg-black/10">
            {isLoading ? (
              <Skeleton className="w-full h-full flex justify-center items-center min-h-[500px] border-0 rounded-xl">
                <Loader2 className="animate-spin" />
              </Skeleton>
            ) : error ? (
              <div className="flex justify-center items-center min-h-[500px]">
                <Callout
                  title="Something went wrong."
                  description="The project failed to load. Please try again later."
                  icon={<AlertTriangle />}
                  variant="destructive"
                />
              </div>
            ) : !project ? (
              <div className="flex justify-center items-center min-h-[500px]">
                <Callout
                  title="Project not found."
                  description="The project you are looking for does not exist."
                  icon={<AlertTriangle />}
                  variant="destructive"
                />
              </div>
            ) : !project.demoLink ? (
              <div className="flex justify-center items-center min-h-[500px]">
                <Callout
                  title="Demo unavailable"
                  description="This project is not set up to preview yet."
                  icon={<FileExclamationPoint />}
                  variant="warning"
                />
              </div>
            ) : (
              <iframe
                src={project.demoLink}
                className="w-full h-full min-h-[500px] border-0 rounded-xl"
                title={project.title}
              />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
