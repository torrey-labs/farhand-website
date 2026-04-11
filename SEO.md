# Farhand SEO & Growth Strategy

## Current Stack
- **Search Atlas OTTO** — Dynamic optimization script already embedded in `layout.tsx`
  - UUID: `c3ddc202-592a-4afa-b651-4fdef43e7e20`
  - Loads from `dashboard.searchatlas.com/scripts/dynamic_optimization.js`

---

## Tools to Integrate

### 1. Search Atlas MCP Server (TOP PRIORITY)
- **Package:** `searchatlas-mcp-server` (npm)
- **What it does:** Exposes 16 tools via MCP — keyword research, site auditing, content optimization, backlink analysis, OTTO automation, rank tracking, Google Business Profile management, LLM visibility
- **Setup:** Add as MCP server in `.claude/settings.json`:
```json
{
  "mcpServers": {
    "searchatlas": {
      "command": "npx",
      "args": ["searchatlas-mcp-server"],
      "env": {
        "SEARCHATLAS_API_KEY": "<your-key>"
      }
    }
  }
}
```
- **Covers:** SEO, backlinks, GBP, OTTO programmatic access, content optimization, keyword research
- **Action:** Check Search Atlas dashboard for API key, install MCP server

### 2. Google Analytics CLI (GA4)
- **Package:** `google-analytics-cli` (npm)
- **What it does:** CLI for GA4 using Data API + Admin API, designed for AI agents
- **Setup:** Requires Google service account credentials
- **Pricing:** Free (uses Google's free API tier)
- **Action:** Set up GA4 property, create service account, install CLI

### 3. Reverse IP / Visitor Identification
- **Clearbit Reveal** (`clearbit` npm package) — identifies companies visiting your site from IP
  - Free tier: 50 reveals/month
  - Now part of HubSpot
- **Snitcher** — REST API, starts ~$39/month, cheaper alternative
- **Action:** Start with Clearbit free tier, add JS snippet to site

### 4. Blog & FAQ Content
- **No separate tool needed** — Claude Code generates content directly
- **Workflow:** Use Search Atlas MCP for keyword research → find "People Also Ask" queries → generate articles and FAQs → optimize with Search Atlas content scorer
- **Action:** Research keywords per vertical, create content calendar

### 5. Google Business Profile
- **Covered by Search Atlas MCP** — includes GBP management tools
- **Backup:** `@bdmarvin/mcp-server-gbp` (dedicated MCP server for GBP Performance API)
- **Action:** Claim/verify GBP listing for Farhand first

---

## Stakeholder & Machine Type Landing Pages

Create SEO-optimized landing pages for each vertical:

### By Machine Type
| Page | URL | Target Keywords |
|------|-----|-----------------|
| Robots | `/services/robots` | field service robots, robot maintenance, robot repair |
| Industrial Robots | `/services/industrial-robots` | industrial robot service, robotic arm maintenance |
| Industrial Machinery | `/services/industrial-machinery` | industrial machinery repair, machine maintenance |
| Instruments | `/services/instruments` | instrument calibration, precision instrument service |
| Equipment | `/services/equipment` | equipment maintenance, field equipment repair |
| Medical Equipment | `/services/medical-equipment` | medical device service, medical equipment maintenance |
| General Aviation | `/services/general-aviation` | aviation maintenance, aircraft equipment service |

### By Stakeholder
| Page | URL | Target Audience |
|------|-----|-----------------|
| OEMs | `/for/oems` | Machine manufacturers needing field service |
| Distributors | `/for/distributors` | Equipment distributors offering service |
| Fleet Operators | `/for/fleet-operators` | Companies running fleets of machines |
| Facilities | `/for/facilities` | Facilities with installed equipment |

### Page Template Structure
Each landing page should include:
1. Hero with vertical-specific headline
2. Pain points specific to that machine type
3. How Farhand Relay solves it
4. FAQs (researched via Search Atlas)
5. CTA to schedule a call
6. Schema.org structured data for SEO

---

## Content Strategy

### Blog Articles (Scale)
- Use Search Atlas keyword research to identify topics
- Target long-tail keywords per vertical
- Generate 3-5 articles per machine type
- Include FAQs in each article
- Internal link between related articles and landing pages

### FAQ Pages
- Research "People Also Ask" per vertical
- Create `/faq` main page + per-vertical FAQ sections
- Use FAQ schema markup for rich snippets

---

## Copy Sources
- **Notion** — "Approved Copy" folder for approved messaging
- **Roboworx** (roboworx.com) — Competitor, reference for service descriptions
- **Robo Reliance** — Competitor, reference for field service copy

---

## Technical SEO Checklist
- [ ] Install `searchatlas-mcp-server` and connect API
- [ ] Set up GA4 property + `google-analytics-cli`
- [ ] Claim Google Business Profile
- [ ] Add Clearbit Reveal snippet for visitor identification
- [ ] Add sitemap.xml generation to Next.js
- [ ] Add robots.txt
- [ ] Add Schema.org structured data (Organization, Service, FAQ)
- [ ] Add Open Graph and Twitter Card meta tags per page
- [ ] Create all stakeholder/machine type landing pages
- [ ] Generate initial blog content (3-5 articles)
- [ ] Set up FAQ pages with FAQ schema
- [ ] Internal linking strategy between pages
