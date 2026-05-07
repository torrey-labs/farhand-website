'use client';

/**
 * Primary "Text us" CTA — clicking opens a chooser with three channels:
 *   1. iMessage / SMS  (sms: deep link, native on iOS/macOS, fallback SMS)
 *   2. WhatsApp        (wa.me universal link)
 *   3. Web chat        (in-page form, POSTs to /api/oem-lead with source='web-chat')
 *
 * Reads `process.env.NEXT_PUBLIC_FARHAND_PHONE` (E.164, e.g. `+18574989778`).
 * Set it in `.env.local` and in Vercel (Production + Preview + Development).
 *
 * The chooser opens as a popover anchored to the button on desktop and as a
 * bottom-sheet on mobile. The web-chat form is a separate dialog reached from
 * the chooser. All three options end in the same place — Aaryan's inbox —
 * but the user picks the channel that matches their device.
 */

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, MessageSquareText, Smartphone, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const PHONE = (process.env.NEXT_PUBLIC_FARHAND_PHONE ?? '').trim();
const PRESET_BODY = 'Hi Farhand, I need a guy.';

function e164(): string {
  return PHONE.replace(/[^+\d]/g, '');
}

function smsHref(): string {
  if (!PHONE) return '#';
  return `sms:${e164()}?&body=${encodeURIComponent(PRESET_BODY)}`;
}

function whatsappHref(): string {
  if (!PHONE) return '#';
  const digits = e164().replace(/^\+/, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(PRESET_BODY)}`;
}

/** Format the E.164 number for display. +18574989778 → +1 (857) 498-9778 */
function formatDisplay(): string {
  const digits = e164().replace(/^\+/, '');
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  return PHONE;
}

export interface TextUsCTAProps {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
  label?: string;
  hideIcon?: boolean;
}

export default function TextUsCTA({
  variant = 'default',
  size = 'lg',
  className,
  label = 'Text us',
  hideIcon = false,
}: TextUsCTAProps) {
  const [open, setOpen] = React.useState(false);
  const [chatOpen, setChatOpen] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const popoverRef = React.useRef<HTMLDivElement>(null);

  // Close popover on outside click / Escape
  React.useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (popoverRef.current?.contains(t)) return;
      if (buttonRef.current?.contains(t)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const phoneDisplay = formatDisplay();

  return (
    <>
      <div className="relative inline-block">
        <Button
          ref={buttonRef}
          variant={variant}
          size={size}
          className={className}
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {!hideIcon && <MessageCircle className="size-5" aria-hidden="true" />}
          {label}
        </Button>

        <AnimatePresence>
          {open && (
            <motion.div
              ref={popoverRef}
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              role="menu"
              aria-label="Choose how to message Farhand"
              className="absolute left-1/2 top-[calc(100%+8px)] -translate-x-1/2 z-50 w-[280px] rounded-2xl border border-white/15 bg-[#0a0a0c]/95 backdrop-blur-md p-2 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
            >
              <p className="px-3 pt-2 pb-1.5 text-[11px] tracking-[0.2em] uppercase text-light-gray/60">
                Text or WhatsApp us
              </p>

              <ChannelLink
                href={smsHref()}
                icon={<Smartphone className="size-4" />}
                title="iMessage / SMS"
                subtitle={phoneDisplay}
                onClick={() => setOpen(false)}
              />
              <ChannelLink
                href={whatsappHref()}
                icon={<MessageCircle className="size-4" />}
                title="WhatsApp"
                subtitle="Opens wa.me"
                external
                onClick={() => setOpen(false)}
              />
              <ChannelButton
                icon={<MessageSquareText className="size-4" />}
                title="Chat with us"
                subtitle="Send a message right here"
                onClick={() => {
                  setOpen(false);
                  setChatOpen(true);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ChatDialog open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}

function ChannelLink({
  href,
  icon,
  title,
  subtitle,
  external,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  external?: boolean;
  onClick?: () => void;
}) {
  return (
    <a
      role="menuitem"
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.06] transition-colors text-left"
    >
      <span className="size-8 rounded-full bg-accent/15 text-accent flex items-center justify-center shrink-0">
        {icon}
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-[15px] font-medium text-foreground leading-tight">
          {title}
        </span>
        <span className="block text-[12px] text-light-gray/70 truncate">
          {subtitle}
        </span>
      </span>
    </a>
  );
}

function ChannelButton({
  icon,
  title,
  subtitle,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <button
      role="menuitem"
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.06] transition-colors text-left"
    >
      <span className="size-8 rounded-full bg-accent/15 text-accent flex items-center justify-center shrink-0">
        {icon}
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-[15px] font-medium text-foreground leading-tight">
          {title}
        </span>
        <span className="block text-[12px] text-light-gray/70 truncate">
          {subtitle}
        </span>
      </span>
    </button>
  );
}

type ChatStatus = 'idle' | 'sending' | 'sent' | 'error';

function ChatDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [company, setCompany] = React.useState('');
  const [machinery, setMachinery] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [status, setStatus] = React.useState<ChatStatus>('idle');
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim() && !machinery.trim()) return;
    setStatus('sending');
    setErrorMsg(null);
    try {
      const res = await fetch('/api/oem-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Company is required — default to a friendly fallback so /api/oem-lead's
          // validation doesn't reject when the user only filled out other fields.
          company: company.trim() || name.trim() || phone.trim() || email.trim() || 'Web chat',
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          machinery: machinery.trim(),
          location: location.trim(),
          message: message.trim(),
          source: 'web-chat',
          referrer: typeof document !== 'undefined' ? document.referrer : '',
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
          path: typeof window !== 'undefined' ? window.location.pathname : '',
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('sent');
      setName('');
      setPhone('');
      setEmail('');
      setCompany('');
      setMachinery('');
      setLocation('');
      setMessage('');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Send failed');
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
        >
          <button
            type="button"
            aria-label="Close chat"
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Chat with Farhand"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full sm:max-w-md bg-[#0a0a0c] border border-white/15 rounded-t-3xl sm:rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.7)]"
          >
            <div className="flex items-start justify-between p-5 pb-3">
              <div>
                <p className="text-base md:text-lg font-medium text-foreground">Chat with us</p>
                <p className="text-xs text-light-gray/70 mt-0.5">
                  Or text/WhatsApp us at{' '}
                  <span className="text-light-gray">{formatDisplay()}</span>
                </p>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="size-8 rounded-full hover:bg-white/10 flex items-center justify-center text-light-gray hover:text-foreground transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            {status === 'sent' ? (
              <div className="p-5 pt-2 pb-7">
                <div className="rounded-2xl border border-accent/40 bg-accent/[0.06] px-4 py-5 text-center">
                  <p className="text-base font-medium text-foreground mb-1">Got it.</p>
                  <p className="text-sm text-light-gray">
                    We&apos;ll text you back within the hour during business hours.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-3 w-full text-sm text-light-gray/70 hover:text-foreground transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-5 pt-2 pb-5 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field
                    label="Name"
                    value={name}
                    onChange={setName}
                    autoComplete="name"
                  />
                  <Field
                    label="Phone"
                    type="tel"
                    value={phone}
                    onChange={setPhone}
                    autoComplete="tel"
                    placeholder="So we can text you back"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field
                    label="Company"
                    value={company}
                    onChange={setCompany}
                    autoComplete="organization"
                  />
                  <Field
                    label="Email"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    autoComplete="email"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field
                    label="Robot / machinery"
                    value={machinery}
                    onChange={setMachinery}
                    placeholder="Fanuc, Keenon, CNC…"
                  />
                  <Field
                    label="Location"
                    value={location}
                    onChange={setLocation}
                    autoComplete="address-level2"
                    placeholder="City, state or zip"
                  />
                </div>
                <Field
                  label="Message"
                  value={message}
                  onChange={setMessage}
                  textarea
                  placeholder="What do you need? (optional)"
                />
                <div className="flex items-center gap-3 pt-1">
                  <Button
                    type="submit"
                    size="default"
                    disabled={status === 'sending' || (!message.trim() && !machinery.trim())}
                    className={cn('flex-1', status === 'sending' && 'opacity-70')}
                  >
                    {status === 'sending' ? 'Sending…' : 'Send'}
                  </Button>
                </div>
                <p className="text-[11px] text-light-gray/50">
                  We text you back within the hour during business hours.
                </p>
                {status === 'error' && (
                  <p className="text-xs text-red-400" role="alert">
                    Couldn&apos;t send ({errorMsg}). Try WhatsApp or SMS instead.
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  autoComplete,
  required,
  placeholder,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  placeholder?: string;
  textarea?: boolean;
}) {
  const id = React.useId();
  const cls =
    'w-full bg-white/[0.04] border border-white/10 focus:border-accent/60 focus:bg-white/[0.06] rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-light-gray/40 outline-none transition-colors';
  return (
    <label htmlFor={id} className="block">
      <span className="block text-[11px] uppercase tracking-[0.15em] text-light-gray/60 mb-1.5">
        {label}
      </span>
      {textarea ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          placeholder={placeholder}
          rows={3}
          className={cn(cls, 'resize-none')}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={cls}
        />
      )}
    </label>
  );
}
