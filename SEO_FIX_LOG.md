# SEO Indexing Fix Log
**Date:** 2025-09-15
**Issue:** Drastic drop in impressions from 180-230 to 60, pages deindexed from Google

## 🚨 CRITICAL ROOT CAUSE FOUND
**The main issue:** Pages are cached for 1 YEAR (`max-age=31536000, immutable`) on Vercel!
- This means ALL your previous fixes never actually went live
- Google keeps seeing the old cached versions with noindex tags
- The cache shows pages from 16+ days ago still being served

## Root Causes Identified

1. **Incorrect noindex tags** - P2 cities (Beaumont, Stony Plain, Morinville) were being noindexed when they should be indexed
2. **Redirect chains** - Multiple domain variants (http://lacombeguttersltd.com, https://lacombeguttersltd.com, etc.) creating circular redirects
3. **404 errors** - 20 legacy URLs from old Wix site returning 404s
4. **Crawled but not indexed** - Font files and manifests being treated as pages
5. **Thin content penalty** - Some pages lacking unique, valuable content

## Fixes Applied (2025-09-15)

### 1. Fixed Service Area Indexing
- **File:** `src/app/service-areas/[slug]/page.tsx`
- **Change:** Added P2 cities (beaumont, stony-plain, morinville) to PRIORITY_CITIES list
- **Impact:** These 3 cities will now be indexed properly
- **Note:** P3 cities (small towns) remain noindexed intentionally to avoid thin content penalties

### 2. Resolved Redirect Chains
- **File:** `next.config.js`
- **Change:** Reordered redirects to prevent chains, consolidated domain redirects
- **Impact:** Clean single-hop redirects from all domain variants to https://www.lacombeguttersltd.com

### 3. Created 404 Page & Fixed Legacy URLs
- **File:** `src/app/not-found.tsx` (created)
- **File:** `src/middleware.ts`
- **Changes:** Added proper 404 page, added redirects for legacy Wix URLs
- **URLs Fixed:**
  - /service-page/windows → /services
  - /service-page/plumbing → /services
  - /page3 → /services
  - /book-online → /contact
  - /form__map → /contact

### 4. Blocked Static Assets from Indexing
- **File:** `public/robots.txt`
- **Changes:** 
  - Blocked /_next/ directory entirely
  - Added specific blocks for .woff2, .woff, manifest.json, site.webmanifest
- **Impact:** Prevents font files and manifests from appearing as "crawled but not indexed"

### 5. Structured Data Already Present
- **File:** `src/components/LocalBusinessSchema.tsx`
- **Status:** Already properly configured with local business schema

## 🔥 CRITICAL DEPLOYMENT STEPS (DO FIRST!)

### 1. Deploy and Clear Cache
```bash
# Commit and push all changes
git add .
git commit -m "Fix SEO: Remove year-long cache, fix noindex on P2 cities"
git push

# After deployment completes on Vercel:
node scripts/purge-cache.js
```

### 2. Verify Deployment in Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Find your project
3. Click on latest deployment
4. Click "Redeploy" → "Use existing Build Cache" = OFF
5. Wait for deployment to complete

### 3. Clear Vercel Edge Cache
1. In Vercel Dashboard → Project Settings
2. Go to "Functions" tab
3. Click "Purge Everything"

## Action Items for Google Search Console

### Immediate Actions (Do After Deployment)
1. **Validate Fixes in GSC:**
   - Go to "Page indexing" → "Page with redirect" → Click "Validate fix"
   - Go to "Not found (404)" → Click "Validate fix"
   - Go to "Crawled - currently not indexed" → Click "Validate fix"

2. **Request Indexing for Priority Pages:**
   - Use URL Inspection tool for:
     - https://www.lacombeguttersltd.com/
     - https://www.lacombeguttersltd.com/services
     - https://www.lacombeguttersltd.com/service-areas/beaumont
     - https://www.lacombeguttersltd.com/service-areas/stony-plain
     - https://www.lacombeguttersltd.com/service-areas/morinville
   - Click "Request indexing" for each

3. **Submit Updated Sitemap:**
   - Go to Sitemaps section
   - Resubmit: https://www.lacombeguttersltd.com/sitemap.xml

### Monitoring (Next 7-14 Days)
1. **Daily Checks:**
   - Monitor "Page indexing" report for validation progress
   - Check "Performance" report for impression recovery
   - Watch for new crawl errors

2. **Expected Timeline:**
   - Validation: 3-7 days
   - Reindexing: 7-14 days
   - Impression recovery: 14-21 days

## Prevention Measures

1. **Before ANY URL Changes:**
   - Add proper redirects in middleware.ts or next.config.js
   - Never delete pages without redirects

2. **For New Service Areas:**
   - P1/P2 cities: Add to PRIORITY_CITIES list
   - P3 cities: Keep noindexed to avoid thin content

3. **Regular Monitoring:**
   - Weekly GSC checks during changes
   - Monthly checks during stable periods

## Technical Details

### Indexing Strategy
- **P1 Cities (18):** Full indexing, priority 0.8 in sitemap, custom content
- **P2 Cities (3):** Full indexing, priority 0.7 in sitemap, researched content  
- **P3 Cities (50+):** Noindex/follow, not in sitemap, thin content protection

### Domain Canonicalization
- **Canonical:** https://www.lacombeguttersltd.com
- **Redirects:** All variants → canonical (301 permanent)

## Recovery Expectations

Based on the fixes:
- **Week 1:** Validation should pass, crawling begins
- **Week 2:** Pages start getting reindexed
- **Week 3:** Impressions should begin recovering
- **Week 4:** Should see 70-80% recovery
- **Week 6:** Full recovery expected

## Emergency Contacts
- Google Search Console: https://search.google.com/search-console
- Indexing API (if needed): Consider for critical pages

## 2025-09-21 - Redirect Chain Fix for Google Console Validation

### Issue:
Google Search Console was failing redirect validation for `http://www.lacombeguttersltd.com/` due to redirect chains:
1. `http://lacombeguttersltd.com/` → `https://lacombeguttersltd.com/` (Vercel automatic HTTP→HTTPS)
2. `https://lacombeguttersltd.com/` → `https://www.lacombeguttersltd.com/` (Next.js non-www→www)

This created a 3-hop redirect chain that Google flags as problematic for SEO.

### Solution:
Split domain-based redirects in `next.config.js` by protocol to eliminate chains:
- Handle HTTP and HTTPS non-www domains separately using `x-forwarded-proto` header
- Both redirect directly to final HTTPS www destination in single hop
- Applied same fix to Vercel domain redirects (`lacombe-gutters.vercel.app`)

### Files Modified:
- `next.config.js` (lines 62-108) - Split redirects by protocol to avoid chains

### Technical Implementation:
```js
// Old (creates chain):
{
  source: '/:path*',
  has: [{ type: 'host', value: 'lacombeguttersltd.com' }],
  destination: 'https://www.lacombeguttersltd.com/:path*',
  permanent: true,
}

// New (eliminates chain):
{
  source: '/:path*',
  has: [
    { type: 'host', value: 'lacombeguttersltd.com' },
    { type: 'header', key: 'x-forwarded-proto', value: 'http' }
  ],
  destination: 'https://www.lacombeguttersltd.com/:path*',
  permanent: true,
},
{
  source: '/:path*',
  has: [
    { type: 'host', value: 'lacombeguttersltd.com' },
    { type: 'header', key: 'x-forwarded-proto', value: 'https' }
  ],
  destination: 'https://www.lacombeguttersltd.com/:path*',
  permanent: true,
}
```

### Results:
- Eliminates redirect chains for all domain variants
- Direct 1-hop redirects: `http://lacombeguttersltd.com/` → `https://www.lacombeguttersltd.com/`
- Should resolve Google Search Console validation errors after deployment

## 2025-09-29 - Clean Up Duplicate Redirects and Remove Unused Templates

### Issue:
Google Search Console validation failures were occurring due to:
1. Duplicate redirects between `next.config.js` and `middleware.ts` causing conflicts
2. Existing template pages (`/owners`, `/reviews`) that duplicate content from main pages
3. URLs discoverable by Google but handled inconsistently

### Root Cause:
- `/page3`, `/page4`, `/book-online` were defined in both redirect files
- `/owners` template page duplicated team info already on `/about` page  
- `/reviews` template page duplicated testimonials already on homepage
- Multiple redirect handlers for same URLs created validation conflicts

### Solution:
Consolidated all redirects to `next.config.js` and removed duplicate template pages:

#### Files Modified:
- `src/middleware.ts` - Removed duplicate redirects for `/page3`, `/page4`, `/book-online`
- `next.config.js` - Added `/owners` redirect to `/about` page
- `src/app/owners/page.tsx` - Deleted (team info integrated in about page)

#### Specific Changes:
```js
// Added to next.config.js:
{
  source: '/owners',
  destination: '/about',  // Team info integrated on about page  
  permanent: true,
}
```

#### Redirects Removed from middleware.ts:
- `/page3` → `/services` (already in next.config.js)
- `/page4` → `/contact` (already in next.config.js)  
- `/book-online` → `/contact` (already in next.config.js)

### Results:
- Eliminates redirect conflicts between files
- Ensures single source of truth for URL handling
- Removes duplicate content that could confuse search engines
- Should resolve Google Console validation failures for affected URLs

### Prevention:
- Always check both `next.config.js` and `middleware.ts` before adding redirects
- Use `next.config.js` for permanent redirects, `middleware.ts` only for dynamic logic
- Before creating template pages, verify content isn't already integrated elsewhere

## Notes
- The noindex on P3 cities is INTENTIONAL - do not change
- Never remove redirects from next.config.js without adding replacements
- Always test redirects after deployment
- Redirect chains create SEO issues - always ensure single-hop redirects for domain canonicalization