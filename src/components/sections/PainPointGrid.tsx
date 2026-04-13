'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import SectionHeader from './SectionHeader';

interface PainPointGridProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items: string[];
}

const ease = [0.19, 1, 0.22, 1] as const;

export default function PainPointGrid({ eyebrow, title, subtitle, items }: PainPointGridProps) {
  return (
    <section className="bg-background py-12 md:py-16 lg:py-24">
      <div className="container text-center">
        {title && <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-[1000px] mx-auto">
          {items.map((text, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.8, ease }}
              viewport={{ once: true, margin: '-50px' }}
            >
              <Card className="flex items-center justify-center text-center min-h-[140px]">
                <p className="text-xl md:text-2xl font-medium text-foreground m-0 leading-snug">
                  {text}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
