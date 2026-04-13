'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navigation from './Navigation';
import Footer from './Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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

export default function VerticalLanding({ machineType, headline, subheadline, painPoints, howItWorks, faqs, stats }: VerticalPageProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": { "@type": "Answer", "text": faq.a },
    })),
  };

  return (
    <main className="bg-background min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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

      {/* Pain Points */}
      <section className="bg-background py-12 md:py-16 lg:py-24">
        <div className="container text-center">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease }}
            viewport={{ once: true }}
            className="mb-8 md:mb-12 lg:mb-16 font-normal text-2xl md:text-3xl lg:text-[32px]"
          >
            Sound familiar?
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-[1000px] mx-auto">
            {painPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.8, ease }}
                viewport={{ once: true }}
              >
                <Card className="flex items-center justify-center text-center min-h-[140px]">
                  <p className="text-lg md:text-xl font-medium text-foreground m-0 leading-snug">
                    {point}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      {stats && stats.length > 0 && (
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
                  <p className="text-[15px] text-light-gray/80 m-0">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="bg-background py-12 md:py-16 lg:py-24">
        <div className="container text-center">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease }}
            viewport={{ once: true }}
            className="mb-4 font-light"
          >
            Farhand <strong>Relay</strong>&#8482;
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-lg text-light-gray/80 mb-8 md:mb-12 lg:mb-16 max-w-[600px] mx-auto"
          >
            Our AI platform that becomes your senior technician.
          </motion.p>
          <div className="max-w-[800px] mx-auto text-left">
            {howItWorks.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15, duration: 0.8, ease }}
                viewport={{ once: true }}
                className={`flex items-start gap-6 py-6 ${i < howItWorks.length - 1 ? 'border-b border-white/10' : ''}`}
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

      {/* FAQs */}
      <section className="bg-background py-12 md:py-16 lg:py-24">
        <div className="container max-w-[800px]">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12 lg:mb-16 font-normal"
          >
            Frequently asked questions
          </motion.h3>
          <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-lg sm:text-xl">{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Footer />
    </main>
  );
}
