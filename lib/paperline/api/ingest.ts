import type { IngestResponse } from "../db/schema";

const API_URL = process.env.NEXT_PUBLIC_PAPERLINE_API_URL!;

export async function ingestDocument(file: File): Promise<IngestResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(API_URL, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "Unknown error");
    throw new Error(`Ingestion failed (${res.status}): ${text}`);
  }

  return res.json();
}
