// Client-side attachment handling shared by every form that posts to /api/contact.
//
// Vercel rejects function request bodies over 4.5 MB with a plain-text 413 before
// our route ever runs, so the lead is silently lost. Phone photos are routinely
// 3–8 MB each, so we shrink them in the browser and enforce a total budget that
// leaves headroom for the text fields.

export const MAX_ATTACHMENTS = 6;
export const MAX_TOTAL_BYTES = 4 * 1024 * 1024;

const MAX_DIMENSION = 1600;
const JPEG_QUALITY = 0.8;
// Small browser-friendly images aren't worth re-encoding.
const SKIP_COMPRESSION_BELOW = 500 * 1024;

const PASSTHROUGH_IMAGE_TYPES = ['image/gif', 'image/svg+xml'];

export interface RejectedAttachment {
  name: string;
  reason: string;
}

export interface AttachmentResult {
  accepted: File[];
  rejected: RejectedAttachment[];
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function totalBytes(files: File[]): number {
  return files.reduce((sum, file) => sum + file.size, 0);
}

function isPdf(file: File): boolean {
  return file.type === 'application/pdf' || /\.pdf$/i.test(file.name);
}

function isImage(file: File): boolean {
  // iPhone HEIC files sometimes arrive with an empty MIME type.
  return file.type.startsWith('image/') || /\.(heic|heif)$/i.test(file.name);
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`Could not decode ${file.name}`));
    };
    img.src = url;
  });
}

async function compressImage(file: File): Promise<File> {
  const img = await loadImage(file);
  const scale = Math.min(1, MAX_DIMENSION / Math.max(img.naturalWidth, img.naturalHeight));
  const width = Math.round(img.naturalWidth * scale);
  const height = Math.round(img.naturalHeight * scale);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas not available');

  // JPEG has no alpha channel — paint white so transparent PNGs don't turn black.
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(img, 0, 0, width, height);

  const blob = await new Promise<Blob | null>(resolve =>
    canvas.toBlob(resolve, 'image/jpeg', JPEG_QUALITY)
  );
  if (!blob) throw new Error('Canvas export failed');

  const baseName = file.name.replace(/\.[^.]+$/, '') || 'photo';
  return new File([blob], `${baseName}.jpg`, { type: 'image/jpeg', lastModified: Date.now() });
}

// Shrinks a photo if that helps; otherwise returns the original file unchanged.
export async function prepareAttachment(file: File): Promise<File> {
  if (!isImage(file) || PASSTHROUGH_IMAGE_TYPES.includes(file.type)) return file;

  const browserFriendly = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
  if (browserFriendly && file.size <= SKIP_COMPRESSION_BELOW) return file;

  try {
    const compressed = await compressImage(file);
    return compressed.size < file.size || !browserFriendly ? compressed : file;
  } catch (error) {
    // e.g. HEIC on a browser that can't decode it — fall back to the original.
    console.warn('Photo compression skipped:', error);
    return file;
  }
}

// Validates, compresses and budget-checks newly added files against the ones already attached.
export async function addAttachments(existing: File[], incoming: File[]): Promise<AttachmentResult> {
  const accepted: File[] = [];
  const rejected: RejectedAttachment[] = [];
  let count = existing.length;
  let bytes = totalBytes(existing);

  for (const file of incoming) {
    if (!isImage(file) && !isPdf(file)) {
      rejected.push({ name: file.name, reason: 'Only photos and PDF files can be attached.' });
      continue;
    }
    if (count >= MAX_ATTACHMENTS) {
      rejected.push({ name: file.name, reason: `You can attach up to ${MAX_ATTACHMENTS} files.` });
      continue;
    }

    const prepared = await prepareAttachment(file);
    if (bytes + prepared.size > MAX_TOTAL_BYTES) {
      rejected.push({
        name: file.name,
        reason: `Too large to send through the form (${formatBytes(prepared.size)}, ${formatBytes(MAX_TOTAL_BYTES - bytes)} left). You can text or email it to us after submitting.`,
      });
      continue;
    }

    accepted.push(prepared);
    count += 1;
    bytes += prepared.size;
  }

  return { accepted, rejected };
}
