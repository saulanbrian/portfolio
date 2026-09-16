"use client";

import { useEffect } from "react";
import { useDocumentStatusSubscription } from "@/lib/paperline/hooks/use-document-status-subscription";
import { LottieStatus } from "@/components/ui/lottie-status";

interface PaperlineStatusProps {
  documentId: string;
  onExtracted: () => void;
  onError: (error: string) => void;
  onReset: () => void;
}

const lottieMap: Record<string, "queued" | "processing" | "extracted" | "failed"> = {
  uploaded: "queued",
  queued: "queued",
  processing: "processing",
  extracted: "extracted",
  verified: "extracted",
  failed: "failed",
};

const labelMap: Record<string, string> = {
  uploaded: "Queued for extraction...",
  queued: "Queued for extraction...",
  processing: "AI is extracting data...",
  extracted: "Extraction complete!",
};

function getDisplayError(errorMessage: string | null): string {
  if (!errorMessage) return "Extraction failed";
  try {
    const parsed = JSON.parse(errorMessage);
    return typeof parsed === "string" ? parsed : "Extraction failed";
  } catch {
    return errorMessage;
  }
}

export function PaperlineStatus({
  documentId,
  onExtracted,
  onError,
  onReset,
}: PaperlineStatusProps) {
  const { status, errorMessage } = useDocumentStatusSubscription(documentId);
  const displayError = getDisplayError(errorMessage);

  useEffect(() => {
    if (status === "extracted" || status === "verified") {
      onExtracted();
    } else if (status === "failed") {
      onError(displayError);
    }
  }, [status, displayError, onExtracted, onError]);

  const displayStatus = status ?? "queued";

  return (
    <div className="flex flex-col items-center justify-center p-12">
      <div className="flex flex-col items-center gap-6">
        <LottieStatus status={lottieMap[displayStatus] ?? "queued"} size={200} />

        {labelMap[displayStatus] && (
          <p className="text-lg text-foreground-muted">{labelMap[displayStatus]}</p>
        )}

        {displayStatus === "failed" && (
          <>
            <p className="text-lg font-medium text-red-500">{displayError}</p>
            <button
              onClick={onReset}
              className="mt-3 text-sm text-foreground-subtle transition-colors hover:text-primary"
            >
              Try another file
            </button>
          </>
        )}
      </div>
    </div>
  );
}