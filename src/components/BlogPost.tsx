'use client';

import React from 'react';
import Link from 'next/link';
import Navigation from './Navigation';
import Footer from './Footer';
import { Button } from '@/components/ui/button';
import { blogPosts, type BlogPostMeta } from '@/data/blogPosts';

interface BlogPostProps {
  title: string;
  date: string;
  category: string;
  /**
   * Slug of the current post. When provided, renders a 3-card
   * Related Posts strip above the CTA, prioritizing same-category
   * posts. Boosts internal link graph + dwell time.
   */
  slug?: string;
  children: React.ReactNode;
}

function pickRelatedPosts(currentSlug: string, currentCategory: string): BlogPostMeta[] {
  const others = blogPosts.filter((p) => p.slug !== currentSlug);
  // Prefer same category, then fill with most recent.
  const sameCat = others.filter((p) => p.category === currentCategory);
  const otherCat = others.filter((p) => p.category !== currentCategory);
  // Stable sort by date desc.
  const byDate = (a: BlogPostMeta, b: BlogPostMeta) => (a.date < b.date ? 1 : -1);
  return [...sameCat.sort(byDate), ...otherCat.sort(byDate)].slice(0, 3);
}

export default function BlogPost({ title, date, category, slug, children }: BlogPostProps) {
  const related = slug ? pickRelatedPosts(slug, category) : [];

  return (
    <main className="bg-background min-h-screen">
      <Navigation />

      <article className="pt-32 md:pt-36 lg:pt-40 pb-12 md:pb-16 lg:pb-20">
        <div className="container max-w-[720px]">
          <div className="mb-8">
            <Link
              href="/blog"
              className="text-sm text-accent no-underline inline-flex items-center gap-2 mb-8"
            >
              &larr; Back to blog
            </Link>
          </div>
          <span className="text-xs text-accent font-medium uppercase tracking-wider">
            {category}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-[42px] mt-3 mb-4 leading-[1.2]">
            {title}
          </h1>
          <p className="text-[15px] text-light-gray/50 mb-12">
            {date}
          </p>
          <div className="text-lg text-light-gray leading-[1.8]">
            {children}
          </div>
        </div>
      </article>

      {/* Related posts — internal linking boost. Renders only when the
          page passes its slug. */}
      {related.length > 0 && (
        <section className="py-12 md:py-16 border-t border-white/5">
          <div className="container max-w-[1100px]">
            <h3 className="text-xs text-light-gray/60 font-medium uppercase tracking-[0.2em] mb-8 text-center">
              Keep reading
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="block bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-accent/30 rounded-2xl p-6 transition-colors"
                >
                  <span className="text-[11px] text-accent font-medium uppercase tracking-wider">
                    {p.category}
                  </span>
                  <h4 className="text-base md:text-lg font-medium text-foreground mt-2 mb-3 leading-snug">
                    {p.title}
                  </h4>
                  <p className="text-sm text-light-gray/70 leading-relaxed line-clamp-3">
                    {p.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container text-center max-w-[600px]">
          <h3 className="text-2xl font-normal mb-6">
            Ready to modernize your field service?
          </h3>
          <Button asChild size="lg">
            <Link href="/#schedule">Schedule a call</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
