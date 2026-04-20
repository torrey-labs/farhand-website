# Blog post copy template

Covers **all `/blog/<slug>` pages**. Every article is rendered through `src/components/BlogPost.tsx` with JSX body content inside.

Use this template to plan a new post's structure before writing.

---

## Source

- Shared layout: `src/components/BlogPost.tsx`
- Schema helper: `src/components/ArticleSchema.tsx` *(wraps each post with JSON-LD Article markup)*
- Example route: `src/app/blog/<slug>/page.tsx`
- Index route: `src/app/blog/page.tsx`

---

## Slots per post

### Metadata *(page file)*
- `title` — include a number or bracketed modifier when possible (e.g. `AI-Guided Field Service for Robots: Why the Old Model is Broken`). Max 60 chars for SEO.
- `description` — one-sentence summary leading with the hook stat or claim. Max 160 chars.

### `<ArticleSchema slug="..." />`
- Always included; slug must match the folder name.

### BlogPost props
- `title` — duplicate of the `<title>` but can read more naturally
- `date` — publish date as `Month D, YYYY`
- `category` — one word: `Industry`, `Guide`, `Benchmark`, `ROI`, `Playbook`

### Body structure *(JSX inside `<BlogPost>`)*

1. **Lede paragraph** — one bold stat + the problem framing. No more than 3 sentences.
2. **Three to five H2 sections.** Typical arc:
   - "The numbers are damning" / "The state of the art" — establish the problem with stats
   - "Why traditional X fails" — contrast what's broken
   - "How AI changes the equation" — the new model
   - "What this means for <audience>" — implications for buyer
   - "The Farhand approach" — always last; 2–3 sentences with 2–3 internal links
3. **Internal links** — at least three, typically to: `/` (home), `/relay`, `/for/<audience>` or `/services/<machine>`.
4. **Sources footnote** — small italicized line at the bottom listing primary sources.

### H2 styling
Inline style used across posts:
```tsx
<h2 style={{ fontSize: '28px', color: 'var(--foreground)', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 400 }}>
```
Keep this verbatim for consistency.

---

## Writing rules

- Lead with a number, not a claim.
- Bold load-bearing stats (`<strong>1 in 7</strong>`, `<strong>$8.2B</strong>`).
- Keep sentences short — fragments are fine.
- Use **Field Service Engineers** in prose; say `technicians` only in a direct quote or historical reference.
- Link internally at least 3x; externally only to authoritative sources (IFR, Aquant, Siemens, trade press).
- Cite sources at the bottom.

---

## Checklist before ship

- [ ] `metadata.title` + `metadata.description` set
- [ ] `<ArticleSchema slug="..." />` present and slug matches folder
- [ ] Date and category set on `<BlogPost>`
- [ ] 3+ internal links
- [ ] Sources footnote
- [ ] Slug added to `rss.xml` and (if applicable) sitemap if not auto-generated

---

## Critique notes *(2026-04-20 audit across 22 posts)*

### Strengths
- **BlogPost layout includes `<Navigation />`** — every post has the logo → home link baked in. No work needed to add back-links.
- **Closing paragraph pattern is consistent**: always ends with "The Farhand approach" + 2–3 internal links. Good for SEO and for reader intent.
- **Sources footnote** is consistent across posts — credibility win.

### Weaknesses
- **Inline styles for H2** (`style={{ fontSize: '28px', ... }}`) are copy-pasted in every post. Would be cleaner as a styled component or a class. Low priority — refactor when touching posts anyway.
- **Some posts use `techs`, `senior tech`, `junior tech`** as narrative shorthand. That's fine and reads naturally — do NOT sweep these to "Field Service Engineers." The word-boundary sweep explicitly left these alone.
- **Link density varies.** Some posts have 5+ internal links, some barely have 3. Aim for the higher end on new posts — SEO and cross-pollination both benefit.
- **No shared "Related reading" footer.** Each post closes with a sources line; a 3-link "Related reading" would help readers stay on-site after finishing an article.

### Things to skip in routine audits
- Individual post copy review across 22 articles is a big job. Only do deep edits when the post is underperforming in analytics OR when a factual number is stale.
- Do NOT rewrite posts to match homepage FAQ voice — blog posts are long-form and benefit from full sentences.
