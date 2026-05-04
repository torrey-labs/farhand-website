const NOTION = 'https://api.notion.com/v1';
const HEADERS = () => ({
  Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
  'Notion-Version': '2022-06-28',
  'Content-Type': 'application/json',
});

async function notionGet(path: string): Promise<Record<string, unknown>> {
  const r = await fetch(`${NOTION}${path}`, { headers: HEADERS() });
  if (!r.ok) throw new Error(`Notion GET ${path} → ${r.status}: ${await r.text()}`);
  return r.json();
}

async function notionPost(path: string, body: unknown): Promise<Record<string, unknown>> {
  const r = await fetch(`${NOTION}${path}`, {
    method: 'POST',
    headers: HEADERS(),
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(`Notion POST ${path} → ${r.status}: ${await r.text()}`);
  return r.json();
}

interface NotionRichText {
  plain_text?: string;
}
interface NotionTitleProp {
  type: string;
  title?: NotionRichText[];
}
interface NotionPage {
  id: string;
  properties?: Record<string, NotionTitleProp>;
  parent?: { type: string; page_id?: string; database_id?: string };
}

function pageTitle(page: NotionPage): string {
  for (const p of Object.values(page.properties || {})) {
    if (p?.type === 'title') {
      return (p.title || []).map((t) => t.plain_text || '').join('') || '(untitled)';
    }
  }
  return '(untitled)';
}

/**
 * Walk parents of `briefId` upward until a page whose parent is a database.
 * Returns the client page ID and the trail of titles between client and brief
 * (excluding the client title itself, including the brief title at the end).
 */
export async function findClientForBrief(
  briefId: string,
): Promise<{ clientId: string; trailTitles: string[] }> {
  const trail: { id: string; title: string }[] = [];
  let id = briefId;
  for (let i = 0; i < 8; i++) {
    const page = (await notionGet(`/pages/${id}`)) as unknown as NotionPage;
    trail.unshift({ id, title: pageTitle(page) });
    const parent = page.parent;
    if (parent?.type === 'database_id') {
      return { clientId: id, trailTitles: trail.slice(1).map((t) => t.title) };
    }
    if (parent?.type !== 'page_id' || !parent.page_id) {
      throw new Error(`Brief ${briefId} not under a database — parent type: ${parent?.type}`);
    }
    id = parent.page_id;
  }
  throw new Error(`Brief ${briefId} parent chain too deep — bailing`);
}

interface NotionBlock {
  id: string;
  type: string;
  child_page?: { title: string };
}

interface NotionChildrenResp {
  results: NotionBlock[];
  has_more: boolean;
  next_cursor?: string;
}

/**
 * Find a child page named "Service Log" under `clientId`. Create if missing.
 */
export async function getOrCreateServiceLog(clientId: string): Promise<string> {
  let cursor: string | undefined;
  do {
    const qs = new URLSearchParams({ page_size: '100' });
    if (cursor) qs.set('start_cursor', cursor);
    const j = (await notionGet(`/blocks/${clientId}/children?${qs.toString()}`)) as unknown as NotionChildrenResp;
    for (const b of j.results || []) {
      if (b.type === 'child_page' && b.child_page?.title === 'Service Log') return b.id;
    }
    cursor = j.has_more ? j.next_cursor : undefined;
  } while (cursor);

  const created = (await notionPost('/pages', {
    parent: { type: 'page_id', page_id: clientId },
    properties: { title: { title: [{ text: { content: 'Service Log' } }] } },
    children: [
      {
        object: 'block',
        type: 'callout',
        callout: {
          icon: { type: 'emoji', emoji: '📋' },
          rich_text: [
            {
              type: 'text',
              text: {
                content:
                  'Append-only log of work-order events: brief acknowledgments, on-site arrivals, completion sign-offs. Latest at the bottom.',
              },
              annotations: { italic: true },
            },
          ],
        },
      },
    ],
  })) as { id: string };
  return created.id;
}
