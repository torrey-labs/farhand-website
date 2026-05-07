'use client';

import React from 'react';
import { motion } from 'framer-motion';

const SERVICES = [
  'Same-day on-site',
  'Installation',
  'Mapping',
  'Site testing',
  'Preventative maintenance',
  'Break/fix',
  'Customer training',
  'Spare parts',
];

const PLATFORMS = ['AMRs', 'AGVs', 'Humanoids', 'Robotic arms', 'ASRS'];

export default function ServicesGlance() {
  return (
    <section className="bg-background py-10 md:py-16">
      <div className="container max-w-[1000px]">
        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 md:gap-10 items-start">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="text-light-gray/70 text-xs md:text-sm tracking-[0.2em] uppercase"
          >
            What we do
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="flex flex-wrap gap-2 md:gap-2.5"
          >
            {SERVICES.map((s) => (
              <span
                key={s}
                className="px-3 py-1.5 rounded-full border border-white/15 bg-white/[0.03] text-sm md:text-[15px] text-light-gray"
              >
                {s}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 md:gap-10 items-start mt-6 md:mt-8">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="text-light-gray/70 text-xs md:text-sm tracking-[0.2em] uppercase"
          >
            What we service
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="flex flex-wrap gap-2 md:gap-2.5"
          >
            {PLATFORMS.map((p) => (
              <span
                key={p}
                className="px-3 py-1.5 rounded-full border border-accent/40 bg-accent/[0.06] text-sm md:text-[15px] text-foreground"
              >
                {p}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
