# ⛵ Windsurf Workspace Rules – Lacombe Gutters Website
# ────────────────────────────────────────────────────
# These rules sit **alongside** the global rules file.
# They are loaded *in addition* to, and **override when in conflict with,**
# the global standards you drafted earlier.
#
# Global rules ⇢ team‑wide conventions.
# Workspace rules ⇢ project‑specific constraints & assets.
# Keep this file ≤ 6 000 characters so Windsurf never truncates it.

<project_overview>
• Rebuild lacombeguttersltd.com using **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS 3+**, and **shadcn/ui**.  
• Primary call‑to‑action: *Free Estimate* (button + phone link).  
• Secondary: *Request Gutter Cleaning*.  
• Site is brochure‑style but architected for future CMS or e‑commerce expansion.  
• Deploy on **Vercel**; pre‑render with SSG where possible, SSR only if dynamic data is added later.  
</project_overview>

<architecture>
• Use the **feature‑folder pattern** under `/src`  
  ├─ `app/` – route files (`page.tsx`, `layout.tsx`, etc.)  
  ├─ `components/` – truly reusable UI elements  
  ├─ `features/` – domain bundles (e.g. `services/`, `gallery/`, `contact/`)  
  ├─ `content/` – Markdown / JSON data sources (services, testimonials, areas)  
  ├─ `hooks/`, `lib/`, `types/`, `utils/` as needed  
• No component deeper than **two** nested folders.  
• All pages exported via **default async React FC** in PascalCase files.  
</architecture>

<routing>
• File‑based routing mirrors the public URL structure below:  
  `/` → Home  
  `/services` → overview  
  `/services/[slug]` → detail pages (soffit‑fascia, 5‑inch‑gutters, etc.)  
  `/service‑areas`  
  `/gallery`  
  `/contact`  
• Nested `layout.tsx` in `/services` supplies the left‑rail subnav.  
</routing>

<styling>
• Brand palette:  
  `--clr-primary` #215e7d (deep steel blue)  
  `--clr-secondary` #fbbe24 (sun‑yellow accent)  
  `--clr-neutral` #f5f7f9 / #1c1c1c  
• Tailwind config exposes those as `colors.primary`, `colors.secondary`, etc.  
• Use **`cva` variants** in shadcn/ui for all buttons:  
  - `size` = sm | md | lg ; `variant` = primary | secondary | ghost.  
• All images via **`next/image`** with `sizes="100vw"` for responsive loading.  
</styling>

<assets>
• Place raster assets in `/public/images/`; name with kebab‑case (`service-area-map.webp`).  
• SVG icons live in `/src/components/icons/`. Inline SVG for small icons; otherwise import as ReactComponent.  
• Maximum hero background size 250 KB (compressed WebP).  
</assets>

<content_structure>
• **Services** defined in `content/services.json`; each entry:  
  ```jsonc
  { "slug": "soffit-fascia",
    "name": "Soffit & Fascia",
    "excerpt": "Protect and ventilate your roofline …",
    "body": "./services/soffit-fascia.md",
    "hero": "/images/services/soffit_fascia_hero.webp" }
• Service areas in content/areas.json; Testimonials in content/testimonials.json.
• Import content via next-mdx-remote (SSG).
</content_structure>

<accessibility> • Every interactive element reachable by keyboard. • Maintain WCAG AA color contrast (≥ 4.5:1). • Use semantic HTML first; ARIA only when unavoidable. </accessibility> <performance> • Enable `next/font/google` with `display:swap`. • Use `react-wrap-balancer` on all headings > h2. • Set `images.unoptimized=false`; rely on Vercel image optimization. </performance> <seo> • Dynamic `<title>` and `<meta name="description">` per route via `generateMetadata`. • JSON‑LD **Organization** schema on `_app`. • Open Graph tags (`og:*`, `twitter:*`) generated in `Seo.tsx`. </seo>
<ci_cd>
• GitHub Actions workflow: lint → type‑check → unit tests → next build → deploy preview.
• Block PR merge unless checks pass and 1 review approved.
</ci_cd>

<git_conventions>
• Branch names: lg/<ticket-or-brief>-short-slug (e.g. lg/57-contact-form)
• Follow Conventional Commits:
feat: Add …, fix: …, refactor: …, docs: …, chore: …
</git_conventions>

<tests> • Unit tests with **Vitest + Testing Library/react** under `__tests__/`. • Cypress e2e for contact form and main CTA flows; run on PR previews. </tests>
<review_checklist> (short version)
☑ Lint passes & Prettier formatted
☑ Types OK (no any unless justified)
☑ All images have alt text
☑ No hard‑coded secrets
☑ Lighthouse ≥ 90 on PWA, Access, Best Practices, SEO
</review_checklist>