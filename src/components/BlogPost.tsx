'use client';

import React from 'react';
import Link from 'next/link';
import Navigation from './Navigation';
import Footer from './Footer';

interface BlogPostProps {
  title: string;
  date: string;
  category: string;
  children: React.ReactNode;
}

export default function BlogPost({ title, date, category, children }: BlogPostProps) {
  return (
    <main style={{ background: '#000', minHeight: '100vh' }}>
      <Navigation />

      <article style={{ padding: 'clamp(8rem, 15vw, 10rem) 0 clamp(3rem, 8vw, 5rem)' }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <div style={{ marginBottom: '2rem' }}>
            <Link href="/blog" style={{ fontSize: '14px', color: 'var(--accent-green)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
              &larr; Back to blog
            </Link>
          </div>
          <span style={{ fontSize: '13px', color: 'var(--accent-green)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {category}
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 42px)', marginTop: '0.75rem', marginBottom: '1rem', lineHeight: 1.2 }}>
            {title}
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--light-gray)', opacity: 0.5, marginBottom: '3rem' }}>
            {date}
          </p>
          <div style={{ fontSize: '18px', color: 'var(--light-gray)', lineHeight: 1.8 }}>
            {children}
          </div>
        </div>
      </article>

      {/* CTA */}
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '600px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: 400, marginBottom: '1.5rem' }}>
            Ready to modernize your field service?
          </h3>
          <a href="/#schedule" className="btn-primary">
            Schedule a call
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
