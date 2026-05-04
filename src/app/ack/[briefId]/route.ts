import { NextRequest, NextResponse } from 'next/server';
import { getLogger } from '@/lib/services';
import { findClientForBrief, getOrCreateServiceLog } from '@/lib/services/notion-walk';

/**
 * Technician brief acknowledgment endpoint.
 *
 * Called when a tech clicks the "I have read this brief" button on a Notion
 * brief page. Walks up the brief's parent chain to find the client (the page
 * whose parent is a Notion database), finds-or-creates a "Service Log"
 * sub-page on that client, and appends the acknowledgment.
 *
 * URL: GET /ack/<brief-page-id>?for=<tech-name>
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ briefId: string }> },
) {
  const { briefId } = await params;
  const url = new URL(req.url);
  const tech = url.searchParams.get('for') ?? 'Tech';
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';

  try {
    const { clientId, trailTitles } = await findClientForBrief(briefId);
    const logPageId = await getOrCreateServiceLog(clientId);
    const workOrder = trailTitles.length ? trailTitles.join(' → ') : 'Brief';

    await getLogger().append({
      ts: new Date(),
      workOrder,
      tech,
      ip,
      clientId,
      logPageId,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'unknown';
    console.error('[ack] error:', msg);
    return new NextResponse(
      htmlPage(
        `Couldn't register acknowledgment: ${msg}. Text Aaryan (857) 498-9778.`,
        false,
      ),
      { status: 500, headers: { 'Content-Type': 'text/html' } },
    );
  }

  return new NextResponse(htmlPage(`Confirmed — thanks ${tech}. See you on-site.`, true), {
    headers: { 'Content-Type': 'text/html' },
  });
}

function htmlPage(msg: string, ok: boolean): string {
  const color = ok ? '#16a34a' : '#dc2626';
  const symbol = ok ? '✓' : '✕';
  return `<!doctype html><html><head><title>${ok ? 'Confirmed' : 'Error'}</title><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#f8fafc;color:#0f172a}main{max-width:520px;text-align:center;padding:48px 24px}h1{color:${color};font-size:64px;margin:0 0 12px;font-weight:700}p{color:#475569;font-size:18px;line-height:1.5;margin:0}</style></head><body><main><h1>${symbol}</h1><p>${msg}</p></main></body></html>`;
}
