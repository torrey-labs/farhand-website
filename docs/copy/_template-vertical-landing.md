# Vertical landing page copy template

Covers **all `/for/*` and `/services/*` pages** — they share one component (`src/components/VerticalLanding.tsx`) and take the same set of props. One copy pattern for every audience/machine vertical.

Use this file to audit or draft copy for any page of this type before wiring it into the route's `page.tsx`.

---

## Source

- Shared component: `src/components/VerticalLanding.tsx`
- Concrete routes (examples):
  - Audience: `src/app/for/oems/page.tsx`, `src/app/for/robotics-labs/page.tsx` *(custom layout, not this template)*, `src/app/for/fleet-operators/page.tsx`, `src/app/for/facilities/page.tsx`, `src/app/for/distributors/page.tsx`, `src/app/for/chinese-oems|european-oems|japanese-oems|taiwanese-oems/page.tsx`
  - Machine type: `src/app/services/robots/page.tsx`, `src/app/services/industrial-robots/page.tsx`, `src/app/services/medical-equipment/page.tsx`, `src/app/services/industrial-machinery/page.tsx`, `src/app/services/instruments/page.tsx`, `src/app/services/general-aviation/page.tsx`, `src/app/services/equipment/page.tsx`
  - Dynamic: `src/app/services/[machine]/[city]/page.tsx`

---

## Slots the component renders

Fill each slot per page. The component handles layout, animation, and the trailing CTA/footer.

### Metadata *(set on the page file, above the component)*
- `title` — max ~60 chars, format `<Vertical> | Farhand` (SEO)
- `description` — max ~160 chars, one-sentence value prop for the vertical

### Hero
- `machineType` — small eyebrow text over the headline (e.g. `For OEMs`, `Robots`, `Medical Equipment`)
- `headline` — one sentence, ideally under 10 words, specific to the audience's pain
- `subheadline` — one to two sentences; concrete outcome + "AI-guided Field Service Engineers in every zip code" hook

### Pain points *(3 items)*
- Each ≤ 14 words, each starts with a concrete failure mode or cost
- Use audience language, not Farhand language

### Stats *(3 items — `{ value, label }`)*
- `value` — short, numeric or near-numeric ("50%", "4.66M", "93%")
- `label` — ≤ 5 words describing what the number means
- Source the stat in the PR description when submitting new ones

### How it works *(4 items, each 1–2 sentences)*
- Step 1 — what the customer does (upload docs / share SOPs / onboard)
- Step 2 — what Farhand does (dispatch Field Service Engineers, activate Relay)
- Step 3 — feedback loop (what gets captured, how knowledge compounds)
- Step 4 — outcome (cost saved, uptime, revenue unlocked)

### FAQs *(3–5 items)*
- Audience-specific variants of the home FAQs — not duplicates
- Include the one objection every buyer in this vertical raises
- Keep answers short; no marketing prose

---

## Terminology rules *(applies site-wide)*

- Use **Field Service Engineers** (Title Case) in prose. Avoid `techs`, `technicians`, `Field Service Engineer` (singular) except when semantically needed.
- Product name: **Farhand Relay™** on first mention per page; `Relay` after.
- Accent color (green `#1aff67`) reserved for eyebrow/accent words, never full sentences.
- Never render the word **Farhand** in all caps.

---

## Out-of-scope for this template

- `/for/robotics-labs` uses a custom founder-letter layout, not `VerticalLanding`. It has its own copy flow in the file.
- `/relay` is the product page — see `_template-product-page.md`.

---

## Critique notes *(2026-04-20 audit)*

### Layout
- **Hero is 70vh + 24–40 pt.** Reads fine on desktop, a little tall on phones after scroll. `min-h-[70vh]` is a reasonable compromise.
- **Only one primary CTA** (hero `Get started` button → `#schedule` anchor → Footer Cal popup). A secondary, *in-flow* CTA between steps and FAQs would catch readers who scroll past the hero without taking action. Low priority.
- **Hero CTA does a two-click dance**: scroll to footer → click the cal button. Future fix: put `data-cal-link` directly on the hero button so one click opens the scheduler. Needs a verify that `getCalApi()` (called in `Footer`) has mounted by the time the hero button is clickable.

### Copy patterns
- **Pain points sometimes use `techs`** (e.g. `/for/oems` says "Your best tech can't be everywhere at once"). That's intentional — customer-language should stay casual. Don't sweep "tech" in pain points.
- **Stats repeat across verticals** (86% FTFR, 1 in 3 remote, 39% faster). Fine as industry benchmarks; cite source in PR descriptions when new ones land.
- **FAQ answers are ~40–60 words each** — denser than homepage FAQ fragments. Consider trimming to match homepage voice if we want one voice sitewide.
- **Most pages have `1.` `2.` `3.` `4.` in `howItWorks`** — rendered by `StepsList`. Sentences vary in length; aim for ~12–18 words each for visual rhythm.

### Things worth auditing next
- `/for/chinese-oems`, `/for/european-oems`, `/for/japanese-oems`, `/for/taiwanese-oems` are 4 near-identical country variants. Shared data file would make copy updates easier than editing four pages.
- `/services/[machine]/[city]` is a dynamic route — confirm the generated pages don't leak placeholder copy.
