'use client';

import { useRef, useState } from 'react';
import { Copy, Check, Mail, Phone } from 'lucide-react';
import { CONTACT_EMAIL, CONTACT_PHONE_ROB } from '@/lib/constants';

// Mail clients choke on very long mailto: URLs.
const MAILTO_BODY_LIMIT = 1800;

type SummaryValue = string | string[] | undefined | null;

// Plain-text version of the form so a customer can paste it anywhere if sending fails.
export function buildMessageSummary(fields: Record<string, SummaryValue>, message?: string): string {
  const lines = Object.entries(fields)
    .map(([label, value]) => [label, Array.isArray(value) ? value.join(', ') : value?.trim()] as const)
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`);

  if (message?.trim()) {
    lines.push('', 'Message:', message.trim());
  }
  return lines.join('\n');
}

interface FormFailureHelpProps {
  summary: string;
  subject: string;
}

export default function FormFailureHelp({ summary, subject }: FormFailureHelpProps) {
  const [copied, setCopied] = useState(false);
  const [showText, setShowText] = useState(false);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const body = summary.length > MAILTO_BODY_LIMIT ? `${summary.slice(0, MAILTO_BODY_LIMIT)}…` : summary;
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const tel = `tel:+${CONTACT_PHONE_ROB.replace(/\D/g, '')}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Clipboard API unavailable (older browser / insecure context) — let them copy by hand.
      setShowText(true);
      setTimeout(() => textRef.current?.select(), 0);
    }
  };

  return (
    <div className="mt-3 space-y-3">
      <p className="text-sm text-gray-700" style={{ color: 'black' }}>
        Prefer to reach us another way? Your message is ready to go:
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
        >
          {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Copied' : 'Copy my message'}
        </button>
        <a
          href={mailto}
          className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
        >
          <Mail className="h-4 w-4" />
          Email it to us
        </a>
        <a
          href={tel}
          className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
        >
          <Phone className="h-4 w-4" />
          Call {CONTACT_PHONE_ROB.replace(/^1-/, '')}
        </a>
      </div>
      {showText && (
        <textarea
          ref={textRef}
          readOnly
          value={summary}
          rows={6}
          className="w-full rounded-md border border-gray-300 p-2 text-xs text-gray-800"
          aria-label="Your message, ready to copy"
        />
      )}
    </div>
  );
}
