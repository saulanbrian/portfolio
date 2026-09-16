import type { AppHeroConfig } from "@/components/ui/app-hero";

export const config = {
  slug: "cutdcrop",
  name: "Cut D' Crop",
  description: "Cut, crop, and extract pages from PDF documents.",
  acceptedTypes: ["application/pdf"],
  accept: ".pdf",
  maxSizeMB: 10,
  tags: ["PDF", "Document Processing"],
  hero: {
    logo: "/logos/cutdcrop_logo.png",
    logoAlt: "Cut D' Crop logo",
    name: "Cut D' Crop",
    description: "Cut, crop, and extract pages from PDF documents.",
    features: [
      "Cut pages from PDFs",
      "Crop margins",
      "Extract selected pages",
    ],
  } satisfies AppHeroConfig,
};
