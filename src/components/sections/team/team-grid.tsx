import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import type { TeamMember } from "@/lib/content/types";

const socialIcons: Record<string, string> = {
  linkedin: "LinkedIn",
  twitter: "Twitter",
  github: "GitHub",
  instagram: "Instagram",
  youtube: "YouTube",
  facebook: "Facebook",
};

interface TeamGridProps {
  members: TeamMember[];
  heading?: string;
  columns?: 2 | 3 | 4;
}

export function TeamGrid({
  members,
  heading,
  columns = 3,
}: TeamGridProps) {
  const gridCols: Record<number, string> = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section className="px-4 py-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        {heading && (
          <h2 className="font-heading mb-10 text-center text-3xl font-bold tracking-tight text-foreground">
            {heading}
          </h2>
        )}
        <div className={`grid gap-6 ${gridCols[columns]}`}>
          {members.map((member) => (
            <Card key={member.name} className="text-center">
              <CardContent className="flex flex-col items-center gap-3 pt-2">
                <div className="relative size-24 overflow-hidden rounded-full">
                  <Image
                    src={member.image.src}
                    alt={member.image.alt}
                    width={member.image.width ?? 96}
                    height={member.image.height ?? 96}
                    className="size-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
                {member.bio && (
                  <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {member.bio}
                  </p>
                )}
                {member.socialLinks && member.socialLinks.length > 0 && (
                  <div className="flex gap-3">
                    {member.socialLinks.map((link) => (
                      <a
                        key={link.platform}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                      >
                        {socialIcons[link.platform] ?? link.platform}
                      </a>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
