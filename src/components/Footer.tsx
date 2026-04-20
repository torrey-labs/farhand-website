'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getCalApi } from "@calcom/embed-react";
import { FaLinkedin } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

function FooterEmailForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer' }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex-1 basis-[320px] max-w-[520px]">
      <p className="text-sm text-light-gray/70 mb-3">Email</p>
      <div className="bg-white/15 rounded-[10px] p-3.5 mb-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jules@example.com"
          className="w-full bg-transparent border-none outline-none text-foreground placeholder:text-neutral-400 text-base font-[inherit] min-h-[20px]"
        />
      </div>
      <Button
        type="submit"
        variant="dark"
        disabled={status === 'loading'}
        className="w-full h-12 rounded-[10px] text-sm font-semibold"
      >
        {status === 'loading'
          ? 'Sending…'
          : status === 'success'
            ? 'Check your inbox — link on the way.'
            : status === 'error'
              ? 'Try again'
              : 'Let\u2019s talk'}
      </Button>
    </form>
  );
}

export default function Footer() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "dark",
        cssVarsPerTheme: {
          dark: {
            "cal-brand": "#1aff67",
            "cal-bg-default": "#000000",
            "cal-bg-subtle": "#0a0a0a",
            "cal-bg-emphasis": "#111111",
            "cal-bg-muted": "#0a0a0a",
            "cal-border-default": "#1a1a1a",
            "cal-border-subtle": "#1a1a1a",
            "cal-border-emphasis": "#262626",
          },
          light: { "cal-brand": "#1aff67" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <footer id="schedule" className="bg-background pb-8">
      <div className="container">

        {/* CTA Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center pt-12 md:pt-16 lg:pt-20 pb-8 md:pb-10 lg:pb-12"
        >
          <h3 className="text-2xl md:text-3xl lg:text-[32px] mb-1 leading-[1.5] font-normal">
            You don&apos;t need a field service team.
          </h3>
          <h3 className="text-2xl md:text-3xl lg:text-[32px] leading-[1.5] font-normal">
            You need field service <em className="text-accent italic">done</em>.
          </h3>
        </motion.div>

        {/* Contact + Email Form Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex justify-center items-start gap-12 md:gap-16 lg:gap-24 flex-wrap max-w-[900px] mx-auto mb-8 md:mb-10 lg:mb-12"
        >
          {/* Contact Info */}
          <div className="text-center min-w-[200px]">
            <p className="text-lg md:text-xl text-foreground mb-2 font-normal">
              aaryan@farhand.live
            </p>
            <p className="text-lg md:text-xl text-foreground font-normal m-0">
              (857) 498-9778
            </p>
          </div>

          {/* Email Form */}
          <FooterEmailForm />
        </motion.div>

        {/* Cal.com popup trigger — opens the full scheduler in a modal,
            works at every viewport instead of cramming month-view into the page */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-4 mb-12 md:mb-16 lg:mb-20"
        >
          <button
            data-cal-link="aaryan-agrawal/30min"
            data-cal-config='{"theme":"dark","layout":"month_view","cssVarsPerTheme":{"dark":{"cal-brand":"#1aff67","cal-bg-default":"#000000","cal-bg-subtle":"#0a0a0a","cal-bg-emphasis":"#111111","cal-bg-muted":"#0a0a0a","cal-border-default":"#1a1a1a","cal-border-subtle":"#1a1a1a","cal-border-emphasis":"#262626"}}}'
            className="bg-accent text-black text-base md:text-lg font-semibold px-8 md:px-10 py-4 md:py-5 rounded-full hover:opacity-90 transition-opacity min-h-[56px] min-w-[240px]"
          >
            Book a 30-min call
          </button>
          <p className="text-sm text-light-gray/60">
            Opens the scheduler in a window — pick any time that works.
          </p>
        </motion.div>


        {/* Bottom Section - Logo */}
        <div className="flex justify-between items-end flex-wrap gap-12 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <img
                src="/logo-w-type-light-on-dark.png"
                alt="Farhand Logo"
                className="h-10 opacity-90"
              />
            </div>
            <p className="text-sm text-light-gray/60 mb-4">
              Your field support partner
            </p>
            <div className="flex gap-4 mb-4">
              <motion.a
                whileHover={{ opacity: 0.9 }}
                href="https://www.linkedin.com/company/farhand-robotics/home"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light-gray/80 p-2.5 -m-2.5"
              >
                <FaLinkedin size={20} />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6">
          <Link href="/terms" className="text-sm text-light-gray/60 py-2 inline-block">
            Terms &amp; Privacy
          </Link>
        </div>

      </div>
    </footer>
  );
}
