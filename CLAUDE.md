# Lacombe Gutters — Project Notes for Claude

## DONE: MAIL_FROM moved to the authenticated domain (2026-08-26)

SendGrid domain authentication for `lacombeguttersltd.com` was already in place
(`em5789.lacombeguttersltd.com` verified, 3 CNAMEs live in the registrar; link branding
`url694.lacombeguttersltd.com` also verified). The remaining problem was that `MAIL_FROM`
in Vercel still pointed at a Gmail address, so the visible From domain (`gmail.com`) didn't
align with SendGrid's DKIM signature — Gmail answered `421 4.7.32 Deferred`.

`MAIL_FROM` is now `Lacombe Gutters <noreply@lacombeguttersltd.com>` (Vercel, Production).
That mailbox does not exist and doesn't need to — nothing is ever delivered to it; it only
has to be on the SendGrid-authenticated domain so DKIM aligns. `PROD_EMAIL_TO` stays as the
Gmail address; receiving at Gmail was never the problem.

Because the From is now a no-reply address, `Reply-To` headers were added in
`src/lib/contactNotifications.ts`:
- Business lead notifications reply to the customer (`data.email`).
- Customer confirmations reply to `PROD_EMAIL_TO`.

If a deferral shows up again, confirm `MAIL_FROM` is still on `lacombeguttersltd.com`
before touching DNS.

---

## Email Architecture

- Emails sent via **SendGrid** (`@sendgrid/mail`)
- Notification logic lives in `src/lib/contactNotifications.ts`
- Three API routes use it: `src/app/api/contact/route.ts`, `src/app/api/quote-request/route.ts`
- Job applications also use SendGrid directly in `src/app/api/job-application/route.ts`
- Twilio handles SMS notifications (optional, gracefully skipped if not configured)
- Business email fails loudly now (returns error to user) — this is intentional so silent delivery failures are caught

## Form submission (all four forms → `/api/contact`)

- Vercel rejects request bodies over **4.5 MB** with a plain-text 413 before the route runs. Photos are
  resized in the browser and capped at 6 files / 4 MB total (`src/lib/attachments.ts`, `src/hooks/useAttachments.ts`).
- Always submit through `submitContactForm` (`src/lib/submitForm.ts`), never a bare `fetch` + `response.json()` —
  that pattern turned every non-JSON reply into a misleading "Network error".
- Turnstile tokens are single-use: reset the widget (`turnstileRef.current.reset()`) after every submit.
- The route returns as soon as the business email is accepted; SMS + customer confirmation run in `after()`.
  Timeouts: Turnstile 8s + SendGrid 15s on the server, 25s on the client — keep server < client.
- A 6-char reference (stable across retries) is shown to the customer and appended to the email subject, so a
  duplicate from a timed-out retry is recognisable.

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
