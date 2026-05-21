import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/content/types";

interface PortfolioGridProps {
  projects: Project[];
  heading?: string;
  columns?: 2 | 3;
}

export function PortfolioGrid({
  projects,
  heading,
  columns = 3,
}: PortfolioGridProps) {
  const gridCols =
    columns === 2
      ? "md:grid-cols-2"
      : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="px-4 py-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        {heading && (
          <h2 className="font-heading mb-10 text-center text-3xl font-bold tracking-tight text-foreground">
            {heading}
          </h2>
        )}
        <div className={`grid gap-6 ${gridCols}`}>
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={project.url ?? `/projects/${project.slug}`}
              className="group"
            >
              <Card className="h-full transition-shadow hover:shadow-md">
                <div className="relative aspect-video overflow-hidden rounded-t-xl">
                  <Image
                    src={project.mainImage.src}
                    alt={project.mainImage.alt}
                    width={project.mainImage.width ?? 600}
                    height={project.mainImage.height ?? 340}
                    className="size-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardContent className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {project.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {project.client}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary">
                    {project.title}
                  </h3>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {project.description}
                  </p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="text-xs font-normal"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
