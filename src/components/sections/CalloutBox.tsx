'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CalloutBoxProps {
  eyebrow?: string;
  title: string;
  footer?: string;
}

const ease = [0.19, 1, 0.22, 1] as const;

export default function CalloutBox({ eyebrow, title, footer }: CalloutBoxProps) {
  return (
    <section className="bg-background py-12 md:py-16 lg:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
          viewport={{ once: true, margin: '-100px' }}
          className="py-12 md:py-16 lg:py-20 px-6 md:px-10 lg:px-12 border border-white/10 rounded-[30px] max-w-[900px] mx-auto text-center"
        >
          {eyebrow && (
            <p className="text-base md:text-lg text-light-gray/90 mb-6 font-normal">
              {eyebrow}
            </p>
          )}
          <h3 className="max-w-[750px] mx-auto mb-6 font-light leading-[1.45]">
            <strong>{title}</strong>
          </h3>
          {footer && (
            <p className="text-base md:text-lg text-light-gray/80">
              {footer}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
