"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import type { NavItem } from "@/types/navigation";

const NAV_LINKS: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const SOCIAL_LINKS: NavItem[] = [
  { label: "LinkedIn", href: "https://linkedin.com", external: true },
  { label: "Instagram", href: "https://instagram.com", external: true },
];

const LEGAL_LINKS: NavItem[] = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms of Service", href: "/legal/terms" },
  { label: "Mentions Légales", href: "/legal/mentions-legales" },
];

interface FooterProps {
  navLinks?: NavItem[];
  brandName?: string;
}

export function Footer({
  navLinks = NAV_LINKS,
  brandName = "[CLIENT_NAME]",
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Top: brand + nav + social */}
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <Link href="/" className="text-lg font-bold text-foreground">
            {brandName}
          </Link>

          <nav className="flex flex-wrap justify-center gap-6" aria-label="Footer navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex gap-4">
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
        </div>

        <Separator className="my-6" />

        {/* Bottom: copyright + legal */}
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
