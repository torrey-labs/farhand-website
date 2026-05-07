# Farhand Website TODOs

_Last updated: 2026-05-05._

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
- [ ] Audit two `google-site-verification=` TXT records on `farhand.live` root — identify which is current (Workspace vs Search Console vs others) and remove the dead one.

### Content

- [ ] Add 10 blog articles (FANUC maintenance, downtime cost, predictive vs preventive, cobot maintenance, etc.) — full list in the retired parallel-tasks plan (git log of `79dc9ed`).

---

## SEO

_See `SEO.md` for current state and pending items._

---

## Email deliverability

_See `DELIVERABILITY.md` for the full record-by-record state. Operational summary below._

Shipped 2026-05-06:
- [x] `farhand.live` DMARC `rua` repointed from dead `dmarc_rua@onsecureserver.net` → `aaryan@farhand.ai`; added `ruf` + `fo=1`.
- [x] `farhand.live` TLS-RPT TXT added (`_smtp._tls.farhand.live`); deleted older duplicate that pointed at `aaryan@farhand.live`.
- [x] `farhand.live` MTA-STS shipped (`mta-sts.farhand.live`, mode=testing). New Vercel project `farhand-mta-sts` (source: `/Users/aaryan/Files/Farhand/farhand-mta-sts/`).
- [x] `farhand.live` CAA records (5): restrict cert issuance to Let's Encrypt + Google Trust Services + iodef report-to.
- [x] `farhand.live` DNSSEC enabled at Cloudflare (status `pending` until DS record added at registrar — see action item below).
- [x] CLAUDE.md rule #1 expanded to cover Cloudflare DNS for both domains.

Blocked on user action — DS record at GoDaddy registrar (one-time, ~2 min):
- [ ] **`farhand.live` DNSSEC DS record**: log in to GoDaddy → Domains → `farhand.live` → DNS → DNSSEC → Add DS record:
  - Key Tag: `2371`
  - Algorithm: `13` (ECDSAP256SHA256)
  - Digest Type: `2` (SHA-256)
  - Digest: `F86A4088B3679D2814360B47B8A1D8ACEBDDC9E6117E04F6A4B5CCB1D7F25CC2`
  - After this propagates, Cloudflare DNSSEC status flips from `pending` → `active`.

Blocked on dual-zone Cloudflare API token (current token only sees `.live`):
- [ ] `farhand.ai` SPF: `v=spf1 include:_spf.google.com ~all` → add `include:resend.com`.
- [ ] `farhand.ai` Resend domain verification (DKIM `resend._domainkey` + return-path `send.farhand.ai` MX/TXT). Requires Resend dashboard access too.
- [ ] `farhand.ai` TLS-RPT TXT (`_smtp._tls.farhand.ai`).
- [ ] `farhand.ai` MTA-STS (add `mta-sts.farhand.ai` to existing `farhand-mta-sts` Vercel project).
- [ ] `farhand.ai` CAA records (same set as `.live`).
- [ ] `farhand.ai` DNSSEC enable (Cloudflare-side; DS record at Cloudflare registrar will need to be added since `.ai` is registered with Cloudflare).

Deferred follow-ups:
- [ ] **+7 days from MTA-STS ship**: bump `farhand.live` policy `mode: testing` → `mode: enforce` (rotate `id` in `_mta-sts` TXT). Edit `farhand-mta-sts/.well-known/mta-sts.txt`, redeploy, update DNS TXT.
- [ ] **+7 days from `.ai` auth stack live**: step `.ai` DMARC `p=none` → `p=quarantine`.
- [ ] **+14 days from quarantine**: consider `p=reject` on both.
- [ ] **+30 days**: re-run reputation scoring; expect lift now that auth + age are improving.

---

## Investor portal

Plan: `~/.claude/plans/go-through-papermark-or-wiggly-lovelace.md`.

**Live as of 2026-05-05:** `https://investors.farhand.live` → 307 → Papermark hosted free tier (email-gated, page-by-page analytics). Currently fronts a placeholder PDF (`/Users/aaryan/Desktop/Farhand.pdf`).

What shipped:
- Papermark account on free tier, signed in as `aaryanragrawal@gmail.com`. Dashboard: https://app.papermark.com.
- Active share link: `https://www.papermark.com/view/cmorekta3000qky04k9yh4x82` (named "Investor Portal", email-required, view notifications on, no expiry).
- Cloudflare DNS record `investors.farhand.live A 76.76.21.21` (DNS-only, Vercel-managed TLS).
- Vercel project `farhand-investors` (Hobby/free) under `farhand-team`. Source repo lives locally at `/Users/aaryan/Files/Farhand/farhand-investors-redirect/` — single-file `vercel.json` with two `redirects` rules (root + catch-all) targeting the Papermark URL. Local git only, no GitHub remote.
- To swap the redirect target later: edit `destination` in `farhand-investors-redirect/vercel.json` and `vercel deploy --prod` from that dir.

Pickup work (the actual investor deck):
- [ ] Author the real investor deck. Replace the placeholder `Farhand.pdf` upload in the Papermark dashboard. Existing share-link URL stays valid as long as the doc ID doesn't change (Papermark allows replacing the file in place).
- [ ] Decide if we want per-investor share links (one named link per fund/firm) instead of one canonical link. Free tier supports up to 50 links; mint by hand in the dashboard.
- [ ] Optional: build a branded landing page at `investors.farhand.live` (replace the redirect with a tiny Vercel-hosted page that has a hero + tagline + CTA → Papermark link). The user previously approved a question-framing tagline draft: "Every home and business is getting a robot. Who installs it? Who fixes it?" / "Farhand. The diffusion layer for physical AI." Out of scope until deck is ready.

Out of scope (until plan revisited):
- API-driven management (auto-uploads, programmatic per-investor links, scheduled analytics digests). Free tier has no API. Upgrade path: Papermark Business (€59/mo) for API + custom domain on viewer URLs, or self-host (eight-service stack — see plan file).
- CRM sync (Notion/Apollo). Belongs in `farhand-gtm` if/when wanted.
- Cleanup of the archived `torrey-labs/farhand-papermark` GitHub repo from the earlier self-host attempt — `gh` token lacks `delete_repo` scope; purge from github.com UI when convenient.
