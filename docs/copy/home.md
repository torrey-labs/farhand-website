# Home page copy

Source-of-truth for everything the homepage says. Sections are in scroll order. Edit this file to change copy; I'll wire it back into the components.

---

## Flow

`Navigation → Hero → Tagline → Featured On → Challenges → Relay → Coverage Map → FAQ → Footer`

---

## 1. Navigation
**Source:** `src/components/Navigation.tsx`

Farhand (logo) · **Schedule**

---

## 2. Hero
**Source:** `src/components/Hero.tsx`

- Headline (serif italic): `Your field service partner`
- Subhead: `Our AI-guided service engineers install & service your robots & machinery at your client sites.`
- CTA: `Deploy smarter`

---

## 3. Tagline
**Source:** inline in `src/app/page.tsx`

> Designed by SF-based roboticists
> For the robots of ~~tomorrow~~ **today**

---

## 4. Featured On
**Source:** `src/components/FeaturedOn.tsx`

- Label: `FEATURED ON`
- Logos:
  - ARM Institute
  - Field Service Next West (links to https://fieldserviceusa.wbresearch.com/, tooltip on hover)

---

## 5. Challenges
**Source:** `src/components/Problem.tsx`

Headline: `You've built a next-gen machine. Don't run it on last-gen ops.`

Cards:
1. Travelling or regional technicians don't scale
2. Outsourced service contracts are expensive and poor quality
3. Only your senior engineer knows some procedures

---

## 6. Relay
**Source:** `src/components/Relay.tsx`

**"There's a better model" block:**
- Eyebrow: `There's a better model`
- Headline: `On-demand experienced technicians and AI tools made for your processes`
- Sub: `Every zip code in the US`

**Farhand Relay™:**
- Sub: `Our AI platform that becomes your senior technician.`

**Three cards:**
1. **Learns** — your docs and architecture
2. **Guides** — technicians during service
3. **Improves** — your SOPs iteratively

---

## 7. Coverage Map
**Source:** `src/components/CoverageMap.tsx`

- Stat (count-up animation beside the map): `2,100+` · `Field techs across the US`
- Map: static US outline (no dots)

---

## 8. FAQ
**Source:** `src/components/FAQSection.tsx` + `src/data/faqs.ts`

Subtitle: `Everything you need to know about AI-guided field service.`

Questions: edit `src/data/faqs.ts`.

---

## 9. Footer
**Source:** `src/components/Footer.tsx`

**CTA:**
> You don't need a field service team.
> You need field service *done*.

**Contact:** `aaryan@farhand.live` · `(857) 498-9778`

**Email form:** captures email → POSTs to `/api/newsletter` (source: `footer`). Button: `Send me a call link`.

**Cal.com:** `aaryan-agrawal/30min` embed.

**Logo + LinkedIn · Terms & Privacy**
