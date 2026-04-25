import { NextRequest, NextResponse } from 'next/server';

/**
 * Captures visitor IP on top-level page loads and fires a background
 * POST to /api/visit for reverse-IP lookup + Notion lead creation.
 *
 * Page rendering is NOT blocked — we return the response immediately and
 * let the waitUntil'd fetch run in the background.
 *
 * Dedup layers (belt + suspenders):
 *   1. Cookie `__fh_visited` set on first hit, skips for 24h same browser
 *   2. /api/visit then checks Notion for existing company (bumps counter)
 */

const COOKIE = '__fh_visited';
const BOT_RE = /bot|crawler|spider|spyder|preview|headless|lighthouse|gtmetrix|pingdom|uptimerobot|monitor|curl|wget|vercel/i;

export function proxy(req: NextRequest) {
  const res = NextResponse.next();

  // Skip bots completely
  const ua = req.headers.get('user-agent') || '';
  if (BOT_RE.test(ua)) return res;

  // Skip already-seen browsers for 24h
  if (req.cookies.get(COOKIE)) return res;

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    '';
  if (!ip) return res;

  const secret = process.env.VISIT_SECRET;
  if (!secret) {
    // Feature disabled — still set the cookie so we don't re-check every page load
    res.cookies.set(COOKIE, '1', {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      path: '/',
    });
    return res;
  }

  const body = JSON.stringify({
    ip,
    path: req.nextUrl.pathname,
    ua,
    referrer: req.headers.get('referer') || '',
  });

  // Fire-and-forget. Uses waitUntil when available on the edge runtime.
  // If not available, .then() still schedules the fetch.
  const fetchPromise = fetch(`${req.nextUrl.origin}/api/visit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-visit-secret': secret,
    },
    body,
    keepalive: true,
  }).catch(() => {});

  type WaitUntilContext = { waitUntil?: (p: Promise<unknown>) => void };
  const ctx = (req as unknown as { context?: WaitUntilContext }).context;
  if (ctx?.waitUntil) {
    ctx.waitUntil(fetchPromise);
  }

  res.cookies.set(COOKIE, '1', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24,
    path: '/',
  });

  return res;
}

export const config = {
  matcher: [
    // Run on page routes only — skip Next internals, API routes, and static files.
    '/((?!_next/static|_next/image|api|favicon|.*\\.(?:png|jpg|jpeg|gif|svg|webp|avif|ico|css|js|xml|txt|woff|woff2|ttf|eot|map)$).*)',
  ],
};
