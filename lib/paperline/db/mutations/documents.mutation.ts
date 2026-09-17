import { useMutation } from "@tanstack/react-query";
import { ingestDocument } from "@/lib/paperline/api/ingest";

export function useExtractDocument({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: { document_id: string }) => void;
  onError?: (error: Error) => void;
}) {
  return useMutation({
    mutationFn: (file: File): Promise<{ document_id: string }> =>
      ingestDocument(file),
    onSuccess,
    onError,
  });
}
