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
        <div className="flex flex-col-reverse items-center gap-12 lg:flex-row lg:items-center">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-left">
            <SlideUp>
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
                Full-Stack Mobile Developer
              </p>
            </SlideUp>

            <SlideUp delay={0.1}>
              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                Skip the download.{" "}
                <span className="text-primary">Try the real thing.</span>
              </h1>
            </SlideUp>

            <SlideUp delay={0.2}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground-muted">
                I build mobile apps. You can try them right here — no download required.
              </p>
            </SlideUp>

            <SlideUp delay={0.3}>
              <div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">
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

          {/* Profile photo */}
          <SlideUp delay={0.2}>
            <div className="shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/photos/profile.jpg"
                alt="Brian Saulan"
                className="h-24 w-24 rounded-full object-cover ring-4 ring-primary/20 lg:h-64 lg:w-64"
              />
            </div>
          </SlideUp>
        </div>
      </div>
    </section>
  );
}
