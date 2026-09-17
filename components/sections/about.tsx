"use client";

import { SlideUp, StaggerChildren, StaggerItem } from "@/components/ui/animated";

const skills = [
  { category: "Frontend", items: ["React Native", "React", "Expo", "Next.js"] },
  { category: "Backend", items: ["Django", "FastAPI", "Python", "Celery", "ARQ", "Redis"] },
  { category: "Database", items: ["Supabase", "PostgreSQL"] },
  { category: "AI", items: ["LLM integration (OpenAI SDK, provider-agnostic)", "AI document processing (OCR + extraction)", "Agentic coding workflows (Claude Code, Cursor)"] },
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
            Building practical tools that{" "}
            <span className="text-primary">actually work</span>
          </h2>
        </SlideUp>

        <SlideUp delay={0.1}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted">
            I&apos;m Brian, a self-taught full-stack mobile developer from Philippines, building without a computer science background.
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground-muted">
            I build practical, AI-integrated tools. Apps that read messy documents, summarize information, and cut manual work down to seconds. I work primarily with React Native, Supabase, and Django, and every project here comes with a live demo you can try directly in your browser, no install required.
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground-muted">
            Open to freelance projects and part-time or contract roles. If you need someone who ships, not just talks about shipping, this is a good place to start.
          </p>
        </SlideUp>

        <StaggerChildren className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((group) => (
            <StaggerItem key={group.category} className="h-full">
              <div className="h-full rounded-xl border border-border bg-background-surface p-6 transition-all hover:border-primary/30 hover:shadow-md">
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
