"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

function formatSegment(segment: string): string {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function Breadcrumb() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);
  const crumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    return { label: formatSegment(segment), href };
  });

  const allCrumbs = [{ label: "Home", href: "/" }, ...crumbs];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allCrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: `${typeof window !== "undefined" ? window.location.origin : ""}${crumb.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <ol className="flex items-center gap-1.5">
          {allCrumbs.map((crumb, index) => {
            const isLast = index === allCrumbs.length - 1;
            return (
              <li key={crumb.href} className="flex items-center gap-1.5">
                {index > 0 && (
                  <span className="text-muted-foreground/50" aria-hidden="true">
                    /
                  </span>
                )}
                {isLast ? (
                  <span className="font-medium text-foreground" aria-current="page">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {crumb.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
