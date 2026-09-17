import type { Database } from "./database.types";

type DocumentRow = Database["public"]["Tables"]["documents"]["Row"];

export type DocumentStatus =
  | "uploaded"
  | "queued"
  | "processing"
  | "extracted"
  | "verified"
  | "failed";

export type Document = Omit<DocumentRow, "status"> & {
  status: DocumentStatus;
};

export type DocumentLineItem =
  Database["public"]["Tables"]["document_line_items"]["Row"];

export interface IngestResponse {
  document_id: string;
}
