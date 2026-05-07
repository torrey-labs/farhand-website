<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:repo-purpose-rules -->
# Hard rules for this repo

1. **Repo is the Next.js website + the domains it lives on.** Site source code + workflows that build and deploy it, plus Cloudflare DNS for `farhand.ai` and `farhand.live` (records, deliverability auth — SPF/DKIM/DMARC/MTA-STS/TLS-RPT). GTM automation (Notion CRM writers, scrapers, outreach drafters, grant monitor, Apollo, scheduled agents, cofounder mailbox setup, Smartlead/email-warmup infra) lives in the sibling repo `farhand-gtm`. No long-form copy, grant narratives, answer banks, outreach templates, or mission statements belong here.

2. **Notion writes from this repo go to `NOTION_LEADS_DATABASE_ID` (Inbound Leads) only.** That's the inbound form-submission path from `/api/oem-lead`. CRM/Clients/Outbound writes belong in `farhand-gtm`. **Exception: operational webhooks** — small, user-triggered HTTP endpoints (e.g. `/ack/[briefId]` for technician brief acknowledgments) may write to other Notion DBs on demand. Adding new CRM-write endpoints requires explicit approval, not the default.

3. **Sync check before shipping** any change to `src/api/**` or `src/lib/notion.ts`:

   ```
   grep -r "NOTION_DB_COMPANIES\|NOTION_DB_SCRAPED\|NOTION_DB_OUTREACH_OPPORTUNITIES\|NOTION_DB_CONTACTS\|NOTION_DB_DEALS" src/ .github/
   ```

   Must return nothing — those env vars are retired.

4. **Don't add GTM automation to this repo.** No Apollo lookups, no Gmail draft creation, no outreach scrapers, no scheduled agents — all in `farhand-gtm`.

## Operational docs at root

`CLAUDE.md`, `README.md`, `SEO.md`, `TODOS.md`, `GTM.md` (stub pointing to the GTM repo). Per-page planning docs live under `wireframe/`. Keep root docs tight and operational. Don't grow them into narrative dumps.
<!-- END:repo-purpose-rules -->
