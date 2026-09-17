import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/shared/rate-limit";
import { validateFile } from "@/lib/shared/file-validation";
import { isFeatureEnabled, FLAGS } from "@/lib/configcat";
import { paperlineConfig } from "@/lib/paperline/config";

const PAPERLINE_API_URL = process.env.NEXT_PUBLIC_PAPERLINE_API_URL!;
const ALLOWED_TYPES = new Set(paperlineConfig.upload.acceptedTypes);
const MAX_SIZE_MB = paperlineConfig.upload.maxSizeMB;

export async function POST(request: NextRequest) {
  if (!(await isFeatureEnabled(FLAGS.PAPERLINE_ENABLED))) {
    return NextResponse.json(
      { error: "Service temporarily unavailable" },
      { status: 503, headers: { "Retry-After": "60" } }
    );
  }

  // Rate limit: 5 requests per minute per IP
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0] ?? "127.0.0.1";
  const { success } = rateLimit(`paperline:${ip}`, 5, 60_000);
  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Try again later." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  // Parse form data
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "Invalid form data" },
      { status: 400 }
    );
  }

  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  // Read file into buffer for validation
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Validate: magic bytes + size
  const maxSizeBytes = MAX_SIZE_MB * 1024 * 1024;
  const validation = await validateFile(buffer, maxSizeBytes, ALLOWED_TYPES);
  if (!validation.valid) {
    return NextResponse.json({ error: validation.error }, { status: 415 });
  }

  // Forward to PaperLine backend
  const forwardFormData = new FormData();
  forwardFormData.append("file", file);

  try {
    const res = await fetch(PAPERLINE_API_URL, {
      method: "POST",
      body: forwardFormData,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "Backend error");
      return NextResponse.json(
        { error: `Backend error (${res.status}): ${text}` },
        { status: 502 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to connect to backend" },
      { status: 502 }
    );
  }
}
