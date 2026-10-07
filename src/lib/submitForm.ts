// Shared submit for every form that posts to /api/contact.
//
// Previously each form did `await response.json()` inside a try/catch whose catch
// said "Network error". Any non-JSON reply — Vercel's plain-text 413 for oversized
// uploads, a 504 timeout page — threw there, so customers were told their
// connection was the problem when the request had actually been rejected by us.

const PHONE = '403-598-9137';

// The server gives up first (Turnstile 8s + SendGrid 15s), so a timeout here
// means something unusual and the request may still have gone through.
const CLIENT_TIMEOUT_MS = 25_000;

export type SubmitFailureKind =
  | 'offline'
  | 'network'
  | 'timeout'
  | 'too-large'
  | 'verification'
  | 'validation'
  | 'server';

export type SubmitResult =
  | { ok: true; reference: string }
  | { ok: false; kind: SubmitFailureKind; message: string };

const MESSAGES: Record<Exclude<SubmitFailureKind, 'validation'>, string> = {
  offline: `You appear to be offline. Your message is saved here — reconnect and press Send again, or call us at ${PHONE}.`,
  network: `We couldn't reach our server. Your message is saved here — please try again in a moment, or call us at ${PHONE}.`,
  timeout: `This is taking longer than usual. Your request may have already gone through — please don't resend yet. Copy your message below, or call us at ${PHONE} to confirm.`,
  'too-large': `Your attachments are too large to send. Remove a photo and try again, or send photos to us after submitting. Questions? Call ${PHONE}.`,
  verification: `Our security check couldn't be confirmed, so we've refreshed it. Please press Send again in a moment. If this keeps happening, call us at ${PHONE}.`,
  server: `Something went wrong on our end and your request was not sent. Please try again, or use one of the options below to reach us at ${PHONE}.`,
};

// Short code shown to the customer and put in our email subject, so a
// timed-out-then-retried submission is recognisable as one customer.
export function newSubmissionReference(): string {
  const random = typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID().replace(/-/g, '')
    : Math.random().toString(16).slice(2) + Date.now().toString(16);
  return random.slice(0, 6).toUpperCase();
}

function parseJson(text: string): Record<string, unknown> | null {
  try {
    const parsed = JSON.parse(text);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null;
  }
}

export async function submitContactForm(body: FormData, reference: string): Promise<SubmitResult> {
  body.set('reference', reference);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CLIENT_TIMEOUT_MS);

  let response: Response;
  let text: string;
  try {
    response = await fetch('/api/contact', { method: 'POST', body, signal: controller.signal });
    text = await response.text();
  } catch (error) {
    if (controller.signal.aborted) {
      return { ok: false, kind: 'timeout', message: MESSAGES.timeout };
    }
    console.error('Form submit failed before a response arrived:', error);
    const offline = typeof navigator !== 'undefined' && navigator.onLine === false;
    return offline
      ? { ok: false, kind: 'offline', message: MESSAGES.offline }
      : { ok: false, kind: 'network', message: MESSAGES.network };
  } finally {
    clearTimeout(timer);
  }

  const json = parseJson(text);

  if (response.ok && json?.success !== false) {
    return { ok: true, reference: typeof json?.reference === 'string' ? json.reference : reference };
  }

  console.error('Form submit rejected:', response.status, json ?? text.slice(0, 200));

  if (response.status === 413) {
    return { ok: false, kind: 'too-large', message: MESSAGES['too-large'] };
  }
  if (json?.code === 'turnstile') {
    return { ok: false, kind: 'verification', message: MESSAGES.verification };
  }
  if (response.status === 400 && typeof json?.message === 'string') {
    return { ok: false, kind: 'validation', message: json.message };
  }
  return { ok: false, kind: 'server', message: MESSAGES.server };
}
