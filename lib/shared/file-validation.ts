import { fileTypeFromBuffer } from "file-type";

export interface ValidationResult {
  valid: boolean;
  error?: string;
  detectedMime?: string;
}

export async function validateFile(
  buffer: Buffer,
  maxSizeBytes: number,
  allowedTypes: Set<string>
): Promise<ValidationResult> {
  if (buffer.length > maxSizeBytes) {
    return {
      valid: false,
      error: `File exceeds ${maxSizeBytes / 1024 / 1024}MB limit`,
    };
  }

  const detected = await fileTypeFromBuffer(buffer);
  const isPDF = buffer.slice(0, 5).toString("ascii") === "%PDF-";

  const detectedMime =
    detected?.mime ?? (isPDF ? "application/pdf" : undefined);

  if (!detectedMime || !allowedTypes.has(detectedMime)) {
    const typeList = Array.from(allowedTypes)
      .map((t) => t.split("/")[1].toUpperCase())
      .join(", ");
    return {
      valid: false,
      error: `File type not allowed. Accepted: ${typeList}`,
    };
  }

  return { valid: true, detectedMime };
}

export function sanitizeFilename(originalName: string, ext: string): string {
  const uuid = crypto.randomUUID();
  return `${uuid}.${ext}`;
}
