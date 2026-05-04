# Farhand Website TODOs

_Last updated: 2026-05-04._

Scope: this file tracks work on the Next.js site only. GTM automation TODOs (scrapers, Notion CRM writers, outreach drafters, grant monitor, daily cron, Apollo, email deliverability, ISP outreach, domain-migration mailbox/Apollo phases) live in the `farhand-gtm` repo.

---

## Domain migration — website-side work

Full multi-phase migration plan (DNS, Workspace, Apollo, mailop) lives in `farhand-gtm/TODOS.md`. Website-side work that lives here:

- [x] **2026-05-04** — grep+replaced `farhand.live` → `farhand.ai` across 38 files (53 URL refs; 19 emails preserved). Canonical is now `farhand.ai`.
- [x] **2026-05-04** — `farhand.ai` already aliased on Vercel project (returns 200, SSL valid).
- [x] **2026-05-04** — Added Next.js host-based 301 redirect in `next.config.ts` (`farhand.live/*` → `https://farhand.ai/*`).
- [ ] Update Google Search Console: add `farhand.ai` as a property, verify, submit sitemap. Existing `farhand.live` GSC stays for change-of-address notification.
- [ ] Update GA4: confirm hostname filters accept `farhand.ai`.
- [ ] Submit `farhand.ai` to HSTS preload list (https://hstspreload.org) — headers are already correct.

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

- [x] **2026-05-04** — `/.well-known/security.txt` (RFC 9116) shipped.
- [x] Site-wide Organization JSON-LD already lives in `src/app/layout.tsx` and emits on every page (TODO was outdated).
- [x] **2026-05-04** — Per-blog-post Open Graph images shipped (23 posts, factory in `src/lib/blog-og.tsx`).
- [ ] HSTS preload submission (manual — submit `farhand.ai` at https://hstspreload.org).
- [ ] Confirm Google Search Console + Bing Webmaster verification are still active for `farhand.ai`. After domain migration, GSC needs the new property added + change-of-address from `farhand.live`.

### Content

- [ ] Add 10 blog articles (FANUC maintenance, downtime cost, predictive vs preventive, cobot maintenance, etc.) — full list in the retired parallel-tasks plan (git log of `79dc9ed`).

---

## SEO

_See `SEO.md` for current state and pending items._
