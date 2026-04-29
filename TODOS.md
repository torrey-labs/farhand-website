# Farhand Website TODOs

_Last updated: 2026-04-27._

Scope: this file tracks work on the Next.js site only. GTM automation
TODOs (scrapers, Notion CRM writers, outreach drafters, grant monitor,
daily cron) live in the `farhand-gtm` repo.

---

## Domain migration (Option A — full move off `farhand.live`)

`farhand.live` carries structural reputation penalties at major mail
receivers (mailop confirmed: 2015-batch gTLD, blanket scoring penalty
regardless of auth quality). Plan: full migration of website + email
to a new TLD; `farhand.live` becomes 301 redirect. Plan file:
`~/.claude/plans/use-browser-playwright-to-rustling-teapot.md`.

- [ ] **Pick the new domain** (top picks: `farhand.ai` ~$100/yr brand-fit, `farhandrobotics.com` ~$15/yr, `farhand.io` ~$35/yr)
- [ ] **Phase 1** — Register at Cloudflare Registrar (or Porkbun for `.ai`); replicate DNS zone (MX, SPF, DKIM google + resend, DMARC, TLS-RPT, send-subdomain)
- [ ] **Phase 2** — Add domain to Google Workspace, verify, set up send-as / users for aaryan + shivaan + neil + team
- [ ] **Phase 3** — Add domain to Vercel project, wait for SSL; grep+replace `farhand.live` across `next.config.ts`, `src/app/layout.tsx`, `src/app/sitemap.ts`, all `metadata.alternates.canonical`, `src/app/opengraph-image.tsx`, `src/app/twitter-image.tsx`, `src/lib/schema.ts`, `public/robots.txt`, and the sibling `farhand-signature` repo (HTML)
- [ ] **Phase 3** — Add Vercel redirect: `farhand.live/*` → 301 → new domain
- [ ] **Phase 4** — Reconnect Apollo mailboxes to new domain; update sequence default sender
- [ ] **Phase 4** — Stand up `outreach.<new-domain>` subdomain + dedicated mailbox for cold-only sends
- [ ] **Phase 5** — Update LinkedIn (company + cofounders), X bios, GitHub profiles, Notion (Outbound Engine, CRM, Clients DB), Cal.com, Google Search Console, Google Postmaster Tools, GA hostname filters
- [ ] **Phase 5** — Switch Google Workspace primary domain (last)
- [ ] **Phase 6** — Apollo warmup 2-4 weeks on new domain; cap cold sends 5/day → 10/day → 15/day → 20/day before scaling
- [ ] **Phase 7** — Day 30+: forward `@farhand.live` mail to new domain; let MX records lapse; keep DNS pointing 301 forever

---

## Email deliverability — immediate fixes (pre-migration)

Errors I introduced during the SPF cleanup that need correcting before
the domain migration kicks off.

- [ ] **Restore Resend bounce MX** at `send.farhand.live` → `feedback-smtp.us-east-1.amazonses.com` priority 10 (I deleted this thinking it was junk SES; it's actually Resend's Return-Path)
- [ ] **Add SPF at `send.farhand.live`**: `v=spf1 include:amazonses.com ~all`
- [ ] **Drop `include:resend.com`** from apex SPF (resend.com's own SPF only chains Google → redundant). Apex SPF should be `v=spf1 include:_spf.google.com ~all`
- [ ] Verify Resend integration — `src/app/api/newsletter` is currently stubbed; confirm whether Resend is actually used anywhere or kill the DKIM record entirely
- [ ] Add MTA-STS — host policy at `mta-sts.farhand.live/.well-known/mta-sts.txt` + TXT record at `_mta-sts.farhand.live` (low priority, helps reputation)

---

## Mailop / Charter outreach (pending sends)

- [ ] **Click confirmation link** for `aaryanragrawal@gmail.com` mailop subscription (in personal Gmail inbox, from `mailop-request@mailop.org`)
- [ ] **Send Marco reply** (warm-intros clarification draft already in Gmail)
- [ ] **Send mailop reply** (re: SPF correction + `.live` admission — copy-paste from latest chat draft)
- [ ] **Send Charter delisting request** to `abuse@charter.net` (draft saved in Gmail; `unblock@charter.net` is dead)
- [ ] **Report back to mailop in ~30 days** with what changed + numbers

---

## Outbound infrastructure (Apollo)

- [ ] **Build sequence templates in Apollo web UI** (Apollo API can't author email content — UI only). Suggested: "OEM cold intro" 3-step, "Robotics Lab outreach" 3-step, "FSE recruiter / staffing partner" 2-step
- [ ] **Set `max_emails_per_day` cap** on active sequences (~15/day per inbox, currently null = unlimited)
- [ ] **Archive dead sequences** in Apollo: Remote Teleop, Field Engineers, Ambassadors (0-1 sends each, stale `last_used_at`)
- [ ] **Run prospect lists through Hunter/NeverBounce** before any sequence enroll (Apollo's built-in verification toggle on)
- [ ] **Decide cofounder strategy**: shivaan@ + neil@ Apollo warmup status — park (replies-only) or migrate cold to new outreach subdomain
- [ ] **Hard-bounce → permanent suppression discipline** (any 5xx → never retry)
- [ ] **Weekly Postmaster Tools check** — keep spam complaint <0.10%, red line 0.30%
- [ ] **Add list-unsubscribe header + one-click unsubscribe** to every cold message (required by Google/Yahoo bulk-sender rules)

---

## Repo cleanup (root level is jumbled)

User flagged the root level needs tidying after the docs cleanup.
Pending audit + reorg.

- [ ] Audit root-level files; consolidate or relocate non-essential docs
- [ ] Move any one-off scripts out of root if any exist
- [ ] Confirm AGENTS.md, CLAUDE.md, GTM.md, SEO.md, TODOS.md, README.md are the only operational docs at root (signature docs moved to sibling `farhand-signature` repo)

---

## Website

### Backlinks
- [ ] Build out backlink strategy — people, cities, manifesto, robotics labs.
      Specifics TBD. Goal: improve domain reputation (CUJO flagged
      `farhand.live` 2026-04-21 as "suspicious" likely because the domain
      is new with no inbound links).
      **Log every backlink created in `SEO.md` → Backlinks created section.**

### Reputation & security signals
- [ ] `/.well-known/security.txt` (RFC 9116)
- [ ] Site-wide Organization JSON-LD (currently only on `/mission`)
- [ ] Per-page Open Graph images
- [ ] HSTS preload submission
- [ ] Confirm Google Search Console + Bing Webmaster verification are still active

### Content
- [ ] Add 10 blog articles (FANUC maintenance, downtime cost, predictive
      vs preventive, cobot maintenance, etc.) — full list in the retired
      parallel-tasks plan (git log of `79dc9ed`).

---

## GTM

_Placeholder — lives in `farhand-gtm` repo._

---

## SEO

_Placeholder — see `SEO.md` for current state and pending items._
