#!/usr/bin/env npx tsx
/**
 * Farhand Content Pipeline
 *
 * Unified CLI for generating, managing, and syndicating content at scale.
 *
 * Commands:
 *   generate-keywords          Generate CSV of target keywords (machine types × cities)
 *   generate <keyword>         Generate one article via KoalaWriter
 *   generate-bulk <csv>        Generate articles from CSV file via KoalaWriter
 *   status <articleId>         Check KoalaWriter article generation status
 *   fetch <articleId>          Fetch completed article and save as page
 *   fetch-all                  Fetch all pending articles
 *   syndicate <slug>           Syndicate article to all platforms
 *   syndicate-all              Syndicate all articles
 *   list                       List all generated articles
 *   stats                      Show pipeline stats
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { resolve, join } from 'path';

const BASE_URL = 'https://farhand.live';
const ROOT = resolve(__dirname, '..');
const DATA_DIR = join(ROOT, 'scripts', '.content-data');
const PAGES_DIR = join(ROOT, 'src', 'app');

// ── Env ───────────────────────────────────────────────────────────────
interface Env {
  KOALA_API_KEY?: string;
  SEARCHATLAS_API_KEY?: string;
  DEVTO_API_KEY?: string;
  HASHNODE_TOKEN?: string;
  HASHNODE_PUBLICATION_ID?: string;
  MEDIUM_TOKEN?: string;
  TUMBLR_TOKEN?: string;
  TUMBLR_BLOG_NAME?: string;
}

function loadEnv(): Env {
  const envPath = resolve(__dirname, '.env.syndication');
  if (!existsSync(envPath)) {
    console.error('❌ Missing scripts/.env.syndication — copy from .env.syndication.example');
    process.exit(1);
  }
  const env: Record<string, string> = {};
  for (const line of readFileSync(envPath, 'utf-8').split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const [key, ...rest] = t.split('=');
    env[key.trim()] = rest.join('=').trim().replace(/^["']|["']$/g, '');
  }
  return env as Env;
}

// ── Data Store ────────────────────────────────────────────────────────
interface ArticleRecord {
  id: string;
  keyword: string;
  slug: string;
  status: 'queued' | 'processing' | 'finished' | 'failed' | 'syndicated';
  koalaId?: string;
  title?: string;
  html?: string;
  markdown?: string;
  createdAt: string;
  syndicatedTo?: string[];
  pageCreated?: boolean;
}

function getDb(): ArticleRecord[] {
  mkdirSync(DATA_DIR, { recursive: true });
  const dbPath = join(DATA_DIR, 'articles.json');
  if (!existsSync(dbPath)) return [];
  return JSON.parse(readFileSync(dbPath, 'utf-8'));
}

function saveDb(records: ArticleRecord[]) {
  mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(join(DATA_DIR, 'articles.json'), JSON.stringify(records, null, 2));
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// ── Keyword Generation ────────────────────────────────────────────────
const MACHINE_TYPES = [
  'robot field service',
  'industrial robot service',
  'industrial machinery repair',
  'precision instrument service',
  'equipment maintenance',
  'medical equipment service',
  'aviation equipment service',
];

const TOP_CITIES = [
  'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
  'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose',
  'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte',
  'Indianapolis', 'San Francisco', 'Seattle', 'Denver', 'Nashville',
  'Oklahoma City', 'El Paso', 'Washington DC', 'Boston', 'Las Vegas',
  'Portland', 'Memphis', 'Louisville', 'Baltimore', 'Milwaukee',
  'Albuquerque', 'Tucson', 'Fresno', 'Sacramento', 'Mesa',
  'Kansas City', 'Atlanta', 'Omaha', 'Raleigh', 'Miami',
  'Minneapolis', 'Tampa', 'New Orleans', 'Cleveland', 'Honolulu',
  'Pittsburgh', 'Cincinnati', 'St Louis', 'Orlando', 'Detroit',
  'Salt Lake City', 'Birmingham', 'Richmond', 'Boise', 'Des Moines',
  'Spokane', 'Charleston', 'Knoxville', 'Chattanooga', 'Lexington',
  'Tulsa', 'Akron', 'Dayton', 'Reno', 'Madison',
  'Huntsville', 'Little Rock', 'Savannah', 'Durham', 'Rochester',
  'Grand Rapids', 'Buffalo', 'Hartford', 'Providence', 'Wichita',
];

function generateKeywords() {
  const keywords: string[] = [];
  for (const machine of MACHINE_TYPES) {
    for (const city of TOP_CITIES) {
      keywords.push(`${machine} in ${city}`);
    }
  }

  // Also add non-location keywords
  const topical = [
    'AI guided field service for robots',
    'how to reduce field service costs',
    'robot maintenance best practices',
    'industrial robot preventive maintenance checklist',
    'field service automation ROI',
    'first time fix rate improvement',
    'field service skills gap solutions',
    'remote diagnostics for industrial equipment',
    'AI powered equipment maintenance',
    'on demand technician service',
    'field service management for OEMs',
    'robot repair vs replacement',
    'medical device field service compliance',
    'warehouse robot maintenance',
    'cobot maintenance guide',
    'industrial equipment downtime cost calculator',
    'field service technician training AI',
    'predictive maintenance vs preventive maintenance',
    'robot calibration service',
    'FANUC robot maintenance',
    'ABB robot service',
    'KUKA robot repair',
    'Universal Robots maintenance',
    'autonomous mobile robot service',
    'surgical robot maintenance',
  ];
  keywords.push(...topical);

  const csvPath = join(DATA_DIR, 'keywords.csv');
  mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(csvPath, 'keyword\n' + keywords.map(k => `"${k}"`).join('\n'));
  console.log(`✅ Generated ${keywords.length} keywords → ${csvPath}`);
  console.log(`   ${MACHINE_TYPES.length} machine types × ${TOP_CITIES.length} cities = ${MACHINE_TYPES.length * TOP_CITIES.length} location pages`);
  console.log(`   + ${topical.length} topical keywords`);
  return keywords;
}

// ── KoalaWriter ───────────────────────────────────────────────────────
async function koalaGenerate(keyword: string, apiKey: string): Promise<string> {
  const res = await fetch('https://koala.sh/api/articles/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      targetKeyword: keyword,
      articleType: 'blog_post',
      articleLength: 'medium',
      realTimeData: true,
      shouldCiteSources: true,
      includeFaq: true,
      includeKeyTakeaways: true,
      autoPolish: true,
      seoOptimizationLevel: 'ai_powered',
    }),
  });
  if (!res.ok) throw new Error(`Koala POST: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return data.articleId;
}

async function koalaStatus(articleId: string, apiKey: string): Promise<{
  status: string;
  progress: number;
  title?: string;
  html?: string;
}> {
  const res = await fetch(`https://koala.sh/api/articles/${articleId}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  if (!res.ok) throw new Error(`Koala GET: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return {
    status: data.status,
    progress: data.progress || 0,
    title: data.output?.title,
    html: data.output?.polishedHtml || data.output?.html,
  };
}

// ── Page Builder ──────────────────────────────────────────────────────
function htmlToMarkdown(html: string): string {
  // Basic HTML to text for syndication (keep HTML for Next.js pages)
  return html
    .replace(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi, '\n## $1\n')
    .replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')
    .replace(/<strong>(.*?)<\/strong>/gi, '**$1**')
    .replace(/<em>(.*?)<\/em>/gi, '*$1*')
    .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
    .replace(/<li>(.*?)<\/li>/gi, '- $1\n')
    .replace(/<[^>]+>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function createNextPage(record: ArticleRecord) {
  if (!record.html || !record.title) return;

  const slug = record.slug;
  const pageDir = join(PAGES_DIR, 'blog', slug);
  mkdirSync(pageDir, { recursive: true });

  const pageContent = `import BlogPost from '@/components/BlogPost';

export const metadata = {
  title: ${JSON.stringify(record.title)},
  description: ${JSON.stringify(record.keyword + ' — AI-guided field service by Farhand.')},
};

export default function Post() {
  return (
    <BlogPost
      title=${JSON.stringify(record.title)}
      date="${new Date(record.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}"
      category="Industry"
    >
      <div dangerouslySetInnerHTML={{ __html: ${JSON.stringify(record.html)} }} />
    </BlogPost>
  );
}
`;
  writeFileSync(join(pageDir, 'page.tsx'), pageContent);
  console.log(`  📄 Created page: /blog/${slug}`);
}

// ── Syndication ───────────────────────────────────────────────────────
async function syndicateToDevTo(title: string, markdown: string, canonical: string, tags: string[], apiKey: string): Promise<string> {
  const res = await fetch('https://dev.to/api/articles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'api-key': apiKey },
    body: JSON.stringify({
      article: { title, body_markdown: markdown, published: true, canonical_url: canonical, tags: tags.slice(0, 4) },
    }),
  });
  if (!res.ok) throw new Error(`Dev.to: ${res.status} ${await res.text()}`);
  return (await res.json()).url;
}

async function syndicateToHashnode(title: string, markdown: string, canonical: string, token: string, pubId: string): Promise<string> {
  const res = await fetch('https://gql.hashnode.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: token },
    body: JSON.stringify({
      query: `mutation($i:PublishPostInput!){publishPost(input:$i){post{url}}}`,
      variables: { i: { title, contentMarkdown: markdown, publicationId: pubId, originalArticleURL: canonical } },
    }),
  });
  if (!res.ok) throw new Error(`Hashnode: ${res.status}`);
  return (await res.json())?.data?.publishPost?.post?.url || 'published';
}

async function syndicateToMedium(title: string, markdown: string, canonical: string, token: string): Promise<string> {
  const me = await (await fetch('https://api.medium.com/v1/me', { headers: { Authorization: `Bearer ${token}` } })).json();
  const res = await fetch(`https://api.medium.com/v1/users/${me.data.id}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ title, contentFormat: 'markdown', content: markdown, canonicalUrl: canonical, publishStatus: 'draft' }),
  });
  if (!res.ok) throw new Error(`Medium: ${res.status}`);
  return (await res.json()).data.url;
}

async function syndicateToTumblr(title: string, markdown: string, canonical: string, env: Env): Promise<string> {
  const res = await fetch(`https://api.tumblr.com/v2/blog/${env.TUMBLR_BLOG_NAME}/post`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${env.TUMBLR_TOKEN}` },
    body: JSON.stringify({ type: 'text', state: 'published', title, body: markdown, format: 'markdown', source_url: canonical }),
  });
  if (!res.ok) throw new Error(`Tumblr: ${res.status}`);
  return `https://${env.TUMBLR_BLOG_NAME}.tumblr.com`;
}

async function syndicateArticle(record: ArticleRecord, env: Env) {
  if (!record.markdown && !record.html) {
    console.error(`  ❌ No content for ${record.slug}`);
    return;
  }
  const markdown = record.markdown || htmlToMarkdown(record.html!);
  const canonical = `${BASE_URL}/blog/${record.slug}`;
  const tags = ['fieldservice', 'ai', 'robotics', 'automation'];
  const title = record.title || record.keyword;
  const results: string[] = [];

  const platforms = [
    { name: 'Dev.to', fn: () => syndicateToDevTo(title, markdown, canonical, tags, env.DEVTO_API_KEY!), ok: !!env.DEVTO_API_KEY },
    { name: 'Hashnode', fn: () => syndicateToHashnode(title, markdown, canonical, env.HASHNODE_TOKEN!, env.HASHNODE_PUBLICATION_ID!), ok: !!env.HASHNODE_TOKEN },
    { name: 'Medium', fn: () => syndicateToMedium(title, markdown, canonical, env.MEDIUM_TOKEN!), ok: !!env.MEDIUM_TOKEN },
    { name: 'Tumblr', fn: () => syndicateToTumblr(title, markdown, canonical, env), ok: !!env.TUMBLR_TOKEN },
  ];

  for (const p of platforms) {
    if (!p.ok) { console.log(`  ⏭  ${p.name} — no key`); continue; }
    try {
      const url = await p.fn();
      console.log(`  ✅ ${p.name} → ${url}`);
      results.push(p.name);
    } catch (err: any) {
      console.error(`  ❌ ${p.name} — ${err.message}`);
    }
  }

  record.syndicatedTo = [...(record.syndicatedTo || []), ...results];
}

// ── CLI ───────────────────────────────────────────────────────────────
async function main() {
  const [cmd, ...args] = process.argv.slice(2);

  if (!cmd || cmd === 'help') {
    console.log(`
📡 Farhand Content Pipeline

  generate-keywords                Generate keyword CSV (${MACHINE_TYPES.length} types × ${TOP_CITIES.length} cities + topical)
  generate <keyword>               Generate one article via KoalaWriter
  generate-bulk [csv] [--limit N]  Generate from CSV (default: keywords.csv, limit: 10)
  status [articleId]               Check article status (or all pending)
  fetch [articleId]                Fetch completed article → Next.js page
  fetch-all                        Fetch all finished articles
  syndicate <slug>                 Syndicate one article to all platforms
  syndicate-all                    Syndicate all articles
  list                             List all articles and status
  stats                            Pipeline statistics
    `);
    return;
  }

  const env = loadEnv();

  switch (cmd) {
    case 'generate-keywords': {
      generateKeywords();
      break;
    }

    case 'generate': {
      const keyword = args.join(' ');
      if (!keyword) { console.error('Usage: generate <keyword>'); return; }
      if (!env.KOALA_API_KEY) { console.error('❌ KOALA_API_KEY not set'); return; }

      console.log(`🚀 Generating: "${keyword}"`);
      const koalaId = await koalaGenerate(keyword, env.KOALA_API_KEY);
      const db = getDb();
      db.push({
        id: koalaId,
        keyword,
        slug: slugify(keyword),
        status: 'queued',
        koalaId: koalaId,
        createdAt: new Date().toISOString(),
      });
      saveDb(db);
      console.log(`  ✅ Queued → ID: ${koalaId}`);
      break;
    }

    case 'generate-bulk': {
      if (!env.KOALA_API_KEY) { console.error('❌ KOALA_API_KEY not set'); return; }
      const csvFile = args.find(a => !a.startsWith('--')) || join(DATA_DIR, 'keywords.csv');
      const limitArg = args.indexOf('--limit');
      const limit = limitArg >= 0 ? parseInt(args[limitArg + 1]) : 10;

      if (!existsSync(csvFile)) {
        console.error(`❌ CSV not found: ${csvFile}. Run generate-keywords first.`);
        return;
      }

      const lines = readFileSync(csvFile, 'utf-8').split('\n').slice(1).filter(Boolean);
      const keywords = lines.map(l => l.replace(/^"|"$/g, '')).slice(0, limit);
      const db = getDb();
      const existing = new Set(db.map(r => r.keyword));

      console.log(`🚀 Generating ${keywords.length} articles (limit: ${limit})\n`);
      let queued = 0;
      for (const keyword of keywords) {
        if (existing.has(keyword)) {
          console.log(`  ⏭  "${keyword}" — already exists`);
          continue;
        }
        try {
          const koalaId = await koalaGenerate(keyword, env.KOALA_API_KEY);
          db.push({
            id: koalaId,
            keyword,
            slug: slugify(keyword),
            status: 'queued',
            koalaId: koalaId,
            createdAt: new Date().toISOString(),
          });
          queued++;
          console.log(`  ✅ [${queued}/${keywords.length}] "${keyword}" → ${koalaId}`);
          // Small delay to be polite to API
          await new Promise(r => setTimeout(r, 500));
        } catch (err: any) {
          console.error(`  ❌ "${keyword}" — ${err.message}`);
        }
      }
      saveDb(db);
      console.log(`\n📊 Queued ${queued} new articles`);
      break;
    }

    case 'status': {
      if (!env.KOALA_API_KEY) { console.error('❌ KOALA_API_KEY not set'); return; }
      const db = getDb();
      const targets = args[0]
        ? db.filter(r => r.koalaId === args[0] || r.slug === args[0])
        : db.filter(r => r.status === 'queued' || r.status === 'processing');

      if (!targets.length) { console.log('No pending articles.'); return; }

      for (const record of targets) {
        if (!record.koalaId) continue;
        try {
          const s = await koalaStatus(record.koalaId, env.KOALA_API_KEY);
          record.status = s.status as ArticleRecord['status'];
          if (s.title) record.title = s.title;
          if (s.html) record.html = s.html;
          const pct = Math.round(s.progress * 100);
          console.log(`  ${s.status === 'finished' ? '✅' : '⏳'} [${pct}%] ${record.keyword} → ${s.status}${s.title ? ` — "${s.title}"` : ''}`);
        } catch (err: any) {
          console.error(`  ❌ ${record.keyword} — ${err.message}`);
        }
      }
      saveDb(db);
      break;
    }

    case 'fetch':
    case 'fetch-all': {
      if (!env.KOALA_API_KEY) { console.error('❌ KOALA_API_KEY not set'); return; }
      const db = getDb();
      const targets = cmd === 'fetch-all'
        ? db.filter(r => r.status === 'finished' && !r.pageCreated)
        : db.filter(r => r.koalaId === args[0] || r.slug === args[0]);

      if (!targets.length) { console.log('No articles to fetch. Run "status" first.'); return; }

      for (const record of targets) {
        if (!record.html && record.koalaId) {
          const s = await koalaStatus(record.koalaId, env.KOALA_API_KEY);
          if (s.status === 'finished' && s.html) {
            record.status = 'finished';
            record.title = s.title;
            record.html = s.html;
            record.markdown = htmlToMarkdown(s.html);
          }
        }
        if (record.html) {
          createNextPage(record);
          record.pageCreated = true;
        }
      }
      saveDb(db);
      break;
    }

    case 'syndicate': {
      const slug = args[0];
      if (!slug) { console.error('Usage: syndicate <slug>'); return; }
      const db = getDb();
      const record = db.find(r => r.slug === slug);
      if (!record) { console.error(`Article not found: ${slug}`); return; }
      console.log(`📡 Syndicating: ${record.title || record.keyword}`);
      await syndicateArticle(record, env);
      saveDb(db);
      break;
    }

    case 'syndicate-all': {
      const db = getDb();
      const ready = db.filter(r => r.status === 'finished' && r.html && (!r.syndicatedTo || r.syndicatedTo.length === 0));
      if (!ready.length) { console.log('No articles ready to syndicate.'); return; }
      console.log(`📡 Syndicating ${ready.length} articles\n`);
      for (const record of ready) {
        console.log(`\n📄 ${record.title || record.keyword}`);
        await syndicateArticle(record, env);
        // Rate limit between articles
        await new Promise(r => setTimeout(r, 2000));
      }
      saveDb(db);
      break;
    }

    case 'list': {
      const db = getDb();
      if (!db.length) { console.log('No articles yet. Run generate-keywords first.'); return; }
      console.log(`\n📚 ${db.length} articles\n`);
      const groups = { queued: 0, processing: 0, finished: 0, failed: 0, syndicated: 0 };
      for (const r of db) {
        groups[r.status] = (groups[r.status] || 0) + 1;
        const syn = r.syndicatedTo?.length ? ` [→ ${r.syndicatedTo.join(', ')}]` : '';
        const page = r.pageCreated ? ' [page ✓]' : '';
        console.log(`  ${r.status === 'finished' ? '✅' : r.status === 'failed' ? '❌' : '⏳'} ${r.keyword}${page}${syn}`);
      }
      console.log(`\n📊 Queued: ${groups.queued} | Processing: ${groups.processing} | Finished: ${groups.finished} | Failed: ${groups.failed}`);
      break;
    }

    case 'stats': {
      const db = getDb();
      const pages = readdirSync(join(PAGES_DIR, 'blog'), { withFileTypes: true }).filter(d => d.isDirectory()).length;
      console.log(`
📊 Content Pipeline Stats
   Articles in DB:    ${db.length}
   Queued:            ${db.filter(r => r.status === 'queued').length}
   Processing:        ${db.filter(r => r.status === 'processing').length}
   Finished:          ${db.filter(r => r.status === 'finished').length}
   Failed:            ${db.filter(r => r.status === 'failed').length}
   Pages created:     ${db.filter(r => r.pageCreated).length}
   Syndicated:        ${db.filter(r => r.syndicatedTo?.length).length}
   Blog pages on disk: ${pages}
      `);
      break;
    }

    default:
      console.error(`Unknown command: ${cmd}. Run with "help" for usage.`);
  }
}

main().catch(console.error);
