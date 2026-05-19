"use client";

import Link from "next/link";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import type { NavItem } from "@/types/navigation";

interface NavbarMobileProps {
  items: NavItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NavbarMobile({ items, open, onOpenChange }: NavbarMobileProps) {
  return (
    <Drawer direction="right" open={open} onOpenChange={onOpenChange}>
      <DrawerContent
        className="ml-auto h-full w-80 max-w-[85vw] rounded-none"
        aria-describedby={undefined}
      >
        <DrawerHeader className="flex items-center justify-between border-b border-border px-4">
          <DrawerTitle className="text-lg font-semibold">Menu</DrawerTitle>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon">
              <X className="size-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <ul className="space-y-1">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  onClick={() => onOpenChange(false)}
                  className="flex items-center rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted"
                >
                  {item.label}
                  {item.external && (
                    <span className="ml-1 text-xs text-muted-foreground">↗</span>
                  )}
                </Link>
                {item.children && (
                  <ul className="ml-4 space-y-1 border-l border-border pl-3">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          target={child.external ? "_blank" : undefined}
                          rel={child.external ? "noopener noreferrer" : undefined}
                          onClick={() => onOpenChange(false)}
                          className="flex items-center rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <DrawerFooter className="border-t border-border px-4">
          <Link
            href="/contact"
            onClick={() => onOpenChange(false)}
            className={cn(buttonVariants({ size: "lg" }), "w-full")}
          >
            Get Started
          </Link>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
