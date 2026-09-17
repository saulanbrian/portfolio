import { paperline } from "../../supabase/client";
import type { Document, DocumentLineItem } from "../schema";

export async function fetchDocument(id: string) {
  return paperline
    .from("documents")
    .select("*")
    .eq("id", id)
    .single();
}

export async function fetchDocumentWithLineItems(documentId: string) {
  const { data, error } = await paperline
    .from("documents")
    .select("*, document_line_items(*)")
    .eq("id", documentId)
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "Document not found");
  }

  const { document_line_items, ...document } = data;

  return {
    document: document as Document,
    lineItems: (document_line_items ?? []) as DocumentLineItem[],
  };
}
