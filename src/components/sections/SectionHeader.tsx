'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
}

const ease = [0.19, 1, 0.22, 1] as const;

export default function SectionHeader({ eyebrow, title, subtitle, align = 'center' }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease }}
      viewport={{ once: true, margin: '-100px' }}
      className={align === 'center' ? 'text-center mb-12 md:mb-16' : 'text-left mb-12 md:mb-16'}
    >
      {eyebrow && (
        <p className="text-sm text-accent font-medium uppercase tracking-wider mb-4">
          {eyebrow}
        </p>
      )}
      <h3 className="mb-4 font-normal">{title}</h3>
      {subtitle && (
        <p className="text-base md:text-lg text-light-gray max-w-[600px] mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
