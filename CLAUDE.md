# Lacombe Gutters — Project Notes for Claude

## PENDING: Email DMARC Fix (do this before anything else email-related)

**The problem:**
SendGrid is sending notification emails using a Gmail address as the `MAIL_FROM`. Gmail changed their DMARC enforcement in 2024/2025 and now rejects emails where the From domain (`gmail.com`) doesn't match the authenticated sending domain (SendGrid). This causes a `4.7.32` deferral error. The site is over a year old and this worked fine until Gmail tightened enforcement — nothing in the code was broken.

Emails may still eventually deliver (421 is a temporary deferral, SendGrid retries) but it's unreliable and will get worse over time.

**The fix (15–20 minutes, no code changes required):**

1. Log into SendGrid → Settings → Sender Authentication → Domain Authentication
2. Enter `lacombeguttersltd.com` as the domain
3. SendGrid generates 3 CNAME records — copy them
4. Log into wherever `lacombeguttersltd.com` DNS is managed (ask Rob — likely GoDaddy, Namecheap, or Cloudflare)
5. Add the 3 CNAME records to the DNS provider
6. Back in SendGrid, click Verify (may take up to 48 hours to propagate)
7. In Vercel → Project Settings → Environment Variables, change `MAIL_FROM` from the current Gmail address to `noreply@lacombeguttersltd.com`
8. Trigger a Vercel redeploy

`noreply@lacombeguttersltd.com` does not need a real inbox — it just needs to be on the authenticated domain. The receiving address (`PROD_EMAIL_TO`) stays as the Gmail address unchanged.

**Nothing in the codebase needs to change.** `MAIL_FROM` is the only thing being updated.

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
