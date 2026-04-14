'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function OemLeadForm() {
  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const companyFilled = company.trim().length >= 2;
  const ready = companyFilled && name.trim().length >= 2;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!ready) return;
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/oem-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: company.trim(),
          name: name.trim(),
          source: 'qr-oem',
          referrer: typeof document !== 'undefined' ? document.referrer : '',
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        }),
      });
      if (!res.ok) throw new Error('request failed');
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
        className="w-full px-5 py-4 rounded-full bg-white/5 border border-border text-foreground placeholder:text-light-gray/50 focus:outline-none focus:border-accent focus:bg-white/10 transition disabled:opacity-50 text-base"
      />

      <div
        aria-hidden={!companyFilled}
        className={`grid transition-all duration-500 ease-out ${
          companyFilled
            ? 'grid-rows-[1fr] opacity-100 mt-3'
            : 'grid-rows-[0fr] opacity-0 mt-0 pointer-events-none'
        }`}
      >
        <div className="overflow-hidden">
          <label htmlFor="name" className="sr-only">
            Your name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="And who are you?"
            autoComplete="name"
            required={companyFilled}
            disabled={submitting}
            tabIndex={companyFilled ? 0 : -1}
            className="w-full px-5 py-4 rounded-full bg-white/5 border border-border text-foreground placeholder:text-light-gray/50 focus:outline-none focus:border-accent focus:bg-white/10 transition disabled:opacity-50 text-base"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <Button type="submit" size="lg" disabled={submitting || !ready}>
          {submitting ? 'Saving…' : 'Continue →'}
        </Button>
      </div>

      {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
    </form>
  );
}
