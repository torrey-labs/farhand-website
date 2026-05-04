# Homepage flow — working doc

> **STATUS: DRAFT — NOT LIVE.**
> The flyer-voice rewrite below is workshopped copy, not what's currently shipped. The live homepage at farhand.ai runs the original "challenges" framing (Hero "Your field service partner" + red-bordered Problem cards). Re-implementing this draft is queued behind the rest of the website work.

Living planning doc for the Farhand homepage. Edit in place. No code changes happen until a section here is marked **LOCKED**.

_Last updated: 2026-04-29. Live website is reverted to the pre-rewrite state. The flyer-voice rewrite below is **the design we're workshopping** — copy captured verbatim from the reverted commits so we can iterate on words before re-implementing._

---

## The message we're delivering

> US factories are deploying robots faster than they can service them. The old model — in-house FSEs, OEM service contracts, staffing firms — doesn't scale. Farhand is the new model: AI-guided technicians, on-demand, every US zip code, per-job pricing. We keep your machines running and we train the workforce that runs them.

Two parallel claims:
1. **Operational** — "we keep your machines up." (drives the visitor's near-term decision)
2. **Strategic** — "we're rebuilding US industrial service." (drives belief in us as a long-term partner; matters to investors, OEMs, plant managers thinking past this quarter)

Every section either reinforces the operational claim or the strategic claim. Sections that do neither get cut.

## Audience

Primary visitor: someone with a robot or industrial-machinery uptime problem they can't fix fast enough on their own.
- **OEM** — robot/equipment manufacturer whose customer is asking for service their team can't deliver. (Primary ICP, per the marketing flyer.)
- **Fleet operator** — runs robots across many sites, drowning in truck rolls.
- **Facilities / plant manager** — has a machine down, no in-house FSE on shift.

Secondary: investors, press, partner integrators, candidates. They tolerate B2B-marketing copy; the primary won't.

## Goal of the page

Book a call. Or — failing that — leave the visitor with enough to come back later (URL bookmarked, link forwarded internally).

---

## The argument arc

A homepage is a five-beat argument, not a list of features. Each beat earns the next.

| Beat | Job | The visitor's reaction we want |
|---|---|---|
| **1. Hook** | Plant the claim in 5 seconds | "Wait, that's exactly my problem." |
| **2. Tension** | Name the gap between what they have and what they need | "Yes, the way I do this today is broken." |
| **3. Resolution** | Show how Farhand closes that gap | "Oh — that's how this works." |
| **4. Proof** | Make the resolution credible | "These guys can actually do this." |
| **5. Action** | Make the next step obvious | "I'll book the call." |

---

## Section flow, mapped to the arc

```
1. Navigation
2. Hero            ← Beat 1 (Hook) — flyer headline + sub
3. FeaturedOn      ← keep (press strip — answers "are they legit?")
4. Tension         ← Beat 2 — flyer's "You are a robotics company…" quote block
5. Resolution      ← Beat 3 — one-sentence + 3 mechanism tiles + robot-type strip
6. Proof           ← Beat 4 — single block, 3 panels: Map+stat / Speed / Relay
7. HowItRuns       ← Beat 5 — 5-tile timeline
8. FinalCTA        ← Beat 6 — pre-footer block
9. FAQ             ← trim 8 → 5
10. Footer         ← keep
```

---

## Shipped copy (workshop these)

Below is the verbatim copy from the now-reverted commits. Edit freely — when we re-implement, we pull from this doc.

### Beat 1 — Hero

- **H1** (italic serif): _Your white-labelled service partner_
- **Sub**: We install & repair your robots on your client sites. So you can scale revenue and focus on R&D.
- **CTAs**: `Schedule a call` (primary, green) · `See how it works` (ghost) → `#proof`

### Beat 2 — Tension

Three large lines, no grid, no boxes. Bold leader + light tail on lines 1 and 2; italic green serif on the closer.

- **You are a robotics company,** not a service company.
- **Your customers need support** but you can't be everywhere.
- _Let us help._ (italic, accent-green, serif)

### Beat 3 — Resolution

- **One-sentence definition** (centered, large):
  > Farhand is your **white-labelled service partner**. On-site field service engineers, nationwide. Remote technical support. So you scale revenue and focus on R&D.

- **Robot-type strip** (one row, dot-separated, accent-green):
  > AMRs · AGVs · Cobots · Robotic Arms · ASRS

- **Three mechanism tiles** (equal weight, no numbering):
  - **The technicians** — Vetted, insured, in every US zip code.
  - **The AI (Relay)** — Learns your docs and SOPs. Guides each visit. Improves with every job.
  - **The economics** — Per job. No retainers. No minimums.

- **Link out** (small, light-gray):
  > Servicing every major robot brand and most industrial machinery. [See the full taxonomy →]

### Beat 4 — Proof

Single section, three vertically-stacked panels under `id="proof"`.

- **Panel 1 — Scale.** Big number `2,100+` (count-up animation) anchored to the existing US coverage map. Sub-line: _robot service engineers nationwide._
- **Panel 2 — Speed.** Big number `<48hr` (no graphic in v1). Sub-line: _average dispatch-to-site. Closest-hub dispatch. No regional waitlists._
- **Panel 3 — System.** Bordered card.
  - Header: _Farhand **Relay**™ — the AI guiding every visit._
  - Sub-line: _Reads your docs. Walks the tech through diagnostics. Learns from every debrief._
  - Three icon-bullets: **Learns** (your docs and architecture) · **Guides** (engineers during service) · **Improves** (your SOPs iteratively)

### Beat 5 — How a job runs

Section title: _How a job runs_. Five tiles in a row, each with an icon, a 01–05 numeral, a one-word title, and one sentence.

- **01 Call** — Tell us the machine, the site, the urgency.
- **02 Match** — Closest hub. Right brand certs. Real availability.
- **03 Dispatch** — FSE on-site within 48 hours. Often same-day in dense markets.
- **04 Resolve** — AI-guided diagnosis. Real-time remote backup.
- **05 Debrief** — Every fix improves the AI. Your next job is smoother.

Closing one-liner under the row:
> All at a per-job rate. **No retainers, no minimums.**

### Beat 6 — Final CTA

- **Headline** (italic serif, two lines):
  > Your robots are already deployed.
  > Get them serviced like it's 2027.

- **CTAs**: `Schedule a call` (primary) · `See coverage` (ghost) → `#proof`

- **Epigraph** (small, light-gray):
  > Built with ❤︎ by ex-roboticists.

### Beat 7 — FAQ (trimmed 8 → 5)

Drop on homepage (covered elsewhere in the flow): _What types of machines do you service?_ (Resolution covers it), _What areas do you cover?_ (Proof covers it), _How do I get started?_ (CTA covers it).

Keep:
1. How does AI-guided field service work?
2. How fast can you respond to an issue?
3. How is this different from a staffing agency or OEM service contract?
4. How do you price?
5. Is my documentation secure?

The full 12-question list stays on `/faq`.

---

## Things being dropped from the homepage (in the rewrite)

- Red-bordered "challenges" cards in `Problem.tsx` (currently live again post-revert).
- The earlier outcome-stat-box layout (`<48hr / 41,000+ / 0`).
- The 27-pill `SkillsCollage` (overdense). Full taxonomy moves to `/services`.
- The two-section Relay treatment (RelayIntro + RelayCards). Collapses into Proof Panel 3.
- The standalone "Designed by SF-based roboticists" tagline row. Job moves into the FinalCTA epigraph.

## Things being added (in the rewrite)

- One-paragraph **Tension** beat using the flyer's quote block.
- Single-block **Resolution** with the three mechanism tiles + robot-type strip.
- Compound **Proof block** with stat-paired-with-visual panels.
- **How a job runs** timeline.
- **Final CTA** block before the FAQ.

---

## Open decisions (workshop here)

1. **Hero H1** — _"Your white-labelled service partner"_ (matches flyer back tagline) vs. the original _"Your field service partner"_ (broader)?
2. **Hero primary CTA** — _"Schedule a call"_ (cleaner, what's used everywhere else) vs. the original _"Deploy smarter"_ (punchier, less direct)?
3. **Tension closer** — _"Let us help."_ in italic green serif. Strong enough as a closer, or want something more confident?
4. **Resolution definition** — too long? Currently four sentences. Could compress to two.
5. **Proof Panel 2 (Speed)** — graphic asset? Currently big-number-only. A small dispatch-timeline graphic or animated dot moving across the map could earn this panel its own visual weight.
6. **Proof Panel 3 (System)** — Relay screenshot or live demo? The current icon-bullet fallback is fine but a real screenshot would be much stronger.
7. **HowItRuns step copy** — single-sentence per step. Tight. Anything wrong or missable?
8. **Final CTA headline** — _"Get them serviced like it's 2027."_ Punchy but maybe gimmicky? Alternative: _"Get them serviced like the robots they are."_
9. **Pricing on homepage** — kept vague (_"per-job"_, _"no retainers, no minimums"_). Publish a number, or leave a `/pricing` page link to handle this?
10. **Customer logos** — the rewrite kept the press strip (ARM Institute + Field Service Next West). If we have permission to show 3–6 customer/partner logos that would replace press as the trust strip and would be a real upgrade.

---

## Once decisions are made

Mark each beat **LOCKED** in this doc. Then we re-ship beat by beat, smallest commit first. The previous shipped sequence (Beat 2 → 1 → 3 → 4 → 5 → 6 → 7) worked fine and can be re-used.
