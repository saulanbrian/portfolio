"use client";

import { useEffect, useRef, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const initialized = useRef(false);

  // Initialize from localStorage/system — sync DOM only, no setState
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const saved = localStorage.getItem("theme");
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const isDark = saved ? saved === "dark" : systemDark;

    // Sync state without triggering effect re-render
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background-surface transition-colors hover:bg-background-alt"
    >
      <svg
        className="h-4 w-4 text-foreground-muted transition-all duration-300"
        style={{
          transform: dark ? "rotate(0deg) scale(1)" : "rotate(90deg) scale(0)",
          opacity: dark ? 1 : 0,
          position: "absolute",
        }}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
      <svg
        className="h-4 w-4 text-foreground-muted transition-all duration-300"
        style={{
          transform: dark ? "rotate(-90deg) scale(0)" : "rotate(0deg) scale(1)",
          opacity: dark ? 0 : 1,
          position: "absolute",
        }}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    </button>
  );
}
