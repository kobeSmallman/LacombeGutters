# Lacombe Gutters — Project Notes for Claude

## PENDING: Flip MAIL_FROM to the authenticated domain

**Status as of 2026-05-24:** SendGrid domain authentication for `lacombeguttersltd.com` is already done (`em5789.lacombeguttersltd.com` shows verified — the 3 CNAMEs are already in the registrar's DNS). Link branding (`url694.lacombeguttersltd.com`) is also verified. **No DNS work remaining.**

**Why this still needs to happen:**
`MAIL_FROM` in Vercel is still pointing at a Gmail address. Gmail tightened DMARC enforcement in 2024/2025 and rejects mail where the From domain (`gmail.com`) doesn't match the authenticated sending domain (SendGrid) — causes a `4.7.32` deferral. Mail mostly still gets through on retries but it's unreliable and will get worse.

**Remaining steps (~5 minutes, no code changes required):**

1. Vercel → Project Settings → Environment Variables → change `MAIL_FROM` from the current Gmail address to `noreply@lacombeguttersltd.com` (Production scope).
2. Redeploy.

That's it. `noreply@lacombeguttersltd.com` doesn't need a real inbox — it just needs to be on the SendGrid-authenticated domain so DKIM/SPF align. `PROD_EMAIL_TO` (the inbox that receives notifications) stays as the Gmail address.

**Nothing in the codebase needs to change.** `src/lib/contactNotifications.ts:49` already reads `process.env.MAIL_FROM`, and the client-confirmation fallback at `:201` already defaults to `noreply@lacombeguttersltd.com`.

---

## Email Architecture

- Emails sent via **SendGrid** (`@sendgrid/mail`)
- Notification logic lives in `src/lib/contactNotifications.ts`
- Three API routes use it: `src/app/api/contact/route.ts`, `src/app/api/quote-request/route.ts`
- Job applications also use SendGrid directly in `src/app/api/job-application/route.ts`
- Twilio handles SMS notifications (optional, gracefully skipped if not configured)
- Business email fails loudly now (returns error to user) — this is intentional so silent delivery failures are caught

## SEO Work Done (April 2026)

Eavestrough/eavestroughing keyword expansion completed across:
- All city page templates (H1, meta title, meta description, services list, new eavestrough section)
- All service pages (5", 6", cleaning, downspouts, soffit & fascia)
- 12 new FAQ questions added (IDs 92–103) under "Eavestrough Terminology & Information"
- FAQ schema cap removed (was 25, now all questions submitted to Google)
- Schema fixes: wrong domain in schema-builder.ts fixed, catalog name updated, SERVICES constant updated

**Remaining SEO items (owner action required — cannot be done in code):**
- Google Business Profile: add eavestrough to description, services list, and category
- Unique city page content for top 5 cities (Red Deer, Airdrie, Wetaskiwin, Sylvan Lake, Stettler) — needs local knowledge from Rob/Ryan
- Google Search Console: resubmit sitemap + request indexing on top city pages
