'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Stat {
  value: string;
  label: string;
}

interface StatsRowProps {
  stats: Stat[];
}

const ease = [0.19, 1, 0.22, 1] as const;

export default function StatsRow({ stats }: StatsRowProps) {
  return (
    <section className="py-8 md:py-12 lg:py-16">
      <div className="container">
        <div className="flex justify-center gap-8 md:gap-12 lg:gap-16 flex-wrap">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.8, ease }}
              viewport={{ once: true }}
              className="text-center min-w-[150px]"
            >
              <p className="text-4xl md:text-5xl font-light text-accent mb-2 leading-none">
                {stat.value}
              </p>
              <p className="text-sm md:text-base text-light-gray/80 m-0">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
