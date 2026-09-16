"use client";

export function DocumentViewer({
  url,
  fileName,
  fileType,
}: { url: string; fileName: string; fileType: string }) {
  const isImage = fileType.startsWith("image/");

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-background-surface">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <span className="text-lg">{isImage ? "🖼️" : "📄"}</span>
        <span className="text-xs font-medium text-foreground-subtle truncate">
          {fileName}
        </span>
      </div>
      <div className="flex flex-1 items-center justify-center p-4">
        {isImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={url}
            alt={fileName}
            className="max-h-[400px] w-full object-contain"
          />
        ) : (
          <iframe
            src={url}
            title={fileName}
            sandbox="allow-same-origin"
            className="h-[500px] w-full rounded-lg border-0"
          />
        )}
      </div>
    </div>
  );
}
