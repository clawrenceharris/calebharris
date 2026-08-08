import React, { useState } from "react";
import { Project } from "@/features/project/domain";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui";
import { Loader2, Star } from "lucide-react";
import { Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
interface ProjectCardProps {
  project: Project;
  onProjectClick?: (projectId: string) => void;
  className?: string;
}

export function ProjectCard({
  project,
  onProjectClick,
  className,
}: ProjectCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleClick = () => {
    if (onProjectClick) {
      onProjectClick(project.id);
    }
  };

  return (
    <Card
      onClick={handleClick}
      tabIndex={0}
      aria-label={`View project ${project.title}`}
      className={cn(
        "border-muted relative h-75 w-full cursor-pointer rounded-2xl border-2 p-0 text-left",
        className,
      )}
      role="button"
    >
      {project.favorited && (
        <Star
          fill="currentColor"
          className="absolute top-4 right-4 z-10 size-6 text-white"
        />
      )}
      <div className="relative h-full w-full overflow-hidden rounded-t-xl">
        {!isImageLoaded && (
          <div className="absolute inset-0 z-10 grid place-items-center bg-black/20">
            <Loader2 className="animate-spin text-white/80" />
            <span className="sr-only">Loading image</span>
          </div>
        )}

        {project.featuredImage ? (
          <Image
            src={project.featuredImage}
            alt={project.title}
            fill
            loading="eager"
            sizes="(max-width: 768px) h-auto w-auto 100vw, 33vw"
            className={[
              "object-cover transition-opacity duration-300",
              isImageLoaded ? "opacity-100" : "opacity-0",
            ].join(" ")}
            onLoad={() => setIsImageLoaded(true)}
          />
        ) : (
          <ImageIcon className="text-muted-foreground size-9" />
        )}
      </div>

      <CardContent className="rounded-b-xl px-4 pb-5 text-white">
        <div className="space-y-3">
          <div className="flex flex-col justify-between md:flex-row md:items-center">
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
  );
}
