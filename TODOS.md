# Farhand Website TODOs

_Last updated: 2026-04-28._

Scope: this file tracks work on the Next.js site only. GTM automation TODOs (scrapers, Notion CRM writers, outreach drafters, grant monitor, daily cron, Apollo, email deliverability, ISP outreach, domain-migration mailbox/Apollo phases) live in the `farhand-gtm` repo.

---

## Domain migration — website-side work

Full multi-phase migration plan (DNS, Workspace, Apollo, mailop) lives in `farhand-gtm/TODOS.md`. Website-side work that lives here:

- [ ] Once new domain is picked: grep+replace `farhand.ai` across `next.config.ts`, `src/app/layout.tsx`, `src/app/sitemap.ts`, all `metadata.alternates.canonical`, `src/app/opengraph-image.tsx`, `src/app/twitter-image.tsx`, `src/lib/schema.ts`, `public/robots.txt`
- [ ] Add new domain to Vercel project + wait for SSL
- [ ] Add Vercel redirect: `farhand.ai/*` → 301 → new domain
- [ ] Update Google Search Console verification + GA hostname filters

---

## Repo cleanup

- [ ] Audit root-level files; consolidate or relocate non-essential docs
- [ ] Move any one-off scripts out of root if any exist
- [ ] Confirm CLAUDE.md, GTM.md, SEO.md, TODOS.md, README.md are the only operational docs at root (signature docs moved to sibling `farhand-signature` repo)

---

## Website

### Backlinks

- [ ] Build out backlink strategy — people, cities, manifesto, robotics labs. Specifics TBD. Goal: improve domain reputation. **Log every backlink created in `SEO.md` → Backlinks created section.**

### Reputation & security signals

- [ ] `/.well-known/security.txt` (RFC 9116)
- [ ] Site-wide Organization JSON-LD (currently only on `/mission`)
- [ ] Per-page Open Graph images
- [ ] HSTS preload submission
- [ ] Confirm Google Search Console + Bing Webmaster verification are still active

### Content

- [ ] Add 10 blog articles (FANUC maintenance, downtime cost, predictive vs preventive, cobot maintenance, etc.) — full list in the retired parallel-tasks plan (git log of `79dc9ed`).

---

## SEO

_See `SEO.md` for current state and pending items._
