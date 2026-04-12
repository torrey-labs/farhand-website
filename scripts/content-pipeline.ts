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
  TELEGRAPH_ACCESS_TOKEN?: string;
  OPENAI_API_KEY?: string;
  UNSPLASH_ACCESS_KEY?: string;
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
  coverImage?: string;
  coverImageProvider?: 'openai' | 'unsplash';
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

// ── Image Generation ──────────────────────────────────────────────────
const PUBLIC_BLOG_DIR = join(ROOT, 'public', 'blog');

const DALLE_PROMPT_TEMPLATE =
  'Dark cinematic industrial photography, neon green accent (#1aff67), robotic {subject}, moody lighting, photorealistic, 16:9, no text, no people';

function buildDallePrompt(record: ArticleRecord): string {
  const subject = record.title || record.keyword;
  return DALLE_PROMPT_TEMPLATE.replace('{subject}', subject);
}

async function downloadImage(url: string, destPath: string): Promise<void> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  mkdirSync(PUBLIC_BLOG_DIR, { recursive: true });
  writeFileSync(destPath, buf);
}

async function generateDalleImage(record: ArticleRecord, apiKey: string): Promise<string> {
  // DALL-E 3 native sizes: 1024x1024, 1792x1024 (closest to 16:9), 1024x1792.
  // We request 1792x1024 which gets served as ~1.75:1; downstream consumers
  // can resize to 1200x630 if strict OG aspect matters.
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'dall-e-3',
      prompt: buildDallePrompt(record),
      n: 1,
      size: '1792x1024',
      quality: 'hd',
      style: 'natural',
    }),
  });
  if (!res.ok) throw new Error(`DALL-E: ${res.status} ${await res.text()}`);
  const data = await res.json();
  const url: string | undefined = data?.data?.[0]?.url;
  if (!url) throw new Error('DALL-E returned no URL');
  const dest = join(PUBLIC_BLOG_DIR, `${record.slug}.jpg`);
  await downloadImage(url, dest);
  return `/blog/${record.slug}.jpg`;
}

function unsplashQueryFor(record: ArticleRecord): string {
  const text = (record.title || record.keyword).toLowerCase();
  if (text.includes('cobot') || text.includes('universal robot')) return 'collaborative robot factory';
  if (text.includes('fanuc')) return 'industrial robot arm factory';
  if (text.includes('downtime')) return 'factory automation line';
  if (text.includes('predictive') || text.includes('preventive')) return 'industrial maintenance technician';
  if (text.includes('remote') || text.includes('diagnostic')) return 'engineer laptop factory';
  if (text.includes('oem')) return 'manufacturing engineer';
  if (text.includes('knowledge') || text.includes('training')) return 'industrial worker tablet';
  if (text.includes('truck') || text.includes('dispatch')) return 'service van technician';
  if (text.includes('trend') || text.includes('future')) return 'futuristic factory automation';
  if (text.includes('roi') || text.includes('cost')) return 'factory operations dashboard';
  return 'industrial robotics factory';
}

async function generateUnsplashImage(record: ArticleRecord, accessKey: string): Promise<string> {
  const query = unsplashQueryFor(record);
  const res = await fetch(
    `https://api.unsplash.com/photos/random?orientation=landscape&query=${encodeURIComponent(query)}`,
    { headers: { Authorization: `Client-ID ${accessKey}` } },
  );
  if (!res.ok) throw new Error(`Unsplash: ${res.status} ${await res.text()}`);
  const data = await res.json();
  const url: string | undefined = data?.urls?.raw
    ? `${data.urls.raw}&w=1200&h=630&fit=crop&fm=jpg&q=85`
    : data?.urls?.regular;
  if (!url) throw new Error('Unsplash returned no URL');
  const dest = join(PUBLIC_BLOG_DIR, `${record.slug}.jpg`);
  await downloadImage(url, dest);
  return `/blog/${record.slug}.jpg`;
}

async function generateCoverImage(record: ArticleRecord, env: Env): Promise<void> {
  if (record.coverImage && existsSync(join(ROOT, 'public', record.coverImage.replace(/^\//, '')))) {
    console.log(`  ⏭  ${record.slug} — cover image already exists`);
    return;
  }

  if (env.OPENAI_API_KEY) {
    console.log(`  🎨 DALL-E: ${record.slug}`);
    const rel = await generateDalleImage(record, env.OPENAI_API_KEY);
    record.coverImage = rel;
    record.coverImageProvider = 'openai';
    console.log(`    ✅ ${rel}`);
    return;
  }
  if (env.UNSPLASH_ACCESS_KEY) {
    console.log(`  🖼  Unsplash: ${record.slug}`);
    const rel = await generateUnsplashImage(record, env.UNSPLASH_ACCESS_KEY);
    record.coverImage = rel;
    record.coverImageProvider = 'unsplash';
    console.log(`    ✅ ${rel}`);
    return;
  }
  throw new Error('No image provider configured — set OPENAI_API_KEY or UNSPLASH_ACCESS_KEY');
}

function absoluteCoverUrl(record: ArticleRecord): string | undefined {
  return record.coverImage ? `${BASE_URL}${record.coverImage}` : undefined;
}

// ── Syndication ───────────────────────────────────────────────────────
async function syndicateToDevTo(title: string, markdown: string, canonical: string, tags: string[], apiKey: string, coverImage: string | undefined, retries = 2): Promise<string> {
  const res = await fetch('https://dev.to/api/articles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'api-key': apiKey },
    body: JSON.stringify({
      article: {
        title,
        body_markdown: markdown,
        published: true,
        canonical_url: canonical,
        tags: tags.slice(0, 4),
        ...(coverImage ? { main_image: coverImage } : {}),
      },
    }),
  });
  if (res.status === 429 && retries > 0) {
    const body = await res.text();
    const waitMatch = body.match(/try again in (\d+)/);
    const wait = waitMatch ? parseInt(waitMatch[1]) : 300;
    console.log(`    ⏸  Rate limited — waiting ${wait}s then retrying...`);
    await new Promise(r => setTimeout(r, (wait + 5) * 1000));
    return syndicateToDevTo(title, markdown, canonical, tags, apiKey, coverImage, retries - 1);
  }
  if (!res.ok) throw new Error(`Dev.to: ${res.status} ${await res.text()}`);
  return (await res.json()).url;
}

async function syndicateToHashnode(title: string, markdown: string, canonical: string, token: string, pubId: string, coverImage: string | undefined): Promise<string> {
  const res = await fetch('https://gql.hashnode.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: token },
    body: JSON.stringify({
      query: `mutation($i:PublishPostInput!){publishPost(input:$i){post{url}}}`,
      variables: {
        i: {
          title,
          contentMarkdown: markdown,
          publicationId: pubId,
          originalArticleURL: canonical,
          ...(coverImage ? { coverImageOptions: { coverImageURL: coverImage } } : {}),
        },
      },
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

async function syndicateToTelegraph(title: string, markdown: string, canonical: string, token: string, coverImage: string | undefined): Promise<string> {
  // Convert markdown to Telegraph node format
  const nodes = markdownToTelegraphNodes(markdown, canonical);
  if (coverImage) {
    nodes.unshift({ tag: 'figure', children: [{ tag: 'img', attrs: { src: coverImage } }] });
  }
  const body = new URLSearchParams();
  body.append('access_token', token);
  body.append('title', title);
  body.append('content', JSON.stringify(nodes));
  body.append('author_name', 'Farhand Robotics');
  body.append('author_url', 'https://farhand.live');
  body.append('return_content', 'false');

  const res = await fetch('https://api.telegra.ph/createPage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  if (!res.ok) throw new Error(`Telegraph: ${res.status}`);
  const data = await res.json();
  if (!data.ok) throw new Error(`Telegraph: ${data.error}`);
  return data.result.url;
}

function markdownToTelegraphNodes(markdown: string, canonical: string): any[] {
  const nodes: any[] = [];
  const lines = markdown.split('\n');
  let paragraph: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length > 0) {
      const text = paragraph.join(' ').trim();
      if (text) nodes.push({ tag: 'p', children: [parseInline(text)] });
      paragraph = [];
    }
  };

  const parseInline = (text: string): any => {
    // Simple: strip markdown formatting for Telegraph (it supports limited tags)
    return text.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1').replace(/\[(.*?)\]\(.*?\)/g, '$1');
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushParagraph();
      continue;
    }
    if (trimmed.startsWith('## ')) {
      flushParagraph();
      nodes.push({ tag: 'h3', children: [trimmed.slice(3)] });
    } else if (trimmed.startsWith('# ')) {
      flushParagraph();
      nodes.push({ tag: 'h3', children: [trimmed.slice(2)] });
    } else if (trimmed.startsWith('---')) {
      flushParagraph();
    } else {
      paragraph.push(trimmed);
    }
  }
  flushParagraph();

  // Always append canonical link
  nodes.push({
    tag: 'p',
    children: ['Originally published at ', { tag: 'a', attrs: { href: canonical }, children: [canonical] }],
  });
  return nodes;
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
  const coverImage = absoluteCoverUrl(record);
  const results: string[] = [];

  const already = new Set(record.syndicatedTo || []);
  const platforms = [
    { name: 'Dev.to', fn: () => syndicateToDevTo(title, markdown, canonical, tags, env.DEVTO_API_KEY!, coverImage), ok: !!env.DEVTO_API_KEY },
    { name: 'Hashnode', fn: () => syndicateToHashnode(title, markdown, canonical, env.HASHNODE_TOKEN!, env.HASHNODE_PUBLICATION_ID!, coverImage), ok: !!env.HASHNODE_TOKEN && !!env.HASHNODE_PUBLICATION_ID },
    { name: 'Telegraph', fn: () => syndicateToTelegraph(title, markdown, canonical, env.TELEGRAPH_ACCESS_TOKEN!, coverImage), ok: !!env.TELEGRAPH_ACCESS_TOKEN },
    { name: 'Tumblr', fn: () => syndicateToTumblr(title, markdown, canonical, env), ok: !!env.TUMBLR_TOKEN && !!env.TUMBLR_BLOG_NAME },
  ];

  for (const p of platforms) {
    if (already.has(p.name)) { console.log(`  ⏭  ${p.name} — already published`); continue; }
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

  seed-existing                    Seed DB with 5 hand-written blog posts (ready to syndicate)
  generate-keywords                Generate keyword CSV (${MACHINE_TYPES.length} types × ${TOP_CITIES.length} cities + topical)
  generate <keyword>               Generate one article via KoalaWriter
  generate-bulk [csv] [--limit N]  Generate from CSV (default: keywords.csv, limit: 10)
  status [articleId]               Check article status (or all pending)
  fetch [articleId]                Fetch completed article → Next.js page
  fetch-all                        Fetch all finished articles
  generate-images <slug>           Generate cover image for one article (OpenAI → Unsplash fallback)
  generate-all-images              Generate cover images for all articles missing one
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

    case 'generate-images': {
      const slug = args[0];
      if (!slug) { console.error('Usage: generate-images <slug>'); return; }
      if (!env.OPENAI_API_KEY && !env.UNSPLASH_ACCESS_KEY) {
        console.error('❌ Set OPENAI_API_KEY or UNSPLASH_ACCESS_KEY');
        return;
      }
      const db = getDb();
      const record = db.find(r => r.slug === slug);
      if (!record) { console.error(`Article not found: ${slug}`); return; }
      try {
        await generateCoverImage(record, env);
        saveDb(db);
      } catch (err: any) {
        console.error(`  ❌ ${err.message}`);
      }
      break;
    }

    case 'generate-all-images': {
      if (!env.OPENAI_API_KEY && !env.UNSPLASH_ACCESS_KEY) {
        console.error('❌ Set OPENAI_API_KEY or UNSPLASH_ACCESS_KEY');
        return;
      }
      const db = getDb();
      const targets = db.filter(r => !r.coverImage);
      if (!targets.length) { console.log('All articles already have cover images.'); return; }
      console.log(`🎨 Generating ${targets.length} cover images\n`);
      for (let i = 0; i < targets.length; i++) {
        const record = targets[i];
        console.log(`[${i + 1}/${targets.length}] ${record.slug}`);
        try {
          await generateCoverImage(record, env);
          saveDb(db);
          // Be polite to OpenAI / Unsplash rate limits
          if (i < targets.length - 1) await new Promise(r => setTimeout(r, 1500));
        } catch (err: any) {
          console.error(`  ❌ ${err.message}`);
        }
      }
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
      const ready = db.filter(r => r.status === 'finished' && (r.markdown || r.html));
      if (!ready.length) { console.log('No articles ready to syndicate.'); return; }
      console.log(`📡 Syndicating ${ready.length} articles (with rate limit spacing)\n`);
      for (let i = 0; i < ready.length; i++) {
        const record = ready[i];
        console.log(`\n📄 [${i + 1}/${ready.length}] ${record.title || record.keyword}`);
        await syndicateArticle(record, env);
        saveDb(db); // save after each article
        if (i < ready.length - 1) {
          // Dev.to rate limits to ~2 posts per 5 min → wait 2.5 min between articles
          console.log(`    ⏱  Waiting 150s for rate limits...`);
          await new Promise(r => setTimeout(r, 150000));
        }
      }
      break;
    }

    case 'seed-existing': {
      // Seed the DB with the 5 hand-written blog posts so they can be syndicated
      const existing = [
        {
          slug: 'ai-guided-field-service-robots',
          title: 'AI-Guided Field Service for Robots: Why the Old Model is Broken',
          markdown: `There are **4.66 million robots** in operation worldwide. The market for robot preventive maintenance is **$8.2 billion** today and growing to **$22 billion by 2035**. Yet the way we service these machines hasn't fundamentally changed in decades.

## The numbers are damning

According to Aquant's 2025-2026 benchmarks, **1 in 7 onsite service visits is completely unnecessary**. A failed first visit adds 2 more visits and 14 extra days to resolution.

Siemens estimates **$1.4 trillion in unplanned downtime annually**.

## Why traditional field service fails robots

Robots are software-defined, highly configurable, and their failure modes combine mechanical, electrical, and software issues. The traditional model — travelling technicians, OEM contracts, in-house specialists — doesn't scale.

## AI changes the equation

AI-guided service means loading the **full manual into context** — SOPs, wiring diagrams, error codes, firmware changelogs, repair history. No chunking. No retrieval errors.

The results: **39% faster resolution**, **21% accuracy increase**, first-time fix rates jumping from 53% to 86%.

---

*[Farhand](https://farhand.live) provides AI-guided field service technicians for robots. [Learn more](https://farhand.live/services/robots).*`,
        },
        {
          slug: 'field-service-skills-gap',
          title: 'The Field Service Skills Gap Is Costing You Millions',
          markdown: `**Bottom-performing technicians cost 97% more than top performers.** Not 10% more. Not 20% more. Nearly double.

## The gap is real

Top teams achieve an **86% first-time fix rate**. Bottom teams: **53%**. That 33-point gap translates directly to cost — failed visits account for **44% of total service costs** for bottom performers.

## Why the gap exists

Knowledge lives in people's heads. Your senior tech with 15 years of experience knows every quirk of every machine — but that knowledge isn't written down and walks out the door when they retire.

## AI closes the gap permanently

When your documentation and tribal knowledge are loaded into an AI platform, every technician gets guidance from your best expert.

**Boosting your bottom 25% to average saves ~17% in service costs.** Scale that: **up to 26% savings**.

---

*[Farhand](https://farhand.live) combines AI with on-demand technicians. [Schedule a call](https://farhand.live/#schedule).*`,
        },
        {
          slug: 'remote-resolution-field-service',
          title: '1 in 3 Service Issues Can Be Resolved Without Sending Anyone',
          markdown: `**1 in 5 cases could be resolved remotely but still get a truck roll.**

## The cost of unnecessary truck rolls

Every truck roll costs hundreds of dollars. When **14% of onsite visits are completely unnecessary**, you're burning cash on logistics that add zero value.

## How AI enables remote resolution

The key is **accurate diagnosis without physical presence**. With AI-guided service, the diagnostic knowledge is always available.

**1 in 3 service queries can be resolved this way.** AI + phone = fixed.

## When you do need to send someone

When boots on the ground are needed, AI still helps. Remote triage has already identified the problem, root cause, and parts. First-time fix rates jump to **86%**.

---

*[Farhand](https://farhand.live) starts every service request with AI-guided remote triage.*`,
        },
        {
          slug: 'knowledge-preservation-field-service',
          title: "Your Senior Tech Is Retiring. Is Their Knowledge Retiring Too?",
          markdown: `Every field service organization has that one person. The senior tech who's been there 15 years. When they retire, **decades of institutional knowledge walk out the door**.

## The retention crisis

Top companies retain **87% of employees**. Underperformers: **66%**. **1 in 4 service leaders say improving frontline onboarding is their most urgent AI challenge**.

## Knowledge preservation isn't documentation

The most valuable knowledge is informal — workarounds, gotchas, tips that never make it into any manual. AI-guided service captures both formal and informal knowledge.

## New tech, veteran performance

When your entire service history and tribal knowledge is in an AI platform, **new tech performs like a 10-year veteran on day one**.

---

*[Farhand's Relay platform](https://farhand.live/#relay) captures knowledge automatically.*`,
        },
        {
          slug: 'first-time-fix-rate-ai',
          title: 'How AI Pushes First-Time Fix Rates from 53% to 86%',
          markdown: `Miss your first-time fix and you're looking at **2 more visits, 14 extra days, and a frustrated customer**.

## The 33-point gap

**Top teams: 86%. Bottom teams: 53%.** The difference is **knowledge access**, not tools.

## What AI actually does

**Before:** Analyzes symptoms against service history and failure patterns. **During:** Step-by-step instructions for this exact machine. **After:** Resolution captured, knowledge base grows.

**39% faster resolution. 21% accuracy improvement. 96% AI accuracy.**

## The ROI

Companies see **3x ROI in year one**, **20% fewer escalations**, **13% more work orders resolved without parts**.

---

*[Farhand](https://farhand.live) delivers this across [robots](https://farhand.live/services/robots), [industrial machinery](https://farhand.live/services/industrial-machinery), and [medical equipment](https://farhand.live/services/medical-equipment).*`,
        },
      ];

      const db = getDb();
      const existingSlugs = new Set(db.map(r => r.slug));
      let added = 0;
      for (const post of existing) {
        if (existingSlugs.has(post.slug)) {
          console.log(`  ⏭  ${post.slug} — already in DB`);
          continue;
        }
        db.push({
          id: `manual-${post.slug}`,
          keyword: post.title,
          slug: post.slug,
          status: 'finished',
          title: post.title,
          markdown: post.markdown,
          createdAt: new Date().toISOString(),
          pageCreated: true,
        });
        added++;
        console.log(`  ✅ Seeded: ${post.slug}`);
      }
      saveDb(db);
      console.log(`\n📊 Seeded ${added} existing articles — ready to syndicate`);
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
