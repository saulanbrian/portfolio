"use client";

import { useCallback, useState, useRef, useMemo, useEffect } from "react";
import type { ReactNode } from "react";

interface FileUploadProps {
  acceptedTypes: string[];
  accept?: string;
  maxSizeMB: number;
  description?: string;
  onFileSelect: (file: File) => void;
  selectedFile?: File | null;
  error?: string | null;
  onClear: () => void;
  actionButton?: ReactNode;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isImageFile(file: File): boolean {
  return file.type.startsWith("image/");
}

function validateFile(
  file: File,
  acceptedTypes: string[],
  accept: string | undefined,
  maxSizeMB: number,
): string | null {
  const ext = "." + file.name.split(".").pop()?.toLowerCase();
  const acceptExts = (accept ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase());
  if (!acceptedTypes.includes(file.type) && !acceptExts.includes(ext)) {
    return `Invalid file type. Allowed: ${accept ?? acceptedTypes.join(", ")}`;
  }
  const maxBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxBytes) {
    return `File too large. Max size: ${maxSizeMB}MB`;
  }
  return null;
}

function ValidationError({
  error,
  onDismiss,
}: {
  error: string;
  onDismiss: () => void;
}) {
  return (
    <div className="mb-4 w-full max-w-md">
      <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
        <span className="flex-1">{error}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDismiss();
          }}
          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

function FileIdleState({ description }: { description: string }) {
  return (
    <>
      <div className="mb-4 text-4xl">📁</div>
      <p className="text-sm font-medium text-foreground">
        Drop a file here or click to browse
      </p>
      <p className="mt-1 text-xs text-foreground-subtle">{description}</p>
    </>
  );
}

function FileSelectedState({
  file,
  previewUrl,
  actionButton,
  onClear,
}: {
  file: File;
  previewUrl: string | null;
  actionButton?: ReactNode;
  onClear: (e: React.MouseEvent) => void;
}) {
  return (
    <>
      {previewUrl ? (
        <div className="mb-4 overflow-hidden rounded-lg border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewUrl}
            alt={file.name}
            className="max-h-[200px] object-contain"
          />
        </div>
      ) : (
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-xl bg-primary/10 text-3xl">
          📄
        </div>
      )}

      <p className="text-sm font-medium text-foreground">{file.name}</p>
      <p className="mt-0.5 text-xs text-foreground-subtle">
        {formatFileSize(file.size)}
      </p>

      {actionButton && <div className="mt-4">{actionButton}</div>}

      <button
        onClick={onClear}
        className="mt-3 text-xs text-foreground-subtle transition-colors hover:text-primary"
      >
        Choose a different file
      </button>
    </>
  );
}

function FileError({
  error,
  onRetry,
}: {
  error: string;
  onRetry: (e: React.MouseEvent) => void;
}) {
  return (
    <>
      <div className="mb-4 text-4xl">❌</div>
      <p className="text-sm font-medium text-red-500">{error}</p>
      <button
        onClick={onRetry}
        className="mt-2 text-xs text-foreground-subtle transition-colors hover:text-primary"
      >
        Try another file
      </button>
    </>
  );
}

export function FileUpload({
  acceptedTypes,
  accept,
  maxSizeMB,
  description,
  onFileSelect,
  selectedFile,
  error,
  onClear,
  actionButton,
}: FileUploadProps) {
  const [validationError, setValidationError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const previewUrl = useMemo(() => {
    if (selectedFile && isImageFile(selectedFile)) {
      return URL.createObjectURL(selectedFile);
    }
    return null;
  }, [selectedFile]);

  const prevPreviewUrl = useRef<string | null>(null);

  useEffect(() => {
    if (prevPreviewUrl.current && prevPreviewUrl.current !== previewUrl) {
      URL.revokeObjectURL(prevPreviewUrl.current);
    }
    prevPreviewUrl.current = previewUrl;
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFile = useCallback(
    (file: File) => {
      const validation = validateFile(file, acceptedTypes, accept, maxSizeMB);
      if (validation) {
        setValidationError(validation);
        return;
      }
      setValidationError(null);
      onFileSelect(file);
    },
    [acceptedTypes, accept, maxSizeMB, onFileSelect],
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inputRef.current) inputRef.current.value = "";
    onClear();
  };

  const acceptList = accept ?? acceptedTypes.join(",");
  const sizeLabel = `${maxSizeMB}MB`;
  const showIdle = !selectedFile && !error;

  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      onClick={() => showIdle && inputRef.current?.click()}
      className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12 transition-all duration-300 ${
        showIdle
          ? "cursor-pointer border-border hover:border-primary/50 hover:bg-background-alt"
          : "border-border"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        onChange={onInputChange}
        className="hidden"
        accept={acceptList}
      />

      {validationError && (
        <ValidationError
          error={validationError}
          onDismiss={() => setValidationError(null)}
        />
      )}

      {error && <FileError error={error} onRetry={handleClear} />}

      {showIdle && (
        <FileIdleState description={description ?? `Max ${sizeLabel}`} />
      )}

      {selectedFile && !error && (
        <FileSelectedState
          file={selectedFile}
          previewUrl={previewUrl}
          actionButton={actionButton}
          onClear={handleClear}
        />
      )}
    </div>
  );
}
