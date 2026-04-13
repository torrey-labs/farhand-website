'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';

interface StepsListProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  steps: string[];
}

const ease = [0.19, 1, 0.22, 1] as const;

export default function StepsList({ eyebrow, title, subtitle, steps }: StepsListProps) {
  return (
    <section className="bg-background py-12 md:py-16 lg:py-24">
      <div className="container text-center">
        {title && <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />}
        <div className="max-w-[800px] mx-auto text-left">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15, duration: 0.8, ease }}
              viewport={{ once: true }}
              className={`flex items-start gap-6 py-6 ${i < steps.length - 1 ? 'border-b border-white/10' : ''}`}
            >
              <span className="text-sm font-semibold text-accent min-w-[28px] pt-0.5">
                0{i + 1}
              </span>
              <p className="text-base md:text-xl text-foreground m-0 leading-relaxed">
                {step}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
