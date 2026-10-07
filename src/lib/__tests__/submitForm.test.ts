import { newSubmissionReference, submitContactForm } from '../submitForm';

const mockResponse = (status: number, body: string) => ({
  ok: status >= 200 && status < 300,
  status,
  text: async () => body,
});

const setFetch = (impl: jest.Mock) => {
  (global as unknown as { fetch: jest.Mock }).fetch = impl;
};

describe('submitContactForm', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
    Object.defineProperty(navigator, 'onLine', { value: true, configurable: true });
  });

  it('returns ok with the server reference on success', async () => {
    setFetch(jest.fn().mockResolvedValue(mockResponse(200, JSON.stringify({ success: true, reference: 'ABC123' }))));
    const result = await submitContactForm(new FormData(), 'ZZZ999');
    expect(result).toEqual({ ok: true, reference: 'ABC123' });
  });

  it('sends the reference with the form', async () => {
    const fetchMock = jest.fn().mockResolvedValue(mockResponse(200, '{"success":true}'));
    setFetch(fetchMock);
    await submitContactForm(new FormData(), 'ZZZ999');
    const body = fetchMock.mock.calls[0][1].body as FormData;
    expect(body.get('reference')).toBe('ZZZ999');
  });

  // The original bug: Vercel's plain-text 413 made response.json() throw → "Network error".
  it('reports an oversized upload, not a network error, for a plain-text 413', async () => {
    setFetch(jest.fn().mockResolvedValue(mockResponse(413, 'Request Entity Too Large\nFUNCTION_PAYLOAD_TOO_LARGE')));
    const result = await submitContactForm(new FormData(), 'REF001');
    expect(result).toMatchObject({ ok: false, kind: 'too-large' });
    if (!result.ok) expect(result.message).not.toMatch(/network/i);
  });

  it('reports a server failure for a non-JSON 504', async () => {
    setFetch(jest.fn().mockResolvedValue(mockResponse(504, '<html>An error occurred</html>')));
    const result = await submitContactForm(new FormData(), 'REF001');
    expect(result).toMatchObject({ ok: false, kind: 'server' });
    if (!result.ok) expect(result.message).toMatch(/not sent/);
  });

  it('flags Turnstile failures so the form can refresh the check', async () => {
    setFetch(jest.fn().mockResolvedValue(mockResponse(400, JSON.stringify({ success: false, code: 'turnstile', message: 'x' }))));
    const result = await submitContactForm(new FormData(), 'REF001');
    expect(result).toMatchObject({ ok: false, kind: 'verification' });
  });

  it('passes through the server validation message', async () => {
    const message = 'For security, please remove any links from your message.';
    setFetch(jest.fn().mockResolvedValue(mockResponse(400, JSON.stringify({ success: false, message }))));
    const result = await submitContactForm(new FormData(), 'REF001');
    expect(result).toEqual({ ok: false, kind: 'validation', message });
  });

  it('distinguishes offline from an unreachable server', async () => {
    setFetch(jest.fn().mockRejectedValue(new TypeError('Failed to fetch')));

    const online = await submitContactForm(new FormData(), 'REF001');
    expect(online).toMatchObject({ ok: false, kind: 'network' });

    Object.defineProperty(navigator, 'onLine', { value: false, configurable: true });
    const offline = await submitContactForm(new FormData(), 'REF001');
    expect(offline).toMatchObject({ ok: false, kind: 'offline' });
  });

  it('times out and warns the request may already have gone through', async () => {
    jest.useFakeTimers();
    setFetch(jest.fn((_url: string, init: RequestInit) => new Promise((_resolve, reject) => {
      init.signal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
    })));

    const pending = submitContactForm(new FormData(), 'REF001');
    jest.advanceTimersByTime(25_000);
    const result = await pending;
    jest.useRealTimers();

    expect(result).toMatchObject({ ok: false, kind: 'timeout' });
    if (!result.ok) expect(result.message).toMatch(/may have already gone through/);
  });
});

describe('newSubmissionReference', () => {
  it('produces a 6-character uppercase code the server accepts', () => {
    expect(newSubmissionReference()).toMatch(/^[A-Z0-9]{6}$/);
  });
});
