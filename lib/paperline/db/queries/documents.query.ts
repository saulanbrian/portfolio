"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchDocumentWithLineItems,
} from "../services/documents.service";

export function useDocumentQuery(documentId: string | null, enabled: boolean) {
  return useQuery({
    queryKey: ["document", documentId],
    queryFn: () => fetchDocumentWithLineItems(documentId!),
    enabled: enabled && !!documentId,
    refetchInterval: (query) => {
      const data = query.state.data;
      if (data && data.lineItems.length > 0) return false;
      return 1000;
    },
  });
}
