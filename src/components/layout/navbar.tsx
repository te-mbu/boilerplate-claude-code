"use client";

import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/navigation";

// Lazy-load mobile drawer — desktop users never download this chunk
const NavbarMobile = lazy(() =>
  import("@/components/layout/navbar-mobile").then((m) => ({ default: m.NavbarMobile }))
);

const NAV_ITEMS: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

interface NavbarProps {
  items?: NavItem[];
  brandName?: string;
  variant?: "default" | "transparent";
}

export function Navbar({
  items = NAV_ITEMS,
  brandName = "[CLIENT_NAME]",
  variant = "default",
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const isScrolled = window.scrollY > 16;
    setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const isTransparent = variant === "transparent" && !scrolled;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-200",
        isTransparent
          ? "bg-transparent"
          : "border-b border-border bg-background/80 backdrop-blur-lg"
      )}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-foreground">
          <span className="text-lg">{brandName}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
                isTransparent
                  ? "text-white/80 hover:text-white hover:bg-white/10"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA + Mobile toggle */}
        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className={cn(buttonVariants({ size: "sm" }), "hidden md:inline-flex")}
          >
            Contact
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <Suspense fallback={null}>
          <NavbarMobile
            items={items}
            open={mobileOpen}
            onOpenChange={setMobileOpen}
          />
        </Suspense>
      )}
    </header>
  );
}
