import type { AppHeroConfig } from "@/components/ui/app-hero";

export const cutdcropConfig = {
  slug: "cutdcrop",
  name: "Cut D' Crop",
  description: "Create summaries and quizzes from PDF documents.",
  upload: {
    acceptedTypes: ["application/pdf"],
    accept: ".pdf",
    maxSizeMB: 10,
    description: "PDF only — Max 10MB",
  },
  tags: ["PDF", "AI", "Education"],
  hero: {
    logo: "/logos/cutdcrop_logo.png",
    logoAlt: "Cut D' Crop logo",
    name: "Cut D' Crop",
    description: "Create summaries and quizzes from PDF documents.",
    features: [
      "Generate summaries from PDFs",
      "Create interactive quizzes",
    ],
    downloadUrl: "https://github.com/saulanbrian/cutdcrop/releases",
  } satisfies AppHeroConfig,
};

export type CutdcropConfig = typeof cutdcropConfig;