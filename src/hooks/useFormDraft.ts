'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';

// Keeps a copy of what the customer typed in sessionStorage so an accidental refresh,
// closed-and-reopened tab, or a phone killing the browser doesn't wipe their message.
// sessionStorage is per-tab and cleared when the tab closes. Files can't be stored,
// so we only remember how many there were to prompt a re-attach.

export interface StoredDraft<T> {
  values: T;
  attachmentCount: number;
}

const SAVE_DELAY_MS = 400;

function isEmptyValue(value: unknown): boolean {
  if (Array.isArray(value)) return value.length === 0;
  return typeof value !== 'string' || value.trim() === '';
}

// `ignoreKeys` are fields that always hold a default (e.g. contactMethod) and so
// shouldn't count as "the customer typed something".
export function useFormDraft<T extends object>(formKey: string, ignoreKeys: readonly string[] = []) {
  const storageKey = `form-draft:${formKey}`;
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pending = useRef<StoredDraft<T> | null>(null);
  const ignored = useRef(ignoreKeys);

  const write = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    const draft = pending.current;
    pending.current = null;
    if (!draft) return;
    try {
      const hasContent = Object.entries(draft.values).some(
        ([key, value]) => !ignored.current.includes(key) && !isEmptyValue(value)
      );
      if (hasContent) {
        sessionStorage.setItem(storageKey, JSON.stringify(draft));
      } else {
        sessionStorage.removeItem(storageKey);
      }
    } catch {
      // Storage full or disabled (private mode) — the form still works without drafts.
    }
  }, [storageKey]);

  const load = useCallback((): StoredDraft<T> | null => {
    try {
      const raw = sessionStorage.getItem(storageKey);
      return raw ? (JSON.parse(raw) as StoredDraft<T>) : null;
    } catch {
      return null;
    }
  }, [storageKey]);

  // Debounced; later calls replace pending ones so only the latest values are written.
  const save = useCallback((values: T, attachmentCount = 0) => {
    pending.current = { values, attachmentCount };
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(write, SAVE_DELAY_MS);
  }, [write]);

  const clear = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    pending.current = null;
    try {
      sessionStorage.removeItem(storageKey);
    } catch {
      // ignore
    }
  }, [storageKey]);

  // Flush the last keystrokes if the page is closed or the form unmounts mid-debounce.
  useEffect(() => {
    window.addEventListener('pagehide', write);
    return () => {
      window.removeEventListener('pagehide', write);
      write();
    };
  }, [write]);

  return useMemo(() => ({ load, save, clear }), [load, save, clear]);
}
