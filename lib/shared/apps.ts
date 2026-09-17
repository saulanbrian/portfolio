export interface App {
  slug: string;
  name: string;
  description: string;
  logo: string;
  tags: string[];
  downloadUrl: string;
}

export const apps: App[] = [
  {
    slug: "cutdcrop",
    name: "Cut D' Crop",
    description:
      "Cut, crop, and extract pages from PDF documents.",
    logo: "/logos/cutdcrop_logo.png",
    tags: ["PDF", "Document Processing"],
    downloadUrl: "https://github.com/saulanbrian/cutdcrop/releases",
  },
  {
    slug: "paperline",
    name: "PaperLine",
    description:
      "Upload an invoice — AI extracts vendor, line items, totals, and currency.",
    logo: "/logos/paperline_logo.png",
    tags: ["PDF", "Images", "AI Extraction"],
    downloadUrl: "https://github.com/saulanbrian/paperline/releases",
  },
];