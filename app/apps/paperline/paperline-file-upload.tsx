"use client";

import { FileUpload } from "@/components/ui/file-upload";
import { useExtractDocument } from "@/lib/paperline/db/mutations/documents.mutation";
import { useState } from "react";

interface PaperlineFileUploadProps {
  acceptedTypes: string[];
  accept?: string;
  maxSizeMB: number;
  description?: string;
  onUploadSuccess: (documentId: string) => void;
  onError: (error: Error) => void;
}

export function PaperlineFileUpload({
  acceptedTypes,
  accept,
  maxSizeMB,
  description,
  onUploadSuccess,
  onError,
}: PaperlineFileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const { mutate: upload, isPending } = useExtractDocument({
    onSuccess: ({ document_id }) => {
      setUploadError(null);
      onUploadSuccess(document_id);
    },
    onError: (error) => {
      setUploadError(error.message);
      onError(error);
    },
  });

  return (
    <FileUpload
      acceptedTypes={acceptedTypes}
      accept={accept}
      maxSizeMB={maxSizeMB}
      description={description}
      onFileSelect={(file) => {
        setUploadError(null);
        setSelectedFile(file);
      }}
      selectedFile={selectedFile}
      error={uploadError}
      onClear={() => {
        setSelectedFile(null);
        setUploadError(null);
      }}
      actionButton={
        selectedFile && (
          <button
            className={`inline-flex h-10 items-center rounded-pill px-6 text-sm font-medium transition-all ${
              isPending
                ? "bg-primary/50 text-primary-foreground/50 cursor-not-allowed"
                : "bg-primary text-primary-foreground hover:scale-105 hover:shadow-lg"
            }`}
            disabled={isPending}
            onClick={() => upload(selectedFile)}
          >
            {isPending ? "Uploading..." : "Extract"}
          </button>
        )
      }
    />
  );
}
