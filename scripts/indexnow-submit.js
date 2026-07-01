#!/usr/bin/env node
/**
 * IndexNow submitter for Lacombe Gutters.
 *
 * Pings the IndexNow API so Bing (and Yandex) re-crawl our URLs quickly.
 * Google does NOT use IndexNow, so this is purely additive and cannot affect
 * Google rankings.
 *
 * Usage:
 *   node scripts/indexnow-submit.js                 # submit every indexable URL from the live sitemap
 *   node scripts/indexnow-submit.js <url> [<url>..] # submit only the URLs you pass
 *
 * The key file must be reachable at https://www.lacombeguttersltd.com/<KEY>.txt
 * (it lives in /public), otherwise IndexNow rejects the submission.
 */

const HOST = 'www.lacombeguttersltd.com';
const BASE_URL = `https://${HOST}`;
const KEY = '4d64cd60de22ae826fac7e21c0158e2c';
const KEY_LOCATION = `${BASE_URL}/${KEY}.txt`;
const SITEMAP_URL = `${BASE_URL}/sitemap.xml`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

async function urlsFromSitemap() {
  const res = await fetch(SITEMAP_URL, { headers: { 'User-Agent': 'indexnow-submit/1.0' } });
  if (!res.ok) {
    throw new Error(`Failed to fetch sitemap (${res.status} ${res.statusText})`);
  }
  const xml = await res.text();
  const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
  if (locs.length === 0) {
    throw new Error('No <loc> entries found in sitemap');
  }
  return locs;
}

async function main() {
  const cliUrls = process.argv.slice(2).filter(Boolean);
  const urlList = cliUrls.length > 0 ? cliUrls : await urlsFromSitemap();

  // Guard against submitting URLs for a different host (IndexNow rejects the whole batch).
  const offHost = urlList.filter((u) => !u.startsWith(BASE_URL));
  if (offHost.length > 0) {
    throw new Error(`Refusing to submit URLs not on ${HOST}:\n  ${offHost.join('\n  ')}`);
  }

  const body = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList };

  console.log(`Submitting ${urlList.length} URL(s) to IndexNow...`);
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });

  // IndexNow returns 200/202 on success; 4xx on problems (e.g. key not found).
  const text = await res.text().catch(() => '');
  if (res.ok || res.status === 202) {
    console.log(`IndexNow accepted the submission (HTTP ${res.status}).`);
  } else {
    console.error(`IndexNow rejected the submission (HTTP ${res.status}). ${text}`.trim());
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(`IndexNow submission failed: ${err.message}`);
  process.exitCode = 1;
});
