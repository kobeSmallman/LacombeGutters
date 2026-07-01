// Real content "last modified" dates for the XML sitemap.
//
// Bing has stated that an accurate <lastmod> is a top signal for AI-era crawling
// and explicitly warns AGAINST setting it to the time the sitemap was generated.
// So we keep stable, real dates here and only bump a page's entry when that
// page's content actually changes — never on every build.
//
// `path` is the URL path with no leading/trailing slash; '' is the homepage.

export const DEFAULT_LASTMOD = '2026-06-23';

// Override a specific path only when its content genuinely changes. Keep dates in
// ISO YYYY-MM-DD form. Anything not listed falls back to DEFAULT_LASTMOD.
export const LASTMOD_OVERRIDES: Record<string, string> = {
  // '': '2026-06-23',                 // homepage
  // 'services/gutter-cleaning': '2026-06-23',
};

/** Returns a stable Date for the given path, for use as sitemap `lastModified`. */
export function lastModifiedFor(path: string): Date {
  const key = path.replace(/^\//, '').replace(/\/$/, '');
  return new Date(LASTMOD_OVERRIDES[key] ?? DEFAULT_LASTMOD);
}
