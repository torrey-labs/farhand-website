'use client';

import React from 'react';
import Link from 'next/link';
import Navigation from './Navigation';
import Footer from './Footer';
import { Button } from '@/components/ui/button';

interface BlogPostProps {
  title: string;
  date: string;
  category: string;
  children: React.ReactNode;
}

export default function BlogPost({ title, date, category, children }: BlogPostProps) {
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

      {/* CTA */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container text-center max-w-[600px]">
          <h3 className="text-2xl font-normal mb-6">
            Ready to modernize your field service?
          </h3>
          <Button asChild size="lg">
            <a href="/#schedule">Schedule a call</a>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
