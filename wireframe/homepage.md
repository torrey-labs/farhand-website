# Homepage flow — working doc

Living planning doc for the Farhand homepage. Edit in place. No code changes happen until a section here is marked **LOCKED**.

_Last updated: 2026-04-29. All seven beats shipped — see commits 1ce2d2d…75f226d._

---

## The message we're delivering

> US factories are deploying robots faster than they can service them. The old model — in-house FSEs, OEM service contracts, staffing firms — doesn't scale. Farhand is the new model: AI-guided technicians, on-demand, every US zip code, per-job pricing. We keep your machines running and we train the workforce that runs them.

Two parallel claims:
1. **Operational** — "we keep your machines up." (drives the visitor's near-term decision)
2. **Strategic** — "we're rebuilding US industrial service." (drives belief in us as a long-term partner; matters to investors, OEMs, plant managers thinking past this quarter)

Every section either reinforces the operational claim or the strategic claim. Sections that do neither get cut.

## Audience

Primary visitor: someone with a robot or industrial-machinery uptime problem they can't fix fast enough on their own.
- **OEM** — robot/equipment manufacturer whose customer is asking for service their team can't deliver.
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

Beat 4 is where most B2B sites flame out — they list features instead of giving evidence. We have to be specific: numbers, coverage map, named customers, the AI demo.

---

## Section flow, mapped to the arc

The page is a single document. Sections aren't islands — each one hands off to the next.

| # | Beat | Section | Hands off with… |
|---|---|---|---|
| 1 | Hook | **Hero** — single sharp claim + CTA | "…and here's why it's the only model that scales:" |
| 2 | Tension | **The status quo is breaking** — one paragraph naming the three failure modes (travelling FSEs, OEM contracts, staffing firms) | "…and here's the alternative we built:" |
| 3 | Resolution | **What Farhand actually is** — one sentence ("AI-guided FSEs, on-demand, every US zip code") + 3-tile feature panel showing the mechanism | "…and here's how it shows up in practice:" |
| 4 | Proof | **Proof block** — interleaves four kinds of evidence: scale (`41,000+` zips + map), speed (`<48hr` over the map), pricing (`$0 retainers`), system (Relay does X, Y, Z with a screenshot or diagram) | "…here's how a job actually runs:" |
| 5 | Proof | **How a job runs** — 5-tile horizontal timeline: Call → Match → Dispatch → Resolve → Debrief | "…ready to see it for yourself?" |
| 6 | Action | **Final CTA block** — confident one-liner + two buttons (Schedule a call · See coverage) | — |
| 7 | (residual) | **FAQ** | objection cleanup, post-conviction |
| 8 | (residual) | **Footer** | secondary nav, contact |

Things this re-org changes vs. today:

- **The "challenges" framing comes back, but as one-paragraph tension** — not three red-bordered cards. It earns the resolution; it isn't a stat block of its own.
- **Outcome stats stop being a section.** They become evidence inside the Proof block, paired with the visual that makes them credible (stat over coverage map, stat next to pricing, stat next to timeline).
- **Skill pills go away from the homepage.** Move the full taxonomy to `/services`. Homepage answers "what we do" with one sentence + 3-4 mechanism tiles, not 27 pills.
- **Relay collapses into the Proof block** instead of being its own multi-section detour. One panel, one diagram or screenshot, three captions.
- **A real Final CTA block** appears before the FAQ, not after.

---

## Section drafts

### Beat 1 — Hero (rewrite)

Today: *"Your field service partner / Our AI-guided service engineers install & service your robots & machinery at your client sites."*

The current line is mechanism + about-us in one breath. The hero should be one sentence that lands the message and one sub-line that gives the visitor a stake. Direction options (pick one — TBD):

- **Outcome-led:** "Your machines stay up. Anywhere in the US. By tomorrow."
  *Sub:* "AI-guided field service engineers — per-job, no retainers."
- **Tension-led:** "When your robot stops, the clock starts. We stop it — anywhere in the US, by tomorrow."
  *Sub:* "On-demand FSEs, guided by AI that knows your machine."
- **Status-quo-vs-us-led:** "Stop flying engineers. Start dispatching them."
  *Sub:* "AI-guided FSEs in every US zip code. Per-job, no retainers, no contracts."

Two CTAs side by side: **Schedule a call** (primary) + **See how it works** (anchors to Beat 4 / Beat 5).

### Beat 2 — Tension (rewrite of "Problem") **LOCKED — shipped 2026-04-29**

Today: flyer's "You are a robotics company…" quote block. Three large lines, no grid, italic green "Let us help." closer. Implementation in `src/components/Problem.tsx`.

Direction: one paragraph (60–80 words) that names the three failure modes of today's industrial service. Below it, a single transitional line. No grid, no boxes.

Draft:
> Today you have three options. Travelling FSEs don't scale past one region. OEM service contracts cost more than the machine and still leave you waiting weeks. Staffing firms send anyone with a wrench. None of it was designed for the moment American factories are in — robots arriving faster than the people who can service them.

That paragraph earns the line that follows: *"So we built a fourth option."*

### Beat 3 — What Farhand actually is (consolidates current "what we do" + "Relay")

Today: pill collage (overdense) + RelayIntro + RelayCards (split across two sections, both abstract).

Direction: one block with three pieces, top to bottom:

1. One-sentence definition. *"Farhand is an AI-guided field-service network. We dispatch certified technicians anywhere in the US, guided in real time by an AI that knows your machine inside out."*
2. Three mechanism tiles, equal weight, no "1/2/3" numbering:
   - **The technicians** — "Vetted, insured, in every US zip code."
   - **The AI (Relay)** — "Learns your docs and SOPs. Guides each visit. Improves with every job."
   - **The price** — "Per job. No retainers. No minimums."
3. One-line link out: *"We service every major robot brand and most industrial machinery. See the full taxonomy →"*

(This kills the pill collage on the homepage. The taxonomy lives on `/services`.)

### Beat 4 — Proof (new structure, replaces today's stat boxes + coverage + Relay)

Today's mistake: stats live in their own row, the map lives in another row, Relay lives in two more rows. Each piece of evidence stands alone instead of compounding.

Direction: a single Proof block with three sub-panels, each pairing a stat with a visual.

- **Panel 1 — Scale.** Big number `41,000+` US zips, anchored to the coverage map. Sub-line: *"FSE coverage in every US zip code, day one."*
- **Panel 2 — Speed.** Big number `<48hr` average dispatch-to-site, anchored to a small timeline graphic or animated dot moving across the map. Sub-line: *"Closest-hub dispatch. No regional waitlists."*
- **Panel 3 — System.** A screenshot or diagram of Relay (the AI). Big label: *"The AI guiding every visit."* Sub-line: *"Reads your docs. Walks the tech through diagnostics. Learns from every debrief."*

(Pricing — `$0 retainers, $0 minimums, $0 contracts` — moves into Beat 5 to set up the Action.)

### Beat 5 — How a job runs (new)

Today: absent.

Direction: 5-tile horizontal strip with icons and 1-line captions. *Call → Match → Dispatch → Resolve → Debrief.* Final tile says: "And the AI learns from the debrief, so the next job is smoother." The strip ends with a one-line pricing pitch — *"All at a per-job rate. No retainers, no minimums."* — that hands off to the Final CTA.

### Beat 6 — Final CTA (new)

Today: absent. Page goes FAQ → footer with no closer.

Direction: pre-footer block, full-width, single confident sentence. Two buttons. Same gravitational weight as Roboworx's "Make Service Your New Strategic Weapon."

Draft:
> **Your robots are already deployed. Get them serviced like it's 2027.**
> *[ Schedule a call ]   [ See coverage map ]*

### FAQ + Footer

Trim FAQ from 8 to 5 — the most common pre-booking questions only. Everything else lives on `/faq`. Footer stays.

---

## Things being dropped from the homepage

- Red-bordered "challenges" cards (gone since 2026-04-28).
- White-bordered outcome stat boxes (move stats into Proof block).
- Skill pill collage (move full taxonomy to `/services`, leave one-sentence link from homepage).
- Standalone "Designed by SF roboticists" row (demote to footer epigraph).
- Two-section Relay treatment (collapse into Proof Panel 3).

## Things being added

- One-paragraph **tension** beat (replaces the absence-of-problem we created when we deleted the challenges cards).
- Single-block **Resolution** with the three mechanism tiles.
- Compound **Proof block** with stat-paired-with-visual panels.
- **How a job runs** timeline.
- **Final CTA** block before the FAQ.

---

## Open decisions

1. **Hero voice** — outcome-led, tension-led, or status-quo-vs-us-led? (See Beat 1.)
2. **Tension paragraph wording** — does the draft ring true, or is one of those three failure modes wrong/missing?
3. **Resolution one-sentence definition** — accept draft or rewrite?
4. **Proof block visuals** — do we have a Relay screenshot/diagram to use? If not, what placeholder?
5. **Pricing** — publish a per-job rate ($X) on the homepage, or stay vague ("per-job") and put numbers on a `/pricing` page?
6. **Customer logos** — any named customers we can show in a trust strip? If not, the press strip stays as-is.
7. **Final CTA copy** — the draft line is a hook; do we want something more measured?

---

## Once decisions are made

Mark each beat **LOCKED** in this doc. Then we ship beat by beat, smallest commit first. Beat 2 (Tension paragraph) is the cheapest first ship — it's all in `Problem.tsx`.
