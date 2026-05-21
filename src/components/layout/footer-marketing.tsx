"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import type { FooterColumn, NavItem } from "@/types/navigation";

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Services",
    links: [
      { label: "Services", href: "/services" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Pricing", href: "/pricing" },
      { label: "Features", href: "/features" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Team", href: "/team" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const SOCIAL_LINKS: NavItem[] = [
  { label: "Twitter", href: "https://twitter.com", external: true },
  { label: "GitHub", href: "https://github.com", external: true },
  { label: "LinkedIn", href: "https://linkedin.com", external: true },
];

const LEGAL_LINKS: NavItem[] = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms of Service", href: "/legal/terms" },
  { label: "Mentions Légales", href: "/legal/mentions-legales" },
];

interface FooterProps {
  columns?: FooterColumn[];
  brandName?: string;
}

export function Footer({
  columns = FOOTER_COLUMNS,
  brandName = "[CLIENT_NAME]",
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Brand + newsletter column */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-lg font-bold text-foreground">
              {brandName}
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Your digital partner.
            </p>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-sm font-medium text-foreground">
                Subscribe to our newsletter
              </p>
              <form
                className="mt-2 flex gap-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <Input
                  type="email"
                  placeholder="you@example.com"
                  className="max-w-56"
                  required
                />
                <Button type="submit" size="sm">
                  Subscribe
                </Button>
              </form>
              <p className="mt-2 text-xs text-muted-foreground">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>

          {/* Nav columns */}
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-foreground">
                {column.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social links */}
        <div className="mt-10 flex gap-4">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              aria-label={link.label}
            >
              {link.label}
            </a>
          ))}
        </div>

        <Separator className="my-8" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} {brandName}. All rights reserved.
          </p>
          <nav className="flex gap-4" aria-label="Legal">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
