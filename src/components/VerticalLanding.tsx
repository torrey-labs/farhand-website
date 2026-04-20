'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navigation from './Navigation';
import Footer from './Footer';
import FAQSection from './FAQSection';
import { Button } from '@/components/ui/button';
import {
  PainPointGrid,
  StatsRow,
  StepsList,
} from './sections';

export interface VerticalPageProps {
  machineType: string;
  headline: string;
  subheadline: string;
  painPoints: string[];
  howItWorks: string[];
  faqs: { q: string; a: string }[];
  stats?: { value: string; label: string }[];
}

const ease = [0.19, 1, 0.22, 1] as const;

export default function VerticalLanding({
  machineType,
  headline,
  subheadline,
  painPoints,
  howItWorks,
  faqs,
  stats,
}: VerticalPageProps) {
  return (
    <main className="bg-background min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="min-h-[70vh] flex flex-col justify-center items-center text-center pt-24 md:pt-32 lg:pt-40 pb-12 md:pb-16 lg:pb-20">
        <div className="container max-w-[900px]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="text-base text-accent mb-6 font-medium tracking-wider uppercase"
          >
            {machineType} Field Service
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease }}
            className="mb-6"
          >
            {headline}
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1, ease }}
            className="max-w-[750px] mx-auto mb-10 font-normal"
          >
            {subheadline}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Button asChild size="lg">
              <a href="#schedule">Get started</a>
            </Button>
          </motion.div>
        </div>
      </section>

      <PainPointGrid title="Sound familiar?" items={painPoints} />

      {stats && stats.length > 0 && <StatsRow stats={stats} />}

      <StepsList
        title="Farhand Relay™"
        subtitle="Our AI platform that becomes your senior Field Service Engineer."
        steps={howItWorks}
      />

      <FAQSection faqs={faqs} />

      <Footer />
    </main>
  );
}
