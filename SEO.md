# Farhand SEO & Marketing Dashboard

Living status doc. **Last updated: 2026-04-21.**

Single source of truth for all SEO, analytics, lead capture, content, and marketing infrastructure. Update this file alongside every code change that affects marketing or SEO.

## Backlinks created

_Running log. Every new inbound link to `farhand.live` lands here with date, source, target page, anchor text, and type. Keep chronological._

| Date | Source URL | Target page on farhand.live | Anchor text | Type | Notes |
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
| **Schema.org** | ✅ | Organization, Article, Service, Breadcrumb, FAQ |
| **Sitemap** | ✅ dynamic | `src/app/sitemap.ts`, 570+ URLs |
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
| **Scheduled competitor scan** | ✅ | Weekly Thursday 10am PT, writes report to `reports/` |
| **Apollo enrichment** | ⚠️ stubbed | Code ready, needs `APOLLO_API_KEY` env var |
| **IPinfo reverse IP** | ⚠️ stubbed | Code ready, needs `IPINFO_TOKEN` env var |
| **LinkedIn Insight Tag** | ⚠️ stubbed | Code ready, needs `NEXT_PUBLIC_LINKEDIN_PARTNER_ID` |
| **Meta Pixel** | ⚠️ stubbed | Code ready, needs `NEXT_PUBLIC_META_PIXEL_ID` |
| **Content syndication** | ⚠️ partial | Telegraph token set. Dev.to, Hashnode need keys. 5/22 posts syndicated. |
| **Newsletter provider** | ⬜ | API route is placeholder (`console.log`). Need Loops/Resend/Beehiiv. |
| **HARO / Featured signup** | ⬜ | Requires manual signup at featured.com. Highest-ROI backlink strategy. |
| **Google Business Profile** | ⬜ | Needs to be claimed at business.google.com. |
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
| `CLOUDFLARE_API_TOKEN` | `.env.local` only | ✅ local | DNS management (Edit zone DNS for farhand.live) |
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
| Weekly Competitor + Keyword Scan | `0 17 * * 4` | Thu 10am PT | Checks Roboworx/Reliance/Formic/Path/Rapid blogs, identifies keyword gaps, writes report to `reports/` |

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
https://farhand.live/{page}?utm_source={source}&utm_medium={medium}&utm_campaign={campaign}&utm_content={prospect}
```

| Use case | Example URL |
|---|---|
| Cold email to FANUC | `farhand.live/for/japanese-oems?utm_source=email&utm_medium=outreach&utm_campaign=q2-2026&utm_content=fanuc` |
| Expo QR handout | `farhand.live/oem?utm_source=qr&utm_medium=expo&utm_campaign=modex-2026` |
| LinkedIn DM | `farhand.live/pitch?utm_source=linkedin&utm_medium=dm&utm_campaign=q2-2026&utm_content=prospect-name` |
| Business card QR | `farhand.live/connect?utm_source=qr&utm_medium=card` |
| Investor deck link | `farhand.live/pitch?utm_source=email&utm_medium=fundraise&utm_campaign=preseed` |

GA4 captures all UTM parameters automatically. No code needed.

### QR codes
- `/oem` QR: `public/oem-qr.png` (1200px) + `public/oem-qr.svg`
- Generate new QR codes: `npx tsx scripts/generate-qr.ts` (add targets in `scripts/generate-qr.ts`)

---

## Backlink strategy

### Active
- **HARO / Featured** — ⬜ not signed up. Signup: https://www.featured.com/experts-signup/. Daily digest, respond to 1-2 queries. Expected yield: 5-15 backlinks in 3 months from industry pubs.
- **Qwoted** — ⬜ alternative to HARO. https://www.qwoted.com. B2B tech journalist focus.

### Opportunities (not started)
- Guest posts: Modern Machine Shop, Automation.com, Field Service Digital, Assembly Magazine
- OEM partner mentions (once customer case studies exist)
- Robotics Business Review directory listing
- Manufacturing.net contributor column

---

## TODO (ordered by priority)

### Immediate (this week)
1. ⬜ Sign up for HARO/Featured (manual — https://www.featured.com/experts-signup/)
2. ⬜ Activate Search Atlas OTTO (`is_active: false` → one-click toggle in SA dashboard)
3. ⬜ Add Apollo API key to Vercel env (enables lead enrichment)
4. ⬜ Add Dev.to API key to `scripts/.env.syndication` (30-second signup)
5. ⬜ Claim Google Business Profile at business.google.com

### This month
6. ⬜ Add IPinfo.io token ($49/mo) or sign up for RB2B free trial (reverse IP activation)
7. ⬜ Wire newsletter provider (Loops/Beehiiv) into `/api/newsletter`
8. ⬜ Generate OG cover images for all blog posts (needs OPENAI_API_KEY or UNSPLASH_ACCESS_KEY)
9. ⬜ Create static root OG image at `public/og-default.jpg` (1200×630 branded)
10. ⬜ Transfer domain registration from GoDaddy to Cloudflare Registrar ($11/yr vs $22/yr)

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
curl -sI https://farhand.live/                              # 200
curl -sI https://farhand.live/sitemap.xml                    # 200
curl -sI https://farhand.live/rss.xml                        # 200
curl -sI https://farhand.live/robots.txt                     # 200
curl -s  https://farhand.live/ | grep "G-CMC24D7416"         # GA4 present
curl -s  https://farhand.live/services/robots/new-york | grep '"@type":"Service"'  # schema present
```
