'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface CTABlockProps {
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
}

const ease = [0.19, 1, 0.22, 1] as const;

export default function CTABlock({
  title,
  subtitle,
  buttonText = 'Schedule a call',
  buttonHref = '/#schedule',
}: CTABlockProps) {
  return (
    <section className="bg-background py-12 md:py-16 lg:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center max-w-[700px] mx-auto"
        >
          <h3 className="mb-4 font-normal">{title}</h3>
          {subtitle && (
            <p className="text-base md:text-lg text-light-gray mb-8 max-w-[500px] mx-auto">
              {subtitle}
            </p>
          )}
          <Button asChild size="lg">
            <a href={buttonHref}>{buttonText}</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
