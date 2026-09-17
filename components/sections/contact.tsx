"use client";

import { SlideUp } from "@/components/ui/animated";

export function Contact() {
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <SlideUp>
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
            Get In Touch
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Let&apos;s build something{" "}
            <span className="text-primary">together</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-foreground-muted">
            I&apos;m always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>
        </SlideUp>

        <SlideUp delay={0.1}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="mailto:briansaulan05@gmail.com"
              className="inline-flex h-12 items-center rounded-pill bg-primary px-8 text-sm font-medium text-primary-foreground transition-all hover:scale-105 hover:shadow-lg"
            >
              Say Hello
            </a>
            <a
              href="https://github.com/saulanbrian"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center rounded-pill border border-border px-8 text-sm font-medium text-foreground transition-all hover:border-primary/50 hover:text-primary"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/brian-saulan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center rounded-pill border border-border px-8 text-sm font-medium text-foreground transition-all hover:border-primary/50 hover:text-primary"
            >
              LinkedIn
            </a>
          </div>
        </SlideUp>
      </div>
    </section>
  );
}
