import React, { useState } from "react";
import { Project } from "@/features/project/domain";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui";
import { Loader2 } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  onProjectClick?: (projectId: string) => void;
}

export function ProjectCard({ project, onProjectClick }: ProjectCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleClick = () => {
    if (onProjectClick) {
      onProjectClick(project.id);
    }
  };

  return (
    <button className="w-full h-[300px] rounded-xl" onClick={handleClick}>
      <Card
        className="p-0 relative cursor-pointer h-full text-left"
        role="button"
      >
        <div className="relative w-full h-full overflow-hidden rounded-t-xl">
          {!!project.featuredImage && (
            <>
              {!isImageLoaded && (
                <div className="absolute inset-0 z-10 grid place-items-center bg-black/20">
                  <Loader2 className="animate-spin text-white/80" />
                  <span className="sr-only">Loading image</span>
                </div>
              )}

              <Image
                src={project.featuredImage}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={[
                  "object-cover transition-opacity duration-300",
                  isImageLoaded ? "opacity-100" : "opacity-0",
                ].join(" ")}
                onLoadingComplete={() => setIsImageLoaded(true)}
              />
            </>
          )}
        </div>

        <CardContent className="text-white rounded-b-xl  pb-5 px-4">
          <div className="space-y-3">
            <div className="flex flex-col md:flex-row items-center justify-between ">
              <CardTitle className="text-xl font-semibold">
                {project.title}
              </CardTitle>
              <CardDescription>
                {!project?.endYear ? (
                  <i>{project.startYear + " - Present"}</i>
                ) : (
                  <i>{project.startYear + " - " + project.endYear}</i>
                )}
              </CardDescription>
            </div>
            <p className="text-muted-foreground">{project.tagline}</p>
          </div>
        </CardContent>
      </Card>
    </button>
  );
}
