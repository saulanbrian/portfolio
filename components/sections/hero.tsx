"use client";

import { SlideUp } from "@/components/ui/animated";

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden">
      {/* Cinematic gradient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-1/4 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 py-24">
        <SlideUp>
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
            Fullstack Mobile Developer
          </p>
        </SlideUp>

        <SlideUp delay={0.1}>
          <h1 className="max-w-3xl text-5xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-7xl">
            I build apps you can{" "}
            <span className="text-primary">try right here</span>
          </h1>
        </SlideUp>

        <SlideUp delay={0.2}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground-muted">
            No downloads. No sign-ups. Upload a file, see the magic.
            Interactive demos of my mobile apps — running live in your browser.
          </p>
        </SlideUp>

        <SlideUp delay={0.3}>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#apps"
              className="inline-flex h-12 items-center rounded-pill bg-primary px-8 text-sm font-medium text-primary-foreground transition-all hover:scale-105 hover:shadow-lg"
            >
              Try My Apps
            </a>
            <a
              href="#about"
              className="inline-flex h-12 items-center rounded-pill border border-border px-8 text-sm font-medium text-foreground transition-all hover:border-primary/50 hover:text-primary"
            >
              Learn More
            </a>
          </div>
        </SlideUp>
      </div>
    </section>
  );
}
