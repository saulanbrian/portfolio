"use client";

interface ResultProps {
  resultUrl: string;
  fileName: string;
  mimeType: string;
}

export function Result({ resultUrl, fileName, mimeType }: ResultProps) {
  return (
    <div className="mt-8 rounded-xl border border-border bg-background-surface p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
        Result
      </h3>
      <div className="mt-4 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-xl">
          📄
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            {fileName}
          </p>
          <p className="text-xs text-foreground-subtle">
            {mimeType.split("/")[1].toUpperCase()} • Processed
          </p>
        </div>
        <a
          href={resultUrl}
          download
          className="inline-flex h-9 items-center rounded-pill bg-primary px-5 text-sm font-medium text-primary-foreground transition-all hover:scale-105"
        >
          Download
        </a>
      </div>
    </div>
  );
}
