"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-bold tracking-tight">
          <span className="text-primary">brian</span>.saulan
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-foreground-muted sm:flex">
          <a href="#about" className="transition-colors hover:text-foreground">
            About
          </a>
          <a href="#apps" className="transition-colors hover:text-foreground">
            Apps
          </a>
          <a
            href="#contact"
            className="transition-colors hover:text-foreground"
          >
            Contact
          </a>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
