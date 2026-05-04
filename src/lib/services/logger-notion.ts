import type { Logger } from './logger';

export const notionLogger: Logger = {
  async append(e) {
    const text =
      `✓ ${e.ts.toISOString()} — ${e.workOrder} — Acknowledged by ${e.tech}` +
      (e.ip && e.ip !== 'unknown' ? ` — IP ${e.ip}` : '');

    const res = await fetch(
      `https://api.notion.com/v1/blocks/${e.logPageId}/children`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          children: [
            {
              object: 'block',
              type: 'bulleted_list_item',
              bulleted_list_item: {
                rich_text: [{ type: 'text', text: { content: text } }],
              },
            },
          ],
        }),
      },
    );
    if (!res.ok) throw new Error(`Notion ${res.status}: ${await res.text()}`);
  },
};
