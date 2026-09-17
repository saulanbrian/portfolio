"use client";

import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

interface PDFViewerProps {
  url: string;
  fileName: string;
}

export function PDFViewer({ url }: PDFViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pdfRef = useRef<pdfjsLib.PDFDocumentProxy | null>(null);

  const renderPage = async (
    pdf: pdfjsLib.PDFDocumentProxy,
    pageNum: number,
  ) => {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1.5 });

    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({ canvas, viewport }).promise;
    }
  };

  useEffect(() => {
    const loadPDF = async () => {
      try {
        setLoading(true);
        setError(null);
        const loadingTask = pdfjsLib.getDocument(url);
        const pdf = await loadingTask.promise;
        pdfRef.current = pdf;
        setPageCount(pdf.numPages);
        await renderPage(pdf, currentPage);
      } catch {
        setError("Failed to load PDF");
      } finally {
        setLoading(false);
      }
    };

    loadPDF();
  }, [url, currentPage]);

  if (loading) {
    return (
      <div className="flex h-[500px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-8">
        <p>Failed to load PDF</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline mt-2 inline-block"
        >
          Open in new tab →
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[500px]">
      <div className="relative flex-1">
        <canvas ref={canvasRef} className="max-w-full h-auto" />
      </div>
      {pageCount > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm border border-border rounded hover:bg-background-alt disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-foreground-muted">
            Page {currentPage} / {pageCount}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(pageCount, p + 1))}
            disabled={currentPage === pageCount}
            className="px-3 py-1 text-sm border border-border rounded hover:bg-background-alt disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
