"use client";

import { useState } from "react";
import { AppHero } from "@/components/ui/app-hero";
import { PaperlineFileUpload } from "./paperline-file-upload";
import { PaperlineStatus } from "./paperline-status";
import { Result } from "./result";
import { config } from "./config";

export default function PaperLinePage() {
  const [phase, setPhase] = useState<"idle" | "tracking" | "done">("idle");
  const [documentId, setDocumentId] = useState<string | null>(null);

  const handleUploadSuccess = (docId: string) => {
    setDocumentId(docId);
    setPhase("tracking");
  };

  const handleUploadError = (error: Error) => {
    console.error("Upload failed:", error);
  };

  const handleExtracted = () => {
    setPhase("done");
  };

  const handleError = (error: string) => {
    console.log("Extraction failed:", error);
  };

  const handleReset = () => {
    setPhase("idle");
    setDocumentId(null);
  };

  return (
    <div className="flex flex-col gap-10 md:flex-row md:gap-12">
      <AppHero config={config.hero} />

      <div className="flex-1 min-w-0">
        {phase === "idle" && (
          <PaperlineFileUpload
            acceptedTypes={config.upload.acceptedTypes}
            accept={config.upload.accept}
            maxSizeMB={config.upload.maxSizeMB}
            description={config.upload.description}
            onUploadSuccess={handleUploadSuccess}
            onError={handleUploadError}
          />
        )}

        {phase === "tracking" && documentId && (
          <PaperlineStatus
            documentId={documentId}
            onExtracted={handleExtracted}
            onError={handleError}
            onReset={handleReset}
          />
        )}

        {phase === "done" && documentId && (
          <Result
            documentId={documentId}
            onNewDocument={handleReset}
          />
        )}
      </div>
    </div>
  );
}