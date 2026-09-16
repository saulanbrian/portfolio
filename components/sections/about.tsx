"use client";

import { SlideUp, StaggerChildren, StaggerItem } from "@/components/ui/animated";

const skills = [
  { category: "Mobile", items: ["React Native", "Expo", "iOS", "Android"] },
  { category: "Backend", items: ["Node.js", "Python", "PostgreSQL", "Redis"] },
  { category: "Tools", items: ["TypeScript", "Docker", "CI/CD", "AWS"] },
  { category: "Specialties", items: ["PDF Processing", "Image Processing", "File Handling", "Offline-First"] },
];

export function About() {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SlideUp>
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
            About
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Building mobile experiences that{" "}
            <span className="text-primary">matter</span>
          </h2>
        </SlideUp>

        <SlideUp delay={0.1}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted">
            I specialize in fullstack mobile development with a focus on
            real-world file processing. My apps handle PDFs and images —
            tasks that usually require desktop software — and make them
            effortless on mobile.
          </p>
        </SlideUp>

        <StaggerChildren className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((group) => (
            <StaggerItem key={group.category}>
              <div className="rounded-xl border border-border bg-background-surface p-6 transition-all hover:border-primary/30 hover:shadow-md">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
                  {group.category}
                </h3>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm text-foreground-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
