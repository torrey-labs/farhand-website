'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import SectionHeader from './SectionHeader';

interface Feature {
  title: string;
  desc: string;
  icon?: React.ReactNode;
}

interface FeatureGridProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  features: Feature[];
}

const ease = [0.19, 1, 0.22, 1] as const;

export default function FeatureGrid({ eyebrow, title, subtitle, features }: FeatureGridProps) {
  return (
    <section className="bg-background py-12 md:py-16 lg:py-24">
      <div className="container text-center">
        {title && <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-[1000px] mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 1, ease }}
              viewport={{ once: true }}
            >
              <Card className="flex flex-col justify-start min-h-[160px] text-left">
                {f.icon && (
                  <div className="w-10 h-10 rounded-full border border-accent flex items-center justify-center text-accent mb-6">
                    {f.icon}
                  </div>
                )}
                <p className="text-xl md:text-[22px] font-medium text-foreground mb-2">
                  {f.title}
                </p>
                <p className="text-base md:text-lg text-light-gray/90 m-0 leading-relaxed">
                  {f.desc}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
