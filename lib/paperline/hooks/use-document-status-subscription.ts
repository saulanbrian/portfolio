"use client";

import { useEffect, useRef, useState } from "react";
import { paperline } from "@/lib/paperline/supabase/client";
import type { DocumentStatus } from "@/lib/paperline/db/schema";

export function useDocumentStatusSubscription(documentId: string | null) {
  const [status, setStatus] = useState<DocumentStatus | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!documentId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    // 1. Fetch current status immediately
    const fetchStatus = async () => {
      try {
        const { data } = await paperline
          .from("documents")
          .select("status, error_message")
          .eq("id", documentId)
          .single();
        if (!cancelled && data && status === null) {
          setStatus(data.status as DocumentStatus);
          setErrorMessage(data.error_message);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    fetchStatus();

    // 2. Subscribe to future updates
    const channel = paperline
      .channel(`document:${documentId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "documents",
          filter: `id=eq.${documentId}`,
        },
        (payload) => {
          const newStatus = (payload.new as { status: DocumentStatus }).status;
          const newErrorMessage = (payload.new as { error_message: string | null }).error_message;
          setStatus(newStatus);
          setErrorMessage(newErrorMessage);
        },
      )
      .subscribe();

    cleanupRef.current = () => {
      paperline.removeChannel(channel);
    };

    return () => {
      cancelled = true;
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, [documentId, status]);

  return { status, errorMessage, isLoading };
}