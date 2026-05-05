# Farhand SEO & Marketing Dashboard

Living status doc. **Last updated: 2026-05-05.**

## 2026-05-05 SEO push #5 (LocalBusiness, multi-domain, internal linking, partners)

Big push to bring everything to "rich-result eligible" status and prepare the
multi-domain footprint.

### Structured data

- **Organization → ProfessionalService dual-typed**: `@type` is now
  `["Organization", "ProfessionalService"]`. Adds `geo` (lat/lng of
  registered office), `serviceArea` (GeoShape, US-wide), `openingHoursSpecification`
  (24/7 emergency + weekday business-hours support), `priceRange` (`$$`),
  `paymentAccepted`, `currenciesAccepted`, expanded `knowsAbout` (21 brands +
  techs), expanded `serviceType` (12 service categories), `slogan`,
  `knowsLanguage`. Reserved `sameAs` placeholders for GitHub, Crunchbase,
  ProductHunt, F6S, FB, IG, YouTube — uncomment as those profiles get claimed.
- **VideoObject** on the homepage — wraps the hero MP4 with thumbnail
  (`hero-poster.jpg`), upload date, content URL, publisher reference. Makes
  Farhand's hero video eligible for video rich results.
- **Service schema with per-city geo** on programmatic
  `/services/[machine]/[city]` pages. New `src/data/cityCoords.ts` with
  lat/lng for the top ~85 cities. Service schema now renders `areaServed`
  as a `City` entity with `GeoCoordinates` + `containedInPlace` (Country).
  Falls back to country-level for cities not yet in the coords map.
- `productSchema()` in `src/lib/schema.ts` now uses `provider: { @id }`
  reference instead of inlining Organization — DRY, more efficient parsing.

### Multi-domain readiness

- **Reusable host-redirect block in `next.config.ts`**: `ALTERNATE_HOSTS`
  array drives the redirect rules. Drop a new entry, redeploy, and any
  request on that host 301s to `farhand.ai`. Ready slots commented in for
  `farhandrobotics.com`, `farhand.io`, `farhand.com`, `farhand.us`,
  `getfarhand.com`, `tryfarhand.com` — uncomment after Vercel domain add.
- Domain-add procedure documented inline.

### Internal linking

- **Related posts** on every blog post — 3 cards at the bottom of each
  article, prioritising same-category posts, fallback to most-recent. Boosts
  internal link graph + dwell time + crawl depth on long-tail pages.
- Implemented in `src/components/BlogPost.tsx`; `slug="..."` prop wired
  into all 23 blog post pages via codegen.

### Sitemap

- **Sourced from `src/data/blogPosts.ts`** instead of a 22-slug hardcoded list
  — fixes the SEO bug where the new MTTR post wasn't in the sitemap.
- **`lastModified`** on blog entries now uses each post's actual date instead of
  treating every crawl as "now" (more honest signal to search engines).
- **Per-post images entries** — each blog sitemap entry now declares its
  `/blog/<slug>/opengraph-image` for Google Images discoverability.

### New page

- **`/partners`** — directory of industry-body memberships, conference
  partnerships, and reciprocal-link targets. Added to sitemap. Each entry has
  a clear `Active` / `Planned` badge so we can systematically work through
  pursuing claim/listing for each.

## 2026-05-04 SEO push #4 (domain migration + per-post OG + reputation signals)

- **Canonical domain migrated**: `farhand.live` → `farhand.ai`. 53 hardcoded URL
  references replaced across 38 files (canonicals, OG metadata, sitemap, schema,
  robots.txt, RSS feed, page metadata, README/SEO/TODOS docs). All 19 `@farhand.live`
  email addresses preserved (mailbox migration is a later phase).
- **Host-based 301** in `next.config.ts`: `farhand.live/*` and `www.farhand.live/*`
  → `https://farhand.ai/*`. Both domains alias the same Vercel project; Next.js
  matches on Host header so the redirect only fires for legacy-domain requests.
- **Per-blog-post OG images**: each of the 23 posts generates its own 1200×630 social
  card with title + excerpt + category. New `src/lib/blog-og.tsx` factory plus 23
  thin `opengraph-image.tsx` files (one per blog directory). Better LinkedIn / X
  share rendering than every post sharing the homepage OG.
- **`/.well-known/security.txt`** (RFC 9116) — standard security disclosure file.
- **Hero poster fix** — was loading `/opengraph-image` (the social-share text card)
  as the video poster, causing a giant text overlay flash on first paint. Replaced
  with `hero-poster.jpg` (335KB) — a representative frame from the same MP4.

## 2026-04-22 SEO push #3 (page-level metadata + breadcrumbs + hero LCP)

- **15 static pages** now have `alternates.canonical`, `openGraph`, and `twitter` overrides where they had only title+description before:
  - 7 service pages (`/services/robots`, `industrial-robots`, `industrial-machinery`, `instruments`, `equipment`, `medical-equipment`, `general-aviation`)
  - 8 stakeholder pages (`/for/oems`, `distributors`, `fleet-operators`, `facilities`, `japanese-oems`, `european-oems`, `taiwanese-oems`, `chinese-oems`)
- **ArticleSchema** now emits BreadcrumbList alongside Article for every blog post — Home › Blog › Post Title.
- **Hero video** — added `poster="/opengraph-image"` for instant LCP paint, `preload="metadata"` (blocks ~4 MB video until after content renders), `aria-hidden` (screen readers skip decorative video).
- Build verified, deployed.

## 2026-04-22 SEO push #2 (perf + infra)

- **`@next/third-parties/google`** — GA4 now loaded via `<GoogleAnalytics gaId=...>` in `<body>`. Replaces the inline `<script async>` + `dataLayer` boilerplate. Auto-deferred, zero FCP blocking, Next 16-optimized.
- **`next.config.ts` hardened** — was empty; now has:
  - `poweredByHeader: false` (strips X-Powered-By)
  - `compress: true`
  - `experimental.optimizePackageImports: ['framer-motion', 'lucide-react', 'react-icons', '@phosphor-icons/react']` — tree-shakes these heavy libs automatically
  - `images: { formats: ['image/avif','image/webp'], minimumCacheTTL: 31536000 }`
  - `headers()` function emitting:
    - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
    - `X-Content-Type-Options: nosniff`
    - `X-Frame-Options: SAMEORIGIN`
    - `Referrer-Policy: strict-origin-when-cross-origin`
    - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
    - `Cache-Control: public, max-age=31536000, immutable` for /public static files + OG/Twitter image routes
- **`src/lib/schema.ts`** — `ORG_LOGO` now points at the branded PNG (`/logo-w-type-light-on-dark.png`) not the favicon SVG. Article schema fallback `image` is now the dynamic `/opengraph-image` route (not the missing `/og-default.jpg`).
- **Remaining `<img>` → `next/image` migration**:
  - `src/components/CoverageMap.tsx` — world coverage map (fill + sizes)
  - `src/components/FeaturedOn.tsx` — press logos (preserves the dynamic filter prop)
  - `src/app/for/robotics-labs/page.tsx` — Aaryan signature
- **Build verified locally** — 573 routes built.

## 2026-04-22 SEO push #1 (structured data + metadata)

- **Dynamic OG image** — `src/app/opengraph-image.tsx` (Edge, 1200×630 PNG). Social cards now render the brand + headline + accent dot in farhand-green. `src/app/twitter-image.tsx` re-exports it.
- **Organization schema** enriched — added `legalName`, `foundingDate`, `founder`, `address`, dual `contactPoint` (sales + support), `sameAs` (LinkedIn + X), `knowsAbout` list, `logo` ImageObject with dimensions, `@id` anchor.
- **WebSite schema** added — enables Google sitelinks search box; targets `/blog?q={search_term_string}`.
- **Root metadata expanded** — `applicationName`, `authors`, `creator`, `publisher`, `keywords` (15 industrial/AI terms), `alternates.canonical`, richer `twitter` (`creator`, `site`), explicit `robots.googleBot` with `max-image-preview: large`, `formatDetection` off, `referrer: origin-when-cross-origin`.
- **Viewport** split out per Next 16 convention — `themeColor: #08070E` (was `#000000`), `colorScheme: dark`.
- **Home page metadata** — previously inherited defaults; now has page-specific title, description, canonical, OG overrides.
- **Sitemap** — added `/pitch`, `/oem`, `/relay`, `/connect`, `/for/robotics-labs` (was missing from programmatic map).
- **robots.txt** — explicit allow for `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `Applebot-Extended`; explicit disallow for `CCBot`, `ImagesiftBot`, `DataForSeoBot`; preserves Sitemap line and `/ui` disallow.
- **Preconnect / DNS-prefetch hints** — `googletagmanager.com`, `google-analytics.com`, `fonts.googleapis.com`.
- **`<img>` → `next/image`** — Navigation logo (priority) and Footer logo (lazy), fixes LCP + CLS on every page.
- **`middleware.ts` → `proxy.ts`** — Next 16 deprecation cleaned up (function renamed `middleware` → `proxy`).
- **Build verified locally**, deployed to prod on Farhand team.

Single source of truth for all SEO, analytics, lead capture, content, and marketing infrastructure. Update this file alongside every code change that affects marketing or SEO.

## Backlinks created

_Running log. Every new inbound link to `farhand.ai` lands here with date, source, target page, anchor text, and type. Keep chronological._

| Date | Source URL | Target page on farhand.ai | Anchor text | Type | Notes |
|---|---|---|---|---|---|
| | | | | | |

**Legend for Type:**
- `guest post` — long-form article authored on another site
- `directory` — listing in a business / industry directory
- `profile` — link from a personal or company profile (LinkedIn, Crunchbase, etc.)
- `press` — article/mention in media outlet
- `forum` — forum comment or answer
- `syndication` — content cross-post on platforms like Dev.to, Hashnode, Telegraph
- `partner` — reciprocal link from a partner or customer site

---

## Status at a glance

| Category | Status | Details |
|---|---|---|
| **Pages live** | ✅ 570+ | 37 static + 525 programmatic + 8 new (intl + pitch + connect) |
| **Blog posts** | ✅ 22 | 18 existing + 4 new brand-targeted posts |
| **GA4** | ✅ live | `G-CMC24D7416` firing on every page via `NEXT_PUBLIC_GA4_MEASUREMENT_ID` |
| **Google Search Console** | ✅ verified | HTML file method, sitemap submitted |
| **Bing Webmaster** | ✅ imported | From GSC, sitemap submitted |
| **Vercel Analytics + Speed Insights** | ✅ live | `@vercel/analytics` + `@vercel/speed-insights` in `layout.tsx` |
| **Schema.org** | ✅ | Organization+ProfessionalService, VideoObject, Article, Service (with City+geo on programmatic), Breadcrumb, FAQ, WebSite |
| **Sitemap** | ✅ dynamic + image | `src/app/sitemap.ts`, 595+ URLs, per-post OG images, per-post lastmod |
| **robots.txt** | ✅ | `public/robots.txt`, blocks `/ui` |
| **RSS feed** | ✅ | `src/app/rss.xml/route.ts` |
| **Lead capture (OEM form)** | ✅ | `/oem` → `/api/oem-lead` → Notion "Website Leads" DB |
| **Lead capture (reverse IP)** | ✅ code shipped | `src/middleware.ts` + `/api/visit`, no-op without `IPINFO_TOKEN` |
| **Notion CRM** | ✅ | "Website Leads" DB with 16 properties, integration token live |
| **Auto-deploy** | ✅ | GitHub Actions → Vercel on every push to main |
| **IndexNow** | ✅ | Pings Bing+Yandex after every deploy + weekly Monday |
| **Lighthouse CI** | ✅ | Weekly Monday, files GitHub issue on regression |
| **Scheduled blog agent** | ✅ | Weekly Monday 9am PT, writes + commits + pushes a new post |
| **Scheduled page expansion** | ✅ | Monthly 1st, adds 10 cities (+70 programmatic pages) |
| **Scheduled competitor scan** | ✅ | Weekly Thursday 10am PT, writes findings to Notion (Outbound Engine page); agent lives in `farhand-gtm` |
| **Apollo enrichment** | ⚠️ stubbed | Code ready, needs `APOLLO_API_KEY` env var |
| **IPinfo reverse IP** | ⚠️ stubbed | Code ready, needs `IPINFO_TOKEN` env var |
| **LinkedIn Insight Tag** | ⚠️ stubbed | Code ready, needs `NEXT_PUBLIC_LINKEDIN_PARTNER_ID` |
| **Meta Pixel** | ⚠️ stubbed | Code ready, needs `NEXT_PUBLIC_META_PIXEL_ID` |
| **Content syndication** | ⚠️ partial | Telegraph token set. Dev.to, Hashnode need keys. 5/22 posts syndicated. |
| **Newsletter provider** | ⬜ | API route is placeholder (`console.log`). Need Loops/Resend/Beehiiv. |
| **HARO / Featured signup** | ⬜ | Requires manual signup at featured.com. Highest-ROI backlink strategy. |
| **Google Business Profile** | ⬜ | Needs claim at business.google.com. LocalBusiness schema (`@type: ProfessionalService`) is already on every page so the claim flow has rich signal to work from. |
| **Multi-domain redirects** | ✅ ready | `ALTERNATE_HOSTS` in `next.config.ts` — drop a domain in, redeploy, it 301s to farhand.ai |
| **Internal linking (related posts)** | ✅ | 3-card "Keep reading" strip on every blog post |
| **Search Atlas OTTO active** | ⚠️ | Widget engaged but `is_active: false`. One-click toggle in SA dashboard. |

---

## Page inventory

### Static pages (14)
| Route | Purpose | Indexed |
|---|---|---|
| `/` | Homepage | yes |
| `/faq` | FAQ with Schema.org | yes |
| `/privacy` | Privacy policy (updated: visitor tracking disclosure) | yes |
| `/terms` | Terms of service | yes |
| `/oem` | QR lead capture (one-field company + name) | **no** (noindex) |
| `/pitch` | Trackable one-pager (replaces PDF) | **no** (noindex) |
| `/connect` | Digital business card (QR on physical card) | **no** (noindex) |
| `/ui` | Component sandbox | **no** (noindex, robots.txt blocked) |
| `/for/oems` | Stakeholder: OEMs | yes |
| `/for/distributors` | Stakeholder: Distributors | yes |
| `/for/fleet-operators` | Stakeholder: Fleet operators | yes |
| `/for/facilities` | Stakeholder: Facilities | yes |
| `/for/japanese-oems` | International: Japan (FANUC, Yaskawa, Mazak) | yes |
| `/for/european-oems` | International: Europe (KUKA, ABB, Siemens) | yes |
| `/for/taiwanese-oems` | International: Taiwan (TSMC suppliers, Delta) | yes |
| `/for/chinese-oems` | International: China (SANY, Estun, Siasun) | yes |

### Service pages (7 static + 525 programmatic)
| Route pattern | Count | Source data |
|---|---|---|
| `/services/{machine}` | 7 | `src/data/machineTypes.ts` (7 machine types) |
| `/services/{machine}/{city}` | 525 | 7 machines × 75 cities from `src/data/cities.ts` |

Machine types: robots, industrial-robots, industrial-machinery, instruments, equipment, medical-equipment, general-aviation.

### Blog posts (22)
| # | Slug | Category | Date |
|---|---|---|---|
| 1 | `semiconductor-equipment-field-service-benchmarks` | Insights | 2026-04-14 |
| 2 | `medical-device-field-service-fda-compliance` | Technical | 2026-04-14 |
| 3 | `field-service-kpis-that-matter-2026` | Insights | 2026-04-14 |
| 4 | `kuka-robot-service-us` | Industry | 2026-04-15 |
| 5 | `yaskawa-robot-maintenance-us` | Technical | 2026-04-15 |
| 6 | `tsmc-supplier-equipment-service` | Industry | 2026-04-15 |
| 7 | `siemens-industrial-service-us` | Industry | 2026-04-15 |
| 8 | `field-service-roi-calculator` | Insights | 2026-04-12 |
| 9 | `fanuc-robot-maintenance-checklist` | Technical | 2026-04-12 |
| 10 | `industrial-robot-downtime-cost` | Insights | 2026-04-12 |
| 11 | `predictive-vs-preventive-maintenance` | Technology | 2026-04-12 |
| 12 | `remote-diagnostics-field-service` | Industry | 2026-04-12 |
| 13 | `oem-field-service-scaling` | Industry | 2026-04-12 |
| 14 | `cobot-maintenance-guide` | Technical | 2026-04-12 |
| 15 | `reduce-truck-rolls-ai` | Technology | 2026-04-12 |
| 16 | `field-service-trends-2026` | Industry | 2026-04-12 |
| 17 | `first-time-fix-rate-ai` | Insights | 2026-04-12 |
| 18 | `knowledge-preservation-field-service` | Insights | 2026-04-12 |
| 19 | `remote-resolution-field-service` | Technology | 2026-04-12 |
| 20 | `field-service-skills-gap` | Industry | 2026-04-12 |
| 21 | `ai-guided-field-service-robots` | Technology | 2026-04-12 |
| 22 | `field-service-knowledge-management` | Industry | 2026-04-12 |

Source of truth: `src/data/blogPosts.ts`. All posts follow the canonical pattern in `src/app/blog/field-service-roi-calculator/page.tsx`.

### API routes (3)
| Route | Purpose |
|---|---|
| `/api/oem-lead` | OEM form submission → Apollo enrichment → Notion |
| `/api/visit` | Reverse IP visitor identification (called by middleware) |
| `/api/newsletter` | Newsletter signup (placeholder, logs only) |

---

## Infrastructure

### Hosting & DNS
| Component | Service | Account |
|---|---|---|
| Registrar | GoDaddy (pending transfer to Cloudflare) | aaryanragrawal |
| DNS | **Cloudflare** (NS: anuj/dolly.ns.cloudflare.com) | Aaryanragrawal@gmail.com |
| Hosting | **Vercel** (project: farhand-website) | aaryanragrawal-1878 |
| CI/CD | **GitHub Actions** → Vercel auto-deploy | AaryanAgrawal/farhand-website |
| CRM | **Notion** (database: Website Leads) | Farhand workspace |
| Email | **Google Workspace** (MX: aspmx.l.google.com) | aaryan@farhand.live |

### Environment variables
| Var | Where set | Status | Purpose |
|---|---|---|---|
| `NOTION_API_KEY` | Vercel prod env | ✅ live | Notion integration "Farhand Website" |
| `NOTION_LEADS_DATABASE_ID` | Vercel prod env | ✅ live | `5cdd1ffc-ad60-4165-874d-3344d9bcced8` |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | Vercel prod env | ✅ live | `G-CMC24D7416` |
| `VISIT_SECRET` | Vercel prod env | ✅ live | Protects `/api/visit` from spoofing |
| `VERCEL_TOKEN` | GitHub secret | ✅ live | CI deployment auth |
| `VERCEL_ORG_ID` | GitHub variable | ✅ live | `team_Nsre7Gv1KjFULi4ZdSCU74NK` |
| `VERCEL_PROJECT_ID` | GitHub variable | ✅ live | `prj_i0NZ0EsQBkMfmTwQXaNE9rTdzKSF` |
| `CLOUDFLARE_API_TOKEN` | `.env.local` only | ✅ local | DNS management (Edit zone DNS for farhand.ai) |
| `CLOUDFLARE_ZONE_ID` | `.env.local` only | ✅ local | `0eefd328ad52b700eae1ae4673b75c00` |
| `TELEGRAPH_ACCESS_TOKEN` | `scripts/.env.syndication` | ✅ local | Content syndication to telegra.ph |
| `APOLLO_API_KEY` | NOT SET | ⬜ | Apollo enrichment for leads |
| `IPINFO_TOKEN` | NOT SET | ⬜ | Reverse IP → company lookup |
| `NEXT_PUBLIC_LINKEDIN_PARTNER_ID` | NOT SET | ⬜ | LinkedIn Insight Tag |
| `NEXT_PUBLIC_META_PIXEL_ID` | NOT SET | ⬜ | Meta (Facebook) Pixel |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | NOT SET (using HTML file instead) | ⬜ | GSC meta tag verification |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | NOT SET (imported via GSC) | ⬜ | Bing meta tag verification |
| `DEVTO_API_KEY` | NOT SET | ⬜ | Dev.to syndication |
| `HASHNODE_TOKEN` | NOT SET | ⬜ | Hashnode syndication |
| `HASHNODE_PUBLICATION_ID` | NOT SET | ⬜ | Hashnode publication |

### Scheduled Claude agents (Max plan)
Managed at: https://claude.ai/code/scheduled

| Name | Cron (UTC) | Local time | What it does |
|---|---|---|---|
| Weekly Blog Post | `0 16 * * 1` | Mon 9am PT | Picks uncovered topic from 15-item pool, writes 1200-1800 word post, commits + pushes |
| Monthly Page Expansion | `0 17 1 * *` | 1st of month 10am PT | Adds 10 new cities to `src/data/cities.ts` (+70 programmatic pages), commits + pushes |
| Weekly Competitor + Keyword Scan | `0 17 * * 4` | Thu 10am PT | Checks Roboworx/Reliance/Formic/Path/Rapid blogs, identifies keyword gaps, writes findings to Notion (Outbound Engine page) — agent lives in `farhand-gtm` |

### GitHub Actions workflows
| Workflow | Trigger | What it does |
|---|---|---|
| `deploy.yml` | push to main | `vercel build --prod` + `vercel deploy --prebuilt --prod --archive=tgz` |
| `indexnow.yml` | after deploy + weekly Monday 09:00 UTC | Fetches sitemap, POSTs all URLs to IndexNow API (Bing + Yandex) |
| `lighthouse.yml` | weekly Monday 14:00 UTC | Runs Lighthouse CI on 5 key URLs, files GitHub issue if perf regresses |

---

## SEO features

### Schema.org markup
| Schema type | Where emitted | File |
|---|---|---|
| Organization | Every page (layout.tsx) | `src/app/layout.tsx` |
| Article | Every blog post | `src/components/ArticleSchema.tsx` + `src/lib/schema.ts` |
| Service | Every `/services/[machine]/[city]` page | `src/lib/schema.ts` (`productSchema`) |
| BreadcrumbList | Every `/services/[machine]/[city]` page | `src/lib/schema.ts` (`breadcrumbSchema`) |
| FAQPage | `/faq` + FAQ sections on pages | `src/components/FAQSection.tsx` |

### Technical SEO
- **Canonical URLs**: set via `alternates.canonical` in metadata for programmatic pages
- **robots.txt**: `public/robots.txt` — Allow all, Disallow `/ui`, Sitemap pointer
- **Sitemap**: `src/app/sitemap.ts` — dynamic, all routes, monthly changefreq on programmatic pages
- **RSS feed**: `src/app/rss.xml/route.ts` — all blog posts, RFC 822 dates
- **IndexNow key**: `public/08cf9d26cc70338b32441f8e74e164bbf84dfbf494942ad58442cae769626a04.txt`
- **GSC verification**: `public/google21078288b340938c.html`

---

## Lead capture pipeline

### Flow 1: OEM form (active engagement)
```
Visitor scans QR → /oem → types company + name → POST /api/oem-lead
→ enrichViaApollo (if APOLLO_API_KEY) → storeInNotion → redirect to /
→ Row appears in Notion "Website Leads" with Source: qr-oem
```

### Flow 2: Reverse IP (passive identification)
```
Visitor loads any page → middleware.ts captures IP → cookie dedup (24h)
→ POST /api/visit (with VISIT_SECRET header)
→ lookupCompanyByIp via IPinfo (if IPINFO_TOKEN)
→ filter: only business/education/government (drop ISPs, hosting, bots)
→ findLeadByCompany in Notion (dedup: if exists, bump Visit Count)
→ enrichViaApollo → storeInNotion → Source: website
```
**Status**: code shipped, feature is no-op until `IPINFO_TOKEN` is set.

### Notion "Website Leads" database
Database ID: `5cdd1ffc-ad60-4165-874d-3344d9bcced8`
Location: Sales & Marketing → Website Leads

Properties: Company (title), Contact (text), Status (select: New/Contacted/Qualified/Won/Lost), Source (select: qr-oem/website/cold/referral), Domain (url), Industry (text), Employees (number), Revenue (dollar), HQ (text), LinkedIn (url), Description (text), Top Contacts (text), Notes (text), Visit Count (number), Last Visit (date), Captured (created_time)

---

## Content syndication

### Pipeline: `scripts/content-pipeline.ts`
Env file: `scripts/.env.syndication` (gitignored)

| Platform | Status | Key required |
|---|---|---|
| Telegraph (telegra.ph) | ✅ token set | `TELEGRAPH_ACCESS_TOKEN` |
| Dev.to | ⬜ needs key | `DEVTO_API_KEY` |
| Hashnode | ⬜ needs key + pub ID | `HASHNODE_TOKEN`, `HASHNODE_PUBLICATION_ID` |
| Medium | ❌ deprecated | API killed by Medium |
| Tumblr | ❌ abandoned | OAuth flow incomplete |

### Syndication state
- 5/22 posts previously syndicated (Dev.to + Hashnode + Telegraph) — from earlier session
- 17/22 posts NOT in pipeline tracker — `seed-existing` is hardcoded to 5 slugs
- To syndicate all: extend `seed-existing` to dynamically read `src/data/blogPosts.ts`, or write a new scanner

---

## Trackable marketing collateral (website-as-PDF replacement)

### UTM link pattern
```
https://farhand.ai/{page}?utm_source={source}&utm_medium={medium}&utm_campaign={campaign}&utm_content={prospect}
```

| Use case | Example URL |
|---|---|
| Cold email to FANUC | `farhand.ai/for/japanese-oems?utm_source=email&utm_medium=outreach&utm_campaign=q2-2026&utm_content=fanuc` |
| Expo QR handout | `farhand.ai/oem?utm_source=qr&utm_medium=expo&utm_campaign=modex-2026` |
| LinkedIn DM | `farhand.ai/pitch?utm_source=linkedin&utm_medium=dm&utm_campaign=q2-2026&utm_content=prospect-name` |
| Business card QR | `farhand.ai/connect?utm_source=qr&utm_medium=card` |
| Investor deck link | `farhand.ai/pitch?utm_source=email&utm_medium=fundraise&utm_campaign=preseed` |

GA4 captures all UTM parameters automatically. No code needed.

### QR codes
- `/oem` QR: `public/oem-qr.png` (1200px) + `public/oem-qr.svg`
- Generate new QR codes: `npx tsx scripts/generate-qr.ts` (add targets in `scripts/generate-qr.ts`)

---

## Backlink strategy

### Submission targets (free directories — manual signup, ~5 min each)

Work through these in order. Each is a single backlink from a high-authority
domain. **Log every backlink created in the table at the top of this doc.**

| Priority | Target | URL | Why | Status |
|---|---|---|---|---|
| 1 | Google Business Profile | business.google.com | Local SEO, map listing, knowledge panel eligibility | ⬜ |
| 2 | Bing Places for Business | bingplaces.com | Bing equivalent of GBP | ⬜ |
| 3 | Apple Business Connect | businessconnect.apple.com | Apple Maps + Siri results | ⬜ |
| 4 | LinkedIn Company Page | linkedin.com/company/farhand-robotics | Already exists; add website link | ✅ |
| 5 | Crunchbase | crunchbase.com | Discovery + investor signals | ⬜ |
| 6 | F6S | f6s.com | Startup directory + investor matching | ⬜ |
| 7 | Product Hunt | producthunt.com (launch Relay) | One-time launch traffic spike + permanent listing | ⬜ |
| 8 | BetaList | betalist.com | Early-stage discovery | ⬜ |
| 9 | StartupBase | startupbase.io | Startup directory | ⬜ |
| 10 | Capterra | capterra.com (B2B software directory) | Field service software category | ⬜ |
| 11 | G2 | g2.com | Software review platform | ⬜ |
| 12 | GetApp | getapp.com | B2B software directory | ⬜ |
| 13 | Software Advice | softwareadvice.com | Field service category | ⬜ |
| 14 | Robotics Business Review | roboticsbusinessreview.com (directory) | Robotics industry directory | ⬜ |
| 15 | Automate.org (A3) | automate.org/member-directory | Member directory after joining | ⬜ |
| 16 | ARM Institute member directory | arminstitute.org/members | Already a member; verify directory listing exists | ⬜ |
| 17 | IEEE RAS industry partners | ieee-ras.org | IEEE Robotics Society partner program | ⬜ |
| 18 | Y Combinator Launch | ycombinator.com/launches | If accepted | ⬜ |
| 19 | GitHub Sponsors / @farhand-live profile | github.com/farhand-live | Profile README with link | ⬜ |
| 20 | Built In | builtin.com (or Built In SF) | Tech-company employer brand directory | ⬜ |

### Press / earned-media targets

| Outlet | Beat | Pitch angle |
|---|---|---|
| Modern Machine Shop | Manufacturing | Reindustrialization / AI in field service |
| Automation.com | Industrial automation | Programmatic case studies + benchmarks |
| Field Service Digital | Field service | Founder thesis on AI-guided service |
| Assembly Magazine | Assembly | Cobot deployment + service model |
| Manufacturing.net | Manufacturing news | Contributor column on field service KPIs |
| The Robot Report | Robotics | AI + service partnership angles |
| Robotics 24/7 | Robotics ops | Coverage stories |
| IndustryWeek | Manufacturing leadership | C-suite ROI on outsourced service |
| Forbes Tech | General tech | Founder profile / category creation |
| TechCrunch | Startups | If/when funding announced |

### HARO / journalist queries

- **HARO / Featured** — ⬜ not signed up. Signup: https://www.featured.com/experts-signup/. Daily digest, respond to 1-2 queries. Expected yield: 5-15 backlinks in 3 months from industry pubs.
- **Qwoted** — ⬜ alternative to HARO. https://www.qwoted.com. B2B tech journalist focus.
- **HelpAReporter (legacy)** — discontinued; Featured replaces it.

### Guest-post opportunities

- Modern Machine Shop — pitch a reindustrialization angle.
- Automation.com — pitch case studies on AI-guided diagnostics.
- Field Service Digital — pitch our founder thesis.
- LinkedIn Newsletter — Aaryan's already publishing; cross-post selected blog content.

### Reciprocal-link strategy

- `/partners` page lists every active partnership. Each partner gets a
  request to feature Farhand in their member directory or blogroll.
- OEM partner mentions: once customer case studies exist, embed customer
  logos with permission and link to their case-study page on farhand.ai
  in exchange for a link from their newsroom.

### Content-driven backlinks (link bait)

- **`/services/{machine}/{city}` pages** — programmatic SEO target for
  long-tail "service in city" queries; natural targets for local business
  directories to link.
- **Field Service ROI Calculator** (`/blog/field-service-roi-calculator`) —
  high-utility content; tools like this get linked from peer blogs.
- **Industry KPIs reports** (e.g., `/blog/field-service-kpis-that-matter-2026`)
  — original benchmark data is highly link-worthy; double down with annual
  refreshes.

## Multi-domain & multi-website strategy

### Why multi-domain

Defensive (typo squatting, brand hijacking) + offensive (SEO breadth on the
specific keywords each domain implies). All alternates 301 to `farhand.ai`,
so authority consolidates.

### Domains to acquire (cheapest-first)

| Domain | Reason | Est. annual cost |
|---|---|---|
| `farhandrobotics.com` | Brand + keyword (robotics) | ~$15 |
| `farhand.io` | Tech-startup convention | ~$35 |
| `farhand.com` | Premium (likely taken / expensive) | $$$ |
| `farhand.us` | US-specific | ~$10 |
| `farhand.app` | If we ship a real app surface | ~$20 |
| `getfarhand.com`, `tryfarhand.com` | Sales/marketing variants | ~$15 each |
| `farhand.support`, `farhand.services` | Service-keyword variants | ~$30 each |

After registering, set DNS to point at Vercel (CNAME `cname.vercel-dns.com`),
add the domain in Vercel project settings, and uncomment the corresponding
entry in `ALTERNATE_HOSTS` in `next.config.ts`.

### Multi-website strategy (separate sites, NOT redirects)

The user has hinted at running multiple websites. The right place for that
is **vertical microsites** that build topical authority that links back to
farhand.ai. Examples:

- `farhand.support` — pure technical-help blog with deep service content,
  cross-linking back to farhand.ai for booking/lead capture.
- `industrialrobotservice.com` (etc.) — a category-leader brand presence
  that ranks for the broad query and funnels qualified traffic to
  farhand.ai. Run as a separate Vercel project to stay independently
  indexable.

Microsites should NOT 301 to farhand.ai (that defeats the point). They
should be independent sites with editorial content + canonical to
themselves + a sidebar/CTA pushing to farhand.ai. Build authority on
the microsite first, then start cross-linking.

---

## TODO (ordered by priority)

### Immediate (this week — manual user actions)
1. ⬜ **Claim Google Business Profile** at business.google.com — required for local pack + map results.
2. ⬜ **Add `farhand.ai` to Google Search Console** as a new property; verify via DNS or HTML file. File a change-of-address from `farhand.live`.
3. ⬜ **Bing Webmaster** — same property addition for `farhand.ai`.
4. ⬜ **Submit `farhand.ai` to HSTS preload** at https://hstspreload.org (headers are already correct).
5. ⬜ Sign up for **HARO/Featured** — https://www.featured.com/experts-signup/
6. ⬜ Activate **Search Atlas OTTO** — one-click toggle in SA dashboard
7. ⬜ Claim **Crunchbase**, **F6S**, **BetaList** profiles (links in Backlink strategy)

### This month
8. ⬜ Add **IPinfo.io token** ($49/mo) or sign up for RB2B free trial (reverse IP activation)
9. ⬜ Wire newsletter provider (Loops/Beehiiv) into `/api/newsletter`
10. ⬜ Register **alternate domains** (farhandrobotics.com, farhand.io, farhand.us, getfarhand.com, tryfarhand.com); add to Vercel; uncomment in `ALTERNATE_HOSTS` (`next.config.ts`)
11. ⬜ Apply for **A3 (Automate.org)** integrator listing; **IEEE RAS** partner program
12. ⬜ Pitch **3 guest-post outlets** from the Press table (Modern Machine Shop, Automation.com, Field Service Digital)
13. ⬜ Transfer domain registration from GoDaddy to Cloudflare Registrar ($11/yr vs $22/yr)
14. ⬜ Launch **Product Hunt** for Farhand Relay
15. ⬜ Stand up first **microsite** (recommended start: `farhand.support` for the technical-help blog) per the multi-website strategy

### Ongoing (automated)
11. ✅ Weekly blog post (Monday, Claude agent)
12. ✅ Monthly programmatic page expansion (1st of month, Claude agent)
13. ✅ Weekly competitor + keyword scan (Thursday, Claude agent)
14. ✅ Weekly Lighthouse check (Monday, GitHub Actions)
15. ✅ IndexNow ping on every deploy (GitHub Actions)
16. ✅ Auto-deploy on push (GitHub Actions → Vercel)

---

## File reference

### Key files to know
| File | Purpose |
|---|---|
| `src/app/layout.tsx` | Root layout: GA4, Vercel Analytics, Speed Insights, Schema.org Org, LinkedIn/Meta stubs |
| `src/app/sitemap.ts` | Dynamic sitemap (all routes) |
| `src/app/rss.xml/route.ts` | RSS feed |
| `src/data/blogPosts.ts` | Blog post registry (add new posts here) |
| `src/data/cities.ts` | 75 US cities for programmatic SEO |
| `src/data/machineTypes.ts` | 7 machine types with pain points, stats, FAQs |
| `src/data/faqs.ts` | Shared FAQ data (`coreFaqs`) |
| `src/lib/schema.ts` | JSON-LD builders (Article, Service, Breadcrumb) |
| `src/lib/notion.ts` | Shared Notion + Apollo functions (storeInNotion, enrichViaApollo, findLeadByCompany) |
| `src/lib/ip-lookup.ts` | IPinfo.io wrapper for reverse IP |
| `src/middleware.ts` | Visitor IP capture + `/api/visit` dispatch |
| `src/components/VerticalLanding.tsx` | Template for all stakeholder + service pages |
| `src/components/README.md` | AI-facing component guide for creating new pages |
| `scripts/content-pipeline.ts` | Content generation + syndication CLI |
| `scripts/generate-qr.ts` | QR code generator |
| `scripts/generate-weekly-blog.sh` | Local launchd blog generator (superseded by Claude cloud agent) |
| `scripts/.env.syndication` | Syndication API keys (gitignored) |
| `.env.local` | Local env vars (gitignored) |
| `.github/workflows/deploy.yml` | Auto-deploy workflow |
| `.github/workflows/indexnow.yml` | IndexNow ping workflow |
| `.github/workflows/lighthouse.yml` | Lighthouse regression workflow |
| `.github/lighthouse/lighthouserc.json` | Lighthouse assertion thresholds |
| `public/robots.txt` | Crawler directives |
| `public/google21078288b340938c.html` | GSC verification file |
| `public/oem-qr.png` | QR code for /oem |
| `SEO.md` | This file |
| `CLAUDE.md` | Agent instructions |

---

## Operational checklist

Before shipping any SEO change:

```bash
npx next build                       # must compile + build all routes
# Expect 570+ routes (22 blog + 525 programmatic + static pages)
```

After deploy, verify:

```bash
curl -sI https://farhand.ai/                              # 200
curl -sI https://farhand.ai/sitemap.xml                    # 200
curl -sI https://farhand.ai/rss.xml                        # 200
curl -sI https://farhand.ai/robots.txt                     # 200
curl -s  https://farhand.ai/ | grep "G-CMC24D7416"         # GA4 present
curl -s  https://farhand.ai/services/robots/new-york | grep '"@type":"Service"'  # schema present
```
