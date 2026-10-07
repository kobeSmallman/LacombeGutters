import { addAttachments, MAX_ATTACHMENTS, MAX_TOTAL_BYTES } from '../attachments';

const fileOfSize = (name: string, type: string, bytes: number) =>
  new File([new Uint8Array(bytes)], name, { type });

describe('addAttachments', () => {
  it('accepts PDFs and small photos unchanged', async () => {
    const pdf = fileOfSize('quote.pdf', 'application/pdf', 200 * 1024);
    const photo = fileOfSize('roof.jpg', 'image/jpeg', 100 * 1024);
    const { accepted, rejected } = await addAttachments([], [pdf, photo]);
    expect(accepted).toEqual([pdf, photo]);
    expect(rejected).toEqual([]);
  });

  it('rejects unsupported file types', async () => {
    const { accepted, rejected } = await addAttachments([], [fileOfSize('notes.docx', 'application/msword', 10)]);
    expect(accepted).toHaveLength(0);
    expect(rejected[0].reason).toMatch(/photos and PDF/);
  });

  it('keeps the total under the upload budget', async () => {
    const big = fileOfSize('plans.pdf', 'application/pdf', MAX_TOTAL_BYTES - 1024);
    const next = fileOfSize('more.pdf', 'application/pdf', 10 * 1024);
    const { accepted, rejected } = await addAttachments([big], [next]);
    expect(accepted).toHaveLength(0);
    expect(rejected[0].reason).toMatch(/Too large to send/);
  });

  it('limits the number of files', async () => {
    const existing = Array.from({ length: MAX_ATTACHMENTS }, (_, i) => fileOfSize(`${i}.pdf`, 'application/pdf', 10));
    const { accepted, rejected } = await addAttachments(existing, [fileOfSize('extra.pdf', 'application/pdf', 10)]);
    expect(accepted).toHaveLength(0);
    expect(rejected[0].reason).toMatch(`up to ${MAX_ATTACHMENTS}`);
  });
});
