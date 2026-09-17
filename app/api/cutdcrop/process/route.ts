import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/shared/rate-limit";
import { validateFile, sanitizeFilename } from "@/lib/shared/file-validation";
import { isFeatureEnabled, FLAGS } from "@/lib/configcat";
import { cutdcropConfig } from "@/lib/cutdcrop/config";

const ALLOWED_TYPES = new Set(cutdcropConfig.upload.acceptedTypes);
const MAX_SIZE_MB = cutdcropConfig.upload.maxSizeMB;

export async function POST(request: NextRequest) {
  if (!(await isFeatureEnabled(FLAGS.CUTDCROP_ENABLED))) {
    return NextResponse.json(
      { error: "Service temporarily unavailable" },
      { status: 503, headers: { "Retry-After": "60" } }
    );
  }

  // Rate limit: 5 requests per minute per IP
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0] ?? "127.0.0.1";
  const { success } = rateLimit(`cutdcrop:${ip}`, 5, 60_000);
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

  // Read file into buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Validate: magic bytes + size
  const maxSizeBytes = MAX_SIZE_MB * 1024 * 1024;
  const validation = await validateFile(buffer, maxSizeBytes, ALLOWED_TYPES);
  if (!validation.valid) {
    return NextResponse.json({ error: validation.error }, { status: 415 });
  }

  // Generate safe filename
  const safeName = sanitizeFilename(file.name, "pdf");

  // Process the file (placeholder — implement actual PDF processing)
  const resultBuffer = await processPDF(buffer);

  // Return processed file
  return new NextResponse(new Uint8Array(resultBuffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${safeName}"`,
      "X-Content-Type-Options": "nosniff",
    },
  });
}

async function processPDF(buffer: Buffer): Promise<Buffer> {
  // TODO: Implement actual PDF processing
  // e.g. cut pages, crop margins, extract pages
  return buffer;
}
