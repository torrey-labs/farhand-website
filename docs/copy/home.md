# Home page copy

Source-of-truth for everything the homepage says. Sections are in scroll order. Edit this file to change copy; I'll wire it back into the components.

---

## Flow

`Navigation → Hero → Featured On → Challenges → "There's a better model" → Coverage Map → Farhand Relay → Tagline → FAQ → Footer`

---

## 1. Navigation
**Source:** `src/components/Navigation.tsx`

Farhand (logo) · **Schedule a call** *(accent green, anchors to `#schedule`)*

---

## 2. Hero
**Source:** `src/components/Hero.tsx`

- Headline (serif italic): `Your field service partner`
- Subhead: `Our AI-guided service engineers install & service your robots & machinery at your client sites.`
- CTA: `Deploy smarter` *(anchors to `#schedule`)*

---

## 3. Featured On
**Source:** `src/components/FeaturedOn.tsx` *(logos passed as props from `src/app/page.tsx`)*

- Label: `Featured on` *(rendered uppercase, tracked)*
- Logos:
  - **ARM Institute** — `/press/arm-institute.svg`, height 44
  - **Field Service Next West** — `/press/field-service-next-west.png`, height 44, links to https://fieldserviceusa.wbresearch.com/, tooltip on hover

---

## 4. Challenges
**Source:** `src/components/Problem.tsx`

Headline:
> You've built a next-gen machine.
> **Don't run it on last-gen ops.** *(second line in red `#ff3b3b`)*

Cards *(red outline, shuffle responsive)*:
1. Travelling or regional technicians don't scale
2. Outsourced service contracts are expensive and poor quality
3. Only your senior engineer knows some procedures

> **Note:** card #1 still says "technicians" — rest of the site uses "Field Service Engineers." Let me know if you want this flipped.

---

## 5. "There's a better model"
**Source:** `src/components/Relay.tsx` → `RelayIntro`

Inside the bordered pill:
- Eyebrow *(accent green)*: `There's a better model`
- Headline: `On-demand service engineers and AI tools made for your processes`
- Sub: `Every zip code in the US`

---

## 6. Coverage Map
**Source:** `src/components/CoverageMap.tsx`

- Stat *(count-up animation to 2,100+, accent green)*: `2,100+`
- Label: `Field Service Engineers across the US`
- Map: `/world-map.avif` (US outline with green coverage dots)

---

## 7. Farhand Relay
**Source:** `src/components/Relay.tsx` → `RelayCards`

- Section headline: `Farhand Relay™` *(with brand italic on "Relay")*
- Sub: `Our AI platform that becomes your senior engineer.`

Three cards:
1. **Learns** — your docs and architecture
2. **Guides** — engineers during service
3. **Improves** — your SOPs iteratively

---

## 8. Tagline
**Source:** inline in `src/app/page.tsx`

> Designed by SF-based roboticists
> For the robots of ~~tomorrow~~ **today** *(accent green)*

---

## 9. FAQ
**Source:** `src/components/FAQSection.tsx` + `src/data/faqs.ts`

Section title: `Frequently asked questions` *(default)*
Subtitle: `Everything you need to know about AI-guided field service.`

Questions *(edit Q + A here; I'll sync `src/data/faqs.ts`)*:

1. **Q:** How does AI-guided field service work?
   **A:** Every Field Service Engineer performs like your senior engineer. Knows your machine. Knows your process. Knows the history. Calls close faster. First-time-fix rates up.

2. **Q:** What types of machines do you service?
   **A:** Robots and Automation Systems. Industrial machinery. Medical equipment. Precision instruments. Consumer Equipment.
 
3. **Q:** What areas do you cover?
   **A:** Every US zip code. Technicians available within a short drive. Same service quality everywhere.

4. **Q:** How fast can you respond to an issue?
   **A:** Remote triage starts immediately. 1 in 3 issues resolved without anyone onsite. Same-day dispatch when needed.

5. **Q:** How is this different from a staffing agency or OEM service contract?
   **A:** Staffing sends bodies that you have to manage. OEMs are slow and expensive. We send Field Service Engineers who arrive knowing your machine. No long-term contracts.

6. **Q:** How do you price?
   **A:** You only pay for usage. Pay for our engineers’ time on your client sites. Insurance and travel comes with, on us.

7. **Q:** Is my documentation secure?
   **A:** Yes. Private and scoped to your equipment. Never shared. Full audit trails on every call.

8. **Q:** How do I get started?
   **A:** Book a call. We take two weeks to onboard our AI and show you how it works. Then you pay only for usage!

---

## 10. Footer
**Source:** `src/components/Footer.tsx`

**CTA heading:**
> You don't need a field service team.
> You need field service *done*. *(the word "done" is accent green italic)*

**Contact row:** `aaryan@farhand.live` · `(857) 498-9778`

**Email form** *(right of contact row)*:
- Label: `Email`
- Placeholder: `jules@example.com`
- Button (idle): `Let's talk`
- Button (loading): `Sending…`
- Button (success): `Check your inbox — link on the way.`
- Button (error): `Try again`
- Submits to `/api/newsletter` with `{ email, source: 'footer' }` → Resend auto-replies to the inquirer with a cal.com link and notifies `aaryan@farhand.live` *(requires `RESEND_API_KEY` env var)*.

**Cal.com embed:** `aaryan-agrawal/30min`, brand color `#1aff67`, dark theme.

**Bottom row:**
- Logo + tagline `Your field support partner`
- LinkedIn icon → https://www.linkedin.com/company/farhand-robotics/home
- `Terms & Privacy` link → `/terms`
