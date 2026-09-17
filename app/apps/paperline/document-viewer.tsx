"use client";

import dynamic from "next/dynamic";

interface DocumentViewerProps {
  url: string;
  fileName: string;
  fileType: string;
}

// PDF.js viewer - loaded only on client
const PDFViewer = dynamic(
  () =>
    import("@/components/ui/pdf-viewer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[500px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
      </div>
    ),
  },
);

export function DocumentViewer({
  url,
  fileName,
  fileType,
}: DocumentViewerProps) {
  const isImage = fileType.startsWith("image/");

  if (isImage) {
    return (
      <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-background-surface">
        <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
          <span className="text-lg">🖼️</span>
          <span className="text-xs font-medium text-foreground-subtle truncate">
            {fileName}
          </span>
        </div>
        <div className="flex flex-1 items-center justify-center p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt={fileName}
            className="max-h-[400px] w-full object-contain"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-background-surface">
      <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="text-lg">📄</span>
          <span className="text-xs font-medium text-foreground-subtle truncate">
            {fileName}
          </span>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center p-4">
        <PDFViewer url={url} fileName={fileName} />
      </div>
    </div>
  );
}