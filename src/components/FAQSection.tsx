'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export interface FAQItem {
  q: string;
  a: string;
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  faqs: FAQItem[];
  includeSchema?: boolean;
}

const ease = [0.19, 1, 0.22, 1] as const;

export default function FAQSection({
  title = 'Frequently asked questions',
  subtitle,
  faqs,
  includeSchema = true,
}: FAQSectionProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <section className="bg-background py-12 md:py-16 lg:py-24">
      {includeSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}

      <div className="container max-w-[800px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12 md:mb-14 lg:mb-16"
        >
          <h3 className={subtitle ? 'mb-4' : ''} style={{ fontWeight: 400 }}>
            {title}
          </h3>
          {subtitle && (
            <p className="text-light-gray/80 max-w-[560px] mx-auto text-base md:text-lg">
              {subtitle}
            </p>
          )}
        </motion.div>

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
  );
}
