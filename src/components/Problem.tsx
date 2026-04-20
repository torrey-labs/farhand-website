'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

const problems = [
  "Travelling or regional technicians don't scale",
  "Outsourced service contracts are expensive and poor quality",
  "Only your senior engineer knows some procedures",
];

export default function Problem() {
  return (
    <section className="bg-background py-10 md:py-16 lg:py-24">
      <div className="container text-center">
        <motion.h4
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-8 md:mb-20 lg:mb-24"
          style={{ lineHeight: 1.3, fontWeight: 400 }}
        >
          You&apos;ve built a next-gen machine. <br />
          <span style={{ color: '#ff3b3b' }}>Don&apos;t run it on last-gen ops.</span>
        </motion.h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-[1000px] mx-auto">
          {problems.map((text, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <Card className="flex items-center justify-center text-center min-h-[140px] border border-[#ff3b3b]/50 hover:border-[#ff3b3b]/70">
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
