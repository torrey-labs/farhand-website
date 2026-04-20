import { NextRequest } from 'next/server';

const CAL_LINK = 'https://cal.com/aaryan-agrawal/30min';
const FROM = 'Aaryan at Farhand <aaryan@farhand.live>';
const OWNER = 'aaryan@farhand.live';

export async function POST(req: NextRequest) {
  try {
    const { email, source } = await req.json();
    if (!email || typeof email !== 'string' || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return json({ error: 'Invalid email' }, 400);
    }

    const key = process.env.RESEND_API_KEY;
    if (!key) {
      console.warn('[newsletter] RESEND_API_KEY not set — lead not delivered:', email, source);
      return json({ ok: true, delivered: false }, 200);
    }

    const [autoReply, notify] = await Promise.all([
      sendEmail(key, {
        from: FROM,
        to: email,
        subject: 'Let\u2019s talk — book a time with Farhand',
        html: autoReplyHtml(),
      }),
      sendEmail(key, {
        from: FROM,
        to: OWNER,
        subject: `New inquiry from ${email}${source ? ` (${source})` : ''}`,
        html: `<p>New lead from the site.</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Source:</strong> ${escapeHtml(source || 'unknown')}</p>`,
      }),
    ]);

    if (!autoReply.ok || !notify.ok) {
      console.error('[newsletter] resend failed', { autoReply, notify });
      return json({ error: 'Send failed' }, 502);
    }

    return json({ ok: true, delivered: true }, 200);
  } catch (err) {
    console.error('[newsletter] error', err);
    return json({ error: 'Bad request' }, 400);
  }
}

async function sendEmail(
  key: string,
  body: { from: string; to: string; subject: string; html: string },
): Promise<{ ok: boolean; status: number }> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return { ok: res.ok, status: res.status };
}

function autoReplyHtml() {
  return `
<div style="font-family:system-ui,-apple-system,sans-serif;font-size:16px;line-height:1.6;color:#111;max-width:560px">
  <p>Thanks for reaching out.</p>
  <p>I'd love to learn about your machines and what you're trying to get done in the field. Grab any slot that works — 30 minutes, no prep needed:</p>
  <p><a href="${CAL_LINK}" style="display:inline-block;background:#000;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:600">Book a time</a></p>
  <p>Or reply to this email if a quick note is easier first.</p>
  <p>— Aaryan<br/>Farhand · <a href="https://farhand.live" style="color:#111">farhand.live</a></p>
</div>`.trim();
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);
}

function json(data: unknown, status: number) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
