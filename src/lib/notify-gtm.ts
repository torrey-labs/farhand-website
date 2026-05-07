/**
 * Best-effort relay to farhand-gtm's `/api/notify-form` endpoint, which
 * fires the URGENT email to the team via Gmail SMTP. Centralizing the email
 * infrastructure in farhand-gtm keeps the marketing repo free of GTM
 * automation per its CLAUDE.md rule.
 *
 * Required env on the website project:
 *   GTM_NOTIFY_URL              full URL of the deployed GTM endpoint
 *                               (e.g. https://farhand-gtm.vercel.app/api/notify-form)
 *   WEB_NOTIFY_SHARED_SECRET    same value set on the GTM project
 *
 * Both env vars optional. If either is missing, this is a no-op (the lead
 * still got captured in Notion; the email just doesn't fire). The website
 * never blocks on email delivery — fire-and-forget, never throw.
 */

export type WebChatPayload = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  source: string;
  path: string;
  pageId: string | null;
};

export async function notifyGtmWebChat(payload: WebChatPayload): Promise<void> {
  const url = process.env.GTM_NOTIFY_URL;
  const secret = process.env.WEB_NOTIFY_SHARED_SECRET;
  if (!url || !secret) {
    console.log(
      '[notify-gtm] skipped — set GTM_NOTIFY_URL + WEB_NOTIFY_SHARED_SECRET to enable',
    );
    return;
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Notify-Secret': secret,
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const t = await res.text().catch(() => '');
      console.warn('[notify-gtm] non-200', res.status, t.slice(0, 200));
    }
  } catch (err: unknown) {
    const m = err instanceof Error ? err.message : String(err);
    console.warn('[notify-gtm] request failed:', m.slice(0, 200));
  }
}
