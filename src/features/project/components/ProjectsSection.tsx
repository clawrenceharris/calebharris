"use client";

import React, { Fragment, useRef } from "react";
import { ProjectCard } from "@/features/project/components";
import { useProjects } from "@/features/project/hooks";
import { AlertTriangle, List, Star } from "lucide-react";
import { Callout, ScrollArea, ScrollBar, Skeleton } from "@/components";

interface ProjectsSectionProps {
  onProjectClick?: (projectId: string) => void;
}

export function ProjectsSection({ onProjectClick }: ProjectsSectionProps) {
  const listRef = useRef(null);
  const { projects, isLoading, error } = useProjects();

  if (isLoading) {
    return (
      <>
        <h2 className="mb-8">My Projects</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-4 py-7">
          <Skeleton className="h-70 w-full rounded-xl" />
          <Skeleton className="h-70 w-full rounded-xl" />
          <Skeleton className="h-70 w-full rounded-xl" />
          <Skeleton className="h-70 w-full rounded-xl" />
          <Skeleton className="h-70 w-full rounded-xl" />
          <Skeleton className="h-70 w-full rounded-xl" />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <h2 className="mb-8">My Projects</h2>
        <Callout
          title="Something went wrong."
          description="Some projects failed to load. Please try again later."
          icon={<AlertTriangle />}
          variant="destructive"
        />
      </>
    );
  }

  return (
    <section className="min-w-0 space-y-8">
      <h2 className="sticky mb-8 text-4xl font-bold text-white">My Projects</h2>

      <section className="min-w-0">
        <div className="flex items-center gap-2">
          <Star fill="currentColor" className="size-5 text-white" />
          <h3 className="text-lg font-medium text-white">Favorites</h3>
        </div>
        <ScrollArea className="w-full min-w-0 py-4">
          <ul className="flex w-max gap-3 md:gap-6">
            {projects
              .filter((b) => b.favorited)
              .map((project) => (
                <li
                  key={project.id}
                  className="w-[min(100vw-6rem,28rem)] shrink-0"
                >
                  <ProjectCard
                    className="h-[60vh]"
                    project={project}
                    onProjectClick={onProjectClick}
                  />
                </li>
              ))}
          </ul>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>
      <section>
        <div className="flex items-center gap-2">
          <List className="size-5 text-white" />
          <h3 className="text-lg font-medium text-white">All Projects</h3>
        </div>
        <ul
          ref={listRef}
          className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-4 py-7"
        >
          {projects.map((project) => (
            <Fragment key={project.id}>
              {project.active && (
                <li>
                  <ProjectCard
                    project={project}
                    onProjectClick={onProjectClick}
                  />
                </li>
              )}
            </Fragment>
          ))}
        </ul>
      </section>
    </section>
  );
}
