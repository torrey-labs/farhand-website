import { NextRequest } from 'next/server';
import { enrichViaApollo, storeInNotion } from '@/lib/notion';
import { notifyGtmWebChat } from '@/lib/notify-gtm';

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const company = typeof payload?.company === 'string' ? payload.company.trim() : '';
    const contactName = typeof payload?.name === 'string' ? payload.name.trim() : '';

    if (!company || company.length > 200) {
      return new Response(JSON.stringify({ error: 'Invalid company' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    if (contactName.length > 200) {
      return new Response(JSON.stringify({ error: 'Invalid name' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const email = typeof payload?.email === 'string' ? payload.email.trim().slice(0, 200) : '';
    const phone = typeof payload?.phone === 'string' ? payload.phone.trim().slice(0, 50) : '';
    const message = typeof payload?.message === 'string' ? payload.message.trim().slice(0, 2000) : '';
    const machinery = typeof payload?.machinery === 'string' ? payload.machinery.trim().slice(0, 500) : '';
    const location = typeof payload?.location === 'string' ? payload.location.trim().slice(0, 200) : '';

    const meta = {
      source: String(payload?.source || 'qr-oem'),
      referrer: String(payload?.referrer || ''),
      userAgent: String(payload?.userAgent || ''),
      path: typeof payload?.path === 'string' ? payload.path : '',
      email,
      phone,
      message,
      machinery,
      location,
    };

    const enrichment = await enrichViaApollo(company);
    const storage = await storeInNotion(company, contactName, enrichment, meta);

    // Fire-and-forget URGENT email via GTM. Never blocks the response.
    void notifyGtmWebChat({
      name: contactName,
      email,
      phone,
      company,
      message,
      source: meta.source,
      path: meta.path,
      pageId: storage.pageId ?? null,
    });

    console.log(
      '[oem-lead]',
      JSON.stringify({
        company,
        contactName,
        enrichmentSource: enrichment.source,
        orgMatch: enrichment.org?.name,
        peopleFound: enrichment.topPeople.length,
        stored: storage.stored,
        ...meta,
      }),
    );

    return new Response(
      JSON.stringify({
        ok: true,
        enriched: enrichment.source === 'apollo',
        stored: storage.stored,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (err) {
    console.error('[oem-lead] error:', err);
    return new Response(JSON.stringify({ error: 'Bad request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
