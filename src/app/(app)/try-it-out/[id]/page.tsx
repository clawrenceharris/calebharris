"use client";

import { Button, Callout, Skeleton } from "@/components";
import { useProject } from "@/hooks";
import {
  AlertTriangle,
  ArrowLeft,
  ExternalLink,
  FileWarning,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const { project, isLoading, error } = useProject(id);
  const router = useRouter();

  return (
    <main className="h-full w-full flex-1 overflow-hidden">
      <section className="bg-primary-foreground mx-auto flex h-full w-full max-w-5xl flex-col overflow-hidden rounded-2xl shadow-md shadow-black/50">
        <header className="border-border/30 bg-primary-foreground/70 shrink-0 border-b px-4 py-4 backdrop-blur-md md:px-8">
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
                className="border-border/30 bg-primary-500 hover:bg-primary-600 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-colors"
              >
                <ExternalLink className="size-4" />
                Visit Project
              </Link>
            )}
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-hidden p-4">
          <div className="border-border/30 h-full min-h-[500px] w-full overflow-hidden rounded-xl border bg-black/10">
            {isLoading ? (
              <Skeleton className="flex h-full min-h-[500px] w-full items-center justify-center rounded-xl border-0">
                <Loader2 className="animate-spin" />
              </Skeleton>
            ) : error ? (
              <div className="flex min-h-[500px] items-center justify-center">
                <Callout
                  title="Something went wrong."
                  description="The project failed to load. Please try again later."
                  icon={<AlertTriangle />}
                  variant="destructive"
                />
              </div>
            ) : !project ? (
              <div className="flex min-h-[500px] items-center justify-center">
                <Callout
                  title="Project not found."
                  description="The project you are looking for does not exist."
                  icon={<AlertTriangle />}
                  variant="destructive"
                />
              </div>
            ) : !project.demoLink ? (
              <div className="flex min-h-[500px] items-center justify-center">
                <Callout
                  title="Demo unavailable"
                  description="This project is not set up to preview yet."
                  icon={<FileWarning />}
                  variant="warning"
                />
              </div>
            ) : (
              <iframe
                src={project.demoLink}
                className="h-full min-h-[500px] w-full rounded-xl border-0"
                title={project.title}
              />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
