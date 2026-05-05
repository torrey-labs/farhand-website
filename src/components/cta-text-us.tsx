'use client';

/**
 * Primary "Text us" CTA. Tap-to-thread deep link into Farhand's WhatsApp /
 * SMS number — replaces the legacy "Schedule a call" primary action.
 *
 * Reads `process.env.NEXT_PUBLIC_FARHAND_PHONE` (E.164, e.g. `+18005550123`).
 * Set it in `.env.local` and in the Vercel project (Production + Preview +
 * Development). The value is inlined at build time per Next.js convention.
 *
 * Channel selection: defaults to WhatsApp (`wa.me/<E.164>` universal link
 * — works on iOS, Android, web). On iOS, swaps to `sms:` after mount so
 * iPhone users land in Messages.app instead of being routed through
 * WhatsApp Web. The post-mount swap is acceptable: the WhatsApp link is
 * still functional if the user taps before the swap completes.
 */

import * as React from 'react';
import { MessageCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';

const PHONE = (process.env.NEXT_PUBLIC_FARHAND_PHONE ?? '').trim();
const PRESET_BODY = 'Hi Farhand, I need a guy.';

type Channel = 'whatsapp' | 'sms';

function buildHref(channel: Channel): string {
  if (!PHONE) return '#';
  const e164 = PHONE.replace(/[^+\d]/g, '');
  if (channel === 'sms') {
    // iOS Messages.app + Android both accept `sms:<E.164>?&body=…`.
    return `sms:${e164}?&body=${encodeURIComponent(PRESET_BODY)}`;
  }
  // WhatsApp universal link: digits only, no leading `+`.
  const digits = e164.replace(/^\+/, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(PRESET_BODY)}`;
}

function isIOS(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

export interface TextUsCTAProps {
  /** shadcn Button variant. Defaults to `default` (primary, accent green). */
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
  /** shadcn Button size. */
  size?: 'sm' | 'default' | 'lg';
  /** Extra Tailwind classes appended to the button. */
  className?: string;
  /** Visible label. Defaults to "Text us". */
  label?: string;
  /** Hide the leading icon (e.g. for a tighter nav-chip style). */
  hideIcon?: boolean;
}

export default function TextUsCTA({
  variant = 'default',
  size = 'lg',
  className,
  label = 'Text us',
  hideIcon = false,
}: TextUsCTAProps) {
  const [channel, setChannel] = React.useState<Channel>('whatsapp');

  React.useEffect(() => {
    if (isIOS()) setChannel('sms');
  }, []);

  const href = buildHref(channel);
  const ariaLabel = `${label} — ${channel === 'sms' ? 'SMS' : 'WhatsApp'}`;

  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a href={href} aria-label={ariaLabel}>
        {!hideIcon && <MessageCircle className="size-5" aria-hidden="true" />}
        {label}
      </a>
    </Button>
  );
}
