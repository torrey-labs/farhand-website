'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function OemLeadForm() {
  const [company, setCompany] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!company.trim()) return;
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/oem-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: company.trim(),
          source: 'qr-oem',
          referrer: typeof document !== 'undefined' ? document.referrer : '',
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        }),
      });
      if (!res.ok) throw new Error('request failed');
      // Captured — send them to the main site.
      window.location.href = '/';
    } catch {
      setError('Something went wrong. Please try again.');
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-[520px] mx-auto">
      <label htmlFor="company" className="sr-only">
        Company name
      </label>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          id="company"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="What company are you with?"
          autoFocus
          autoComplete="organization"
          required
          disabled={submitting}
          className="flex-1 px-5 py-4 rounded-full bg-white/5 border border-border text-foreground placeholder:text-light-gray/50 focus:outline-none focus:border-accent focus:bg-white/10 transition disabled:opacity-50 text-base"
        />
        <Button type="submit" size="lg" disabled={submitting || !company.trim()}>
          {submitting ? 'Saving…' : 'Continue →'}
        </Button>
      </div>
      {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
    </form>
  );
}
