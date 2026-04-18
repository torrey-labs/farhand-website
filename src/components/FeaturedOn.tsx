'use client';

import React from 'react';
import { motion } from 'framer-motion';

export type FeaturedLogo = {
  src: string;
  alt: string;
  height?: number;
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
          className="text-light-gray/70 text-sm tracking-[0.2em] uppercase mb-8 md:mb-10"
        >
          {label}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
        >
          {logos.map((logo) => (
            <div
              key={logo.src}
              className="bg-white/95 rounded-xl px-6 py-4 flex items-center justify-center"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                style={{ height: logo.height ?? 44 }}
                className="w-auto object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
