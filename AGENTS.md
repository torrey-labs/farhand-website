<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:repo-purpose-rules -->
# Hard rules for this repo (2026-04-21)

1. **Repo is the Next.js website only.** Site source code + workflows that build and deploy it. GTM automation (scrapers, Notion CRM writers, outreach drafters, grant monitor, daily cron) lives in the sibling repo `farhand-gtm`. No long-form copy, grant narratives, answer banks, outreach templates, or mission statements belong here — that lives in Notion.

2. **Notion is the single source of truth per piece of info.** If the same fact (EIN, mission sentence, email template, entity address) appears in two places, that's a bug. The CRM page holds every pipeline table. The Outbound Engine page holds every operational narrative (mission, playbook, runbook, agent prompts, entity facts). The company wiki holds every product/team/traction detail.

3. **No contact or opportunity tables outside the CRM parent page.** Ever. New tables for contacts or ops must be added as children of the CRM page.

4. **Clients DB is the single source of truth for every org.** Prospects, customers, grant sponsors, staffing firms, partners — all one row in Clients. Other DBs (Grants, Job Postings) point at Clients via a relation.

## Final Notion shape

```
CRM page (33209acc-...-81a4)
├── Outbound Engine (page)                  all narrative: Vision/Mission/Playbook/Templates/Runbook/Entity Facts
├── Clients (DB)                            SOURCE OF TRUTH for every org
├── Investors · Advisors · Partnerships · Media   relationship tables
├── Website Leads (DB)                      form submissions from farhand.live/oem — written by this repo
├── Grants (DB)                             grant pipeline — written by farhand-gtm
└── Job Postings and Gig Postings (DB)      scraper + outreach pipeline — written by farhand-gtm
```

## Where things live

| If you need… | Read it from… |
|---|---|
| Mission copy, email templates, runbook, scheduled-agent prompts | Notion → Outbound Engine page |
| Entity facts (EIN, address, NAICS, AOR) | Outbound Engine → Entity Facts section |
| A specific grant's packet | Grants DB → that grant's row page body |
| Every org we're tracking | Clients DB |
| Named people at orgs | Clients DB → Notes (text, format `- Name (Title) · email · phone · LinkedIn`) |
| Deal stage + $ projection | Clients DB → Stage + Notes |
| Form submissions from the website | Website Leads DB (written by this repo's `/api/oem-lead`) |
| Scraped gigs, outreach drafts, grant monitoring, scraper engine notes | `farhand-gtm` repo |
| GTM vision, revenue channels, scheduled-agent architecture | `farhand-gtm/GTM.md` |
| Product / team / traction / market sizing | Company wiki (user-owned, outside repo) |
| Website source code, styles, Next.js config | This repo |

## What NOT to do

- Do not add GTM automation, scraping, or outreach drafting to this repo. All of that goes in `farhand-gtm`.
- Do not create `reports/*.md` or `docs/*.md` files to hold long-form narrative.
- Do not hardcode email templates, grant narratives, mission statements into website code. Templates live in Outbound Engine.
- Do not create a second org tracker. Every org goes in Clients.
- Do not reintroduce archived DBs (Companies / Contacts / Deals / Scraped / Outreach Opportunities). Archived 2026-04-21.

## Sync check (before shipping any code change that touches Notion)

When editing `src/api/**` or `src/lib/notion.ts`:
1. `grep -r "NOTION_DB_COMPANIES\|NOTION_DB_SCRAPED\|NOTION_DB_OUTREACH_OPPORTUNITIES\|NOTION_DB_CONTACTS\|NOTION_DB_DEALS" src/ .github/` → must return nothing.
2. Writes go to `NOTION_LEADS_DATABASE_ID` (Website Leads) only. CRM writes belong in `farhand-gtm`.

## Exceptions

- Short operational guides at repo root (`CLAUDE.md`, `AGENTS.md`, `README.md`, `GTM.md`, `SEO.md`, `TODOS.md`) — keep tight and operational. Don't let them grow into narrative dumps.
<!-- END:repo-purpose-rules -->
