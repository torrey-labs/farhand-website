# Parallel TODO Tasks for Farhand Website

These tasks can run in parallel with the shadcn/ui migration happening on `main`. Each task is scoped to files that won't conflict with component migration.

**Working directory for this branch:** `.worktrees/parallel-tasks` (already checked out on branch `parallel-tasks`)

**Before starting any task:** Pull latest from `main` and rebase to avoid conflicts.

---

## ⛔ DO NOT TOUCH (owned by shadcn migration on `main`)

- `src/components/Navigation.tsx`
- `src/components/Hero.tsx`
- `src/components/Problem.tsx`
- `src/components/Relay.tsx`
- `src/components/Footer.tsx`
- `src/components/FAQSection.tsx`
- `src/components/BlogPost.tsx`
- `src/components/VerticalLanding.tsx`
- `src/app/globals.css`
- `package.json` (watch for merge conflicts — coordinate deps carefully)

Everything else is fair game.

---

## ✅ Task 1: Programmatic SEO Pages — DONE
525 location × machine-type pages shipped via background agent.
Commits: `13f81e7`, `79dc9ed`, `ec5cfc3`

---

## 📝 Task 2: Write 10 More Blog Articles

**Goal:** Triple the blog content from 5 → 15 articles. Each targets a specific SEO keyword and internal-links to service/stakeholder pages.

### Topics

1. **How to Calculate Field Service ROI in 2026** — target: "field service ROI calculator"
2. **FANUC Robot Maintenance: A Complete Service Checklist** — target: "FANUC robot maintenance"
3. **The True Cost of Downtime for Industrial Robots** — target: "industrial robot downtime cost"
4. **Predictive Maintenance vs Preventive Maintenance: Which Wins?** — target: "predictive vs preventive maintenance"
5. **Remote Diagnostics: The $14B Opportunity in Field Service** — target: "remote diagnostics field service"
6. **Why OEMs Can't Scale Internal Service Teams** — target: "OEM field service scaling"
7. **Knowledge Management for Field Service Teams** — target: "field service knowledge management"
8. **How AI Reduces Truck Rolls by 40%** — target: "reduce truck rolls AI"
9. **The Future of Field Service: 2026 and Beyond** — target: "field service trends 2026"
10. **Cobot Maintenance Guide: Collaborative Robot Service Best Practices** — target: "cobot maintenance guide"

### Implementation
- Create `src/app/blog/{slug}/page.tsx` for each
- Import `BlogPost` from `@/components/BlogPost` (do not modify the component itself)
- Each article: 600-1000 words, 3-4 internal links to `/services/*` or `/for/*`
- Include real stats from IFR, Aquant, Siemens, Service Council (match tone of existing articles in `src/app/blog/ai-guided-field-service-robots/page.tsx`)
- Update `src/app/blog/page.tsx` `posts` array with the new entries
- Update `src/app/sitemap.ts` `blogPosts` array with the new slugs

### Commits
- One commit per article: `feat(blog): add "{title}" article`
- Final commit: `feat(blog): update index and sitemap with 10 new posts`

---

## 🖼️ Task 3: Image Generation Pipeline

**Goal:** Add automated cover image generation to the content pipeline so every syndicated post has a branded cover image.

### Files to modify
- `scripts/content-pipeline.ts` (add new commands)
- `scripts/.env.syndication.example` (document new env vars)

### Steps
1. Add new command: `generate-images <slug>` — creates cover image for one article
2. Add new command: `generate-all-images` — loops over all articles missing images
3. Support two providers:
   - **OpenAI DALL-E 3** via `OPENAI_API_KEY` env var (~$0.04/image, highest quality)
   - **Unsplash** via `UNSPLASH_ACCESS_KEY` env var (free stock photos)
4. Save images to `public/blog/{slug}.jpg` at **1200×630** (Open Graph dimensions)
5. Update article records in `scripts/.content-data/articles.json` with `coverImage` field
6. Update existing syndication publishers to include cover image:
   - Dev.to: `main_image` URL in the article payload (point to `https://farhand.live/blog/{slug}.jpg`)
   - Hashnode: `coverImageOptions.coverImageURL` in the publishPost mutation
   - Telegraph: Include image as first node in the content array
7. Add a brand-consistent prompt template for DALL-E:
   > "Dark cinematic industrial photography, neon green accent (#1aff67), robotic {subject}, moody lighting, photorealistic, 16:9, no text, no people"

### Commits
- `feat(pipeline): add DALL-E and Unsplash image providers`
- `feat(pipeline): include cover images in syndication publishers`

---

## 📡 Task 4: RSS Feed + Schema.org Article Markup

**Goal:** Add an RSS feed and enhance blog SEO with proper Article schema markup.

### Files to create/modify
- `src/app/rss.xml/route.ts` (NEW — dynamic RSS generation)
- `src/lib/schema.ts` (NEW — Schema.org helpers)
- `src/app/layout.tsx` (ADD `<link rel="alternate">` in head — careful not to conflict with existing script tags)

### Steps

1. Create `src/app/rss.xml/route.ts`:
   - Generate RSS 2.0 feed of all blog posts (hand-written + future programmatic)
   - Pull post data from a central source (create `src/data/blogPosts.ts` if needed)
   - Include full article excerpts, publishDate, author, categories
   - Set content-type: `application/rss+xml`

2. Create `src/lib/schema.ts` with helpers:
   - `articleSchema({ title, description, datePublished, url, imageUrl })` returning JSON-LD
   - `productSchema(...)` for services pages
   - `breadcrumbSchema(...)` for navigation paths

3. Import `articleSchema` in existing blog post pages (via BlogPost component — DO NOT modify BlogPost, instead add a prop). Since BlogPost is off-limits, create a new wrapper `BlogPostWithSchema.tsx` OR inline the schema in each blog post page.

4. Add RSS discovery link in `src/app/layout.tsx` head (avoid touching existing script tags):
   ```tsx
   <link rel="alternate" type="application/rss+xml" title="Farhand Blog" href="/rss.xml" />
   ```

### Commits
- `feat(seo): add Schema.org helpers library`
- `feat(seo): add RSS feed at /rss.xml`
- `feat(seo): add RSS discovery link to layout`

---

## 🔧 Optional Tasks (pick up if finishing early)

### Task 5: Article Schema on Programmatic Pages
Add Schema.org `Service` markup to the 525 programmatic pages. Touches `src/app/services/[machine]/[city]/page.tsx` — safe to edit, not owned by shadcn migration.

### Task 6: Google Business Profile Integration Docs
Create `docs/GBP_SETUP.md` with instructions for claiming Farhand's GBP listing and configuring review monitoring via the Search Atlas MCP.

### Task 7: Newsletter Signup Form
Create a `NewsletterSignup.tsx` component (NEW — not in the DO NOT TOUCH list) that POSTs to a placeholder endpoint. Plug into blog index footer and homepage. This WILL be styled by shadcn migration later, so use minimal inline styles for now.

### Task 8: Sitemap Image Extensions
Add `<image:image>` entries to `src/app/sitemap.ts` for the US map, hero video thumbnail, and any blog cover images once Task 3 is done.

---

## Merge Protocol

When tasks in this worktree are done:

```bash
# From main repo directory
cd /Users/aaryan/Files/Farhand/website
git fetch origin
git checkout main
git pull origin main  # get latest shadcn migration commits
git merge parallel-tasks  # merge this branch back
# Resolve conflicts if any (unlikely given the file ownership split)
git push origin main
```

If the shadcn migration window pushed conflicts, rebase `parallel-tasks` on main before merging:

```bash
# In the worktree
git fetch origin
git rebase origin/main
# Fix conflicts, then:
git push origin parallel-tasks --force-with-lease
```
