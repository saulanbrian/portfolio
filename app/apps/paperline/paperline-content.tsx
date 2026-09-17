"use client";

import { useState } from "react";
import { AppHero } from "@/components/ui/app-hero";
import { PaperlineFileUpload } from "./paperline-file-upload";
import { PaperlineStatus } from "./paperline-status";
import { Result } from "./result";
import { MaintenanceNotice } from "@/components/ui/maintenance";
import { paperlineConfig } from "@/lib/paperline/config";

interface Props {
  enabled: boolean;
}

export function PaperlineContent({ enabled }: Props) {
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

  if (!enabled) {
    return (
      <div className="flex flex-col gap-10 md:flex-row md:gap-12">
        <AppHero config={paperlineConfig.hero} />
        <div className="flex-1 min-w-0">
          <MaintenanceNotice appName={paperlineConfig.name} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 md:flex-row md:gap-12">
      <AppHero config={paperlineConfig.hero} />

      <div className="flex-1 min-w-0">
        {phase === "idle" && (
          <PaperlineFileUpload
            acceptedTypes={paperlineConfig.upload.acceptedTypes}
            accept={paperlineConfig.upload.accept}
            maxSizeMB={paperlineConfig.upload.maxSizeMB}
            description={paperlineConfig.upload.description}
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
          <Result documentId={documentId} onNewDocument={handleReset} />
        )}
      </div>
    </div>
  );
}
