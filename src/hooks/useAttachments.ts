'use client';

import { useCallback, useRef, useState } from 'react';
import { addAttachments, formatBytes, MAX_TOTAL_BYTES, RejectedAttachment, totalBytes } from '@/lib/attachments';

export function useAttachments() {
  const [attachments, setAttachments] = useState<File[]>([]);
  const [rejected, setRejected] = useState<RejectedAttachment[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  // Latest list for async adds, so two quick picks don't both budget against a stale list.
  const latest = useRef<File[]>([]);

  const commit = (next: File[]) => {
    latest.current = next;
    setAttachments(next);
  };

  const add = useCallback(async (files: FileList | File[] | null) => {
    const incoming = Array.from(files || []);
    if (incoming.length === 0) return;

    setIsProcessing(true);
    try {
      const result = await addAttachments(latest.current, incoming);
      commit([...latest.current, ...result.accepted]);
      setRejected(result.rejected);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const remove = useCallback((index: number) => {
    commit(latest.current.filter((_, i) => i !== index));
    setRejected([]);
  }, []);

  const clear = useCallback(() => {
    commit([]);
    setRejected([]);
  }, []);

  const used = totalBytes(attachments);
  const budgetLabel = `${attachments.length} ${attachments.length === 1 ? 'file' : 'files'} · ${formatBytes(used)} of ${formatBytes(MAX_TOTAL_BYTES)}`;

  return { attachments, rejected, isProcessing, add, remove, clear, budgetLabel };
}
