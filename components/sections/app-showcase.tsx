"use client";

import Link from "next/link";
import { apps } from "@/lib/shared/apps";
import { SlideUp, StaggerChildren, StaggerItem } from "@/components/ui/animated";

export function AppShowcase() {
  return (
    <section id="apps" className="py-24 bg-background-alt">
      <div className="mx-auto max-w-6xl px-6">
        <SlideUp>
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
            Interactive Demos
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Try before you download
          </h2>
          <p className="mt-4 max-w-xl text-lg text-foreground-muted">
            Click any app to open its interactive demo. Upload a file and get
            the same results as the real app.
          </p>
        </SlideUp>

        <StaggerChildren className="mt-12 grid gap-6 sm:grid-cols-2">
          {apps.map((app) => (
            <StaggerItem key={app.slug}>
              <Link href={`/apps/${app.slug}`} className="group block">
                <div className="rounded-xl border border-border bg-background-surface p-8 transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
                  <div className="mb-4 text-4xl">{app.icon}</div>
                  <h3 className="text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                    {app.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                    {app.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {app.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 text-sm font-medium text-primary transition-transform group-hover:translate-x-1">
                    Try it now →
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
