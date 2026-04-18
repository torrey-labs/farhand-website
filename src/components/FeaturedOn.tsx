'use client';

import React from 'react';
import { motion } from 'framer-motion';

export type FeaturedLogo = {
  src: string;
  alt: string;
  height?: number;
  filter?: string;
  href?: string;
  title?: string;
};

type FeaturedOnProps = {
  label?: string;
  logos: FeaturedLogo[];
};

export default function FeaturedOn({
  label = 'Featured on',
  logos,
}: FeaturedOnProps) {
  return (
    <section
      aria-label={label}
      className="bg-background py-12 md:py-16 border-t border-border"
    >
      <div className="container max-w-[900px] text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-light-gray/70 text-sm tracking-[0.2em] uppercase mb-4 md:mb-5"
        >
          {label}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-10 md:gap-16"
        >
          {logos.map((logo) => {
            const img = (
              <img
                src={logo.src}
                alt={logo.alt}
                title={logo.title}
                style={{
                  height: logo.height ?? 44,
                  filter: logo.filter,
                }}
                className="w-auto object-contain"
              />
            );
            if (logo.href) {
              return (
                <a
                  key={logo.src}
                  href={logo.href}
                  title={logo.title ?? logo.alt}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  {img}
                </a>
              );
            }
            return <span key={logo.src}>{img}</span>;
          })}
        </motion.div>
      </div>
    </section>
  );
}
