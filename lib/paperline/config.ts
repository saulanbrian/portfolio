import type { AppHeroConfig } from "@/components/ui/app-hero";

export const paperlineConfig = {
  slug: "paperline",
  name: "PaperLine",
  description: "Upload an invoice — AI extracts vendor, line items, totals, and currency.",
  upload: {
    acceptedTypes: [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/webp",
    ],
    accept: ".pdf,.jpg,.jpeg,.png,.webp",
    maxSizeMB: 10,
    description: "PDF, JPEG, PNG, WebP — Max 10MB",
  },
  tags: ["PDF", "Images", "AI Extraction"],
  hero: {
    logo: "/logos/paperline_logo.png",
    logoAlt: "PaperLine logo",
    name: "PaperLine",
    description: "Upload an invoice — AI extracts vendor, line items, totals, and currency.",
    features: [
      "Vendor & invoice details",
      "Line item extraction",
      "Totals & currency detection",
      "Real-time processing",
    ],
    downloadUrl: "https://github.com/saulanbrian/paperline/releases",
  } satisfies AppHeroConfig,
};

export type PaperlineConfig = typeof paperlineConfig;