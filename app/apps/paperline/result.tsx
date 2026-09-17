"use client";

import { paperline } from "@/lib/paperline/supabase/client";
import type { Document, DocumentLineItem } from "@/lib/paperline/db/schema";
import { useDocumentQuery } from "@/lib/paperline/db/queries/documents.query";
import { DocumentViewer } from "./document-viewer";

interface ResultProps {
  documentId: string;
  onNewDocument?: () => void;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatCurrency(
  amount: number | null,
  currency: string = "USD",
): string {
  if (amount == null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

function ResultHeader({ fileName }: { fileName: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-lg dark:bg-green-900/30">
        ✅
      </div>
      <div>
        <h3 className="text-sm font-semibold text-foreground">
          Extraction Complete
        </h3>
        <p className="text-xs text-foreground-subtle">{fileName}</p>
      </div>
    </div>
  );
}

function ResultMetadata({ document }: { document: Document }) {
  return (
    <div className="rounded-xl border border-border bg-background-surface p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-xs font-medium text-foreground-subtle">Vendor</p>
          <p className="mt-1 text-sm font-medium text-foreground">
            {document.vendor_name ?? "—"}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium text-foreground-subtle">
            Invoice #
          </p>
          <p className="mt-1 text-sm font-medium text-foreground">
            {document.invoice_number ?? "—"}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium text-foreground-subtle">
            Invoice Date
          </p>
          <p className="mt-1 text-sm font-medium text-foreground">
            {formatDate(document.invoice_date)}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium text-foreground-subtle">
            Due Date
          </p>
          <p className="mt-1 text-sm font-medium text-foreground">
            {formatDate(document.due_date)}
          </p>
        </div>
      </div>
    </div>
  );
}

function ResultLineItems({
  document,
  lineItems,
}: { document: Document; lineItems: DocumentLineItem[] }) {
  if (lineItems.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-background-surface p-6">
        <p className="text-sm text-foreground-muted">Processing line items...</p>
      </div>
    );
  }

  const currency = document.currency ?? "USD";

  return (
    <div className="rounded-xl border border-border bg-background-surface p-6">
      <h3 className="text-xs font-medium uppercase tracking-wider text-foreground-subtle">
        Line Items
      </h3>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-foreground-subtle">
              <th className="pb-2 px-3 font-medium">Description</th>
              <th className="pb-2 px-3 text-right font-medium">Qty</th>
              <th className="pb-2 px-3 text-right font-medium">Price</th>
              <th className="pb-2 px-3 text-right font-medium">Total</th>
            </tr>
          </thead>
          <tbody>
            {lineItems.map((item) => (
              <tr key={item.id} className="border-b border-border-subtle">
                <td className="max-w-[150px] truncate py-2.5 px-3 text-foreground" title={item.description}>
                  {item.description}
                </td>
                <td className="py-2.5 px-3 text-right text-foreground-muted">
                  {item.quantity}
                </td>
                <td className="py-2.5 px-3 text-right text-foreground-muted">
                  {formatCurrency(item.unit_price, currency)}
                </td>
                <td className="py-2.5 px-3 text-right font-medium text-foreground">
                  {formatCurrency(item.total_price, currency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 border-t border-border pt-4">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-foreground-muted">Subtotal</span>
            <span className="font-medium text-foreground">
              {formatCurrency(document.subtotal, currency)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-foreground-muted">Tax</span>
            <span className="font-medium text-foreground">
              {formatCurrency(document.tax_amount, currency)}
            </span>
          </div>
          <div className="flex justify-between border-t border-border pt-2">
            <span className="font-semibold text-foreground">Total</span>
            <span className="font-semibold text-foreground">
              {formatCurrency(document.total_amount, currency)}
            </span>
          </div>
          {currency !== "USD" && document.usd_conversion_total != null && (
            <div className="flex justify-between text-xs text-foreground-subtle">
              <span>
                USD Equivalent (rate:{" "}
                {document.usd_rate_as_of_billing_date})
              </span>
              <span>
                {formatCurrency(document.usd_conversion_total, "USD")}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Result({ documentId, onNewDocument }: ResultProps) {
  const { data, isLoading, error } = useDocumentQuery(documentId, true);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center rounded-2xl border-2 border-border p-12">
        <p className="text-sm text-foreground-muted">Loading results...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center rounded-2xl border-2 border-border p-12">
        <p className="text-sm font-medium text-red-500">
          {error instanceof Error ? error.message : "Failed to load results"}
        </p>
      </div>
    );
  }

  const { document, lineItems } = data;
  const fileUrl = paperline
    .storage
    .from("documents")
    .getPublicUrl(document.storage_path).data.publicUrl;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <ResultHeader fileName={document.file_name} />
        {onNewDocument && (
          <button
            onClick={onNewDocument}
            className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            Process another document
          </button>
        )}
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="lg:w-[45%] lg:shrink-0">
          <DocumentViewer url={fileUrl} fileName={document.file_name} fileType={document.file_type} />
        </div>

        <div className="flex-1 min-w-0 space-y-6">
          <ResultMetadata document={document} />
          <ResultLineItems document={document} lineItems={lineItems} />
        </div>
      </div>
    </div>
  );
}
