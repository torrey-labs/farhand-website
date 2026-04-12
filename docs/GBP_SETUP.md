# Google Business Profile — Setup & Review Monitoring

Farhand's Google Business Profile (GBP) listing powers the map pack, knowledge-panel
presence, and review signals for every `/services/{machine}/{city}` programmatic page.
This guide walks through claiming the listing and wiring review monitoring through the
Search Atlas MCP integration already configured in Claude Code.

## Why GBP matters for us

- **Local pack rankings** for city-targeted queries like "robot field service Chicago"
- **Review surface** — stars in search results lift CTR 15-30%
- **Service area radius** — we can declare each metro as a service area without a
  physical storefront, matching our on-demand dispatch model
- **Knowledge panel** — direct-dial phone and "Contact" CTA for brand searches

## 1. Claim the listing

1. Sign in to [business.google.com](https://business.google.com) with `aaryan@farhand.live`.
2. Add business name: **Farhand**.
3. Business type: **Service area business** (no physical address shown to public).
4. Primary category: **Industrial equipment supplier** (no better "robot field service" option exists).
5. Secondary categories (add all that apply):
   - Equipment repair service
   - Mechanical contractor
   - Mechanical engineer
   - Robotics company
6. Service areas: add every metro we list in `src/data/cities.ts`. Google limits to 20 —
   pick the top 20 by population.
7. Contact phone: `+1-857-498-9778` (matches the Organization JSON-LD in `src/app/layout.tsx`).
8. Website: `https://farhand.live`.
9. Verification: request postcard to Aaryan's mailing address OR verify via video call
   (faster for service-area businesses).

## 2. Complete the profile

After verification, fill out:

- **Business description** (750 chars max):
  > Farhand provides AI-guided field service for industrial robots, manufacturing
  > equipment, medical devices, and precision instruments. On-demand technicians
  > dispatch across every major US metro, guided by AI trained on your documentation,
  > wiring diagrams, and repair history. First-time fix rates of 86%+ and 39% faster
  > resolution than traditional field service.
- **Services list**: match the seven services from `src/data/machineTypes.ts`
  (Robot Field Service, Industrial Machinery Repair, etc.). Each service should
  link to the corresponding `/services/{slug}` page.
- **Opening hours**: 24/7 (we offer emergency dispatch).
- **Photos**: upload `public/us-map.png`, `public/relay-platform.png`, and any
  on-site repair photos we have. Minimum 5 photos for decent profile strength.
- **Q&A**: seed with the top 5 FAQs from `src/data/faqs.ts`.

## 3. Review monitoring via Search Atlas MCP

Search Atlas is already wired into Claude Code as an MCP server. It exposes a
`reviews` surface that pulls GBP reviews on a schedule.

### Configure

Run from an interactive Claude session:

```text
Use the Search Atlas MCP to:
1. Connect the Farhand GBP profile (search for "Farhand" in their business picker)
2. Enable review polling on a daily cadence
3. Set up alerts for any review rated 3 stars or below
```

### Response workflow

When a new review lands:

1. Claude receives the alert via the MCP.
2. Claude drafts a response using `src/data/faqs.ts` as tone reference.
3. Aaryan reviews the draft before it posts — reviews are public, never auto-send.
4. For negative reviews, Claude pulls the ticket history from our internal system
   (once wired) and flags the root cause for a personal follow-up call.

## 4. Ongoing hygiene

- **Weekly**: check for new questions in the GBP Q&A tab; seed them with answers.
- **Monthly**: post a GBP update (new blog post, case study, product update).
  Posts roll off after 7 days, so consistency matters more than polish.
- **Quarterly**: audit service area list against our dispatched tickets. Add metros
  where we're taking work; remove metros we've stopped covering.

## References

- [GBP Help — Service area businesses](https://support.google.com/business/answer/9157481)
- [GBP review policies](https://support.google.com/business/answer/7400382)
- `src/data/cities.ts` — canonical metro list
- `src/data/machineTypes.ts` — canonical service list
- `src/app/layout.tsx` — Organization JSON-LD we need to keep in sync with GBP
