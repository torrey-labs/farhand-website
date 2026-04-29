# Farhand website

Next.js source for [farhand.live](https://farhand.live).

## Where things live

- **Repo rules** — `AGENTS.md` (this repo is the website only; GTM lives in sibling `farhand-gtm`)
- **SEO + analytics state** — `SEO.md`
- **Open work** — `TODOS.md`
- **Email signatures** — sibling repo `torrey-labs/farhand-signature` (separate Vercel project for uptime independence)
- **Components** — `src/components/README.md`

## Local dev

```bash
npm install
npm run dev   # http://localhost:3000
```

## Deploy

Vercel project `farhand-team/farhand-website`. `main` auto-deploys to production.

```bash
npx vercel deploy --prod --scope farhand-team
```
