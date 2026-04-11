'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navigation from './Navigation';
import Footer from './Footer';

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
    <main style={{ background: '#000', minHeight: '100vh' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navigation />

      {/* Hero */}
      <section style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 'clamp(6rem, 15vw, 10rem) 0 clamp(3rem, 8vw, 5rem)',
      }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            style={{ fontSize: '16px', color: 'var(--accent-green)', marginBottom: '1.5rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}
          >
            {machineType} Field Service
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease }}
            style={{ marginBottom: '1.5rem' }}
          >
            {headline}
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1, ease }}
            style={{ maxWidth: '750px', margin: '0 auto 2.5rem', fontWeight: 400 }}
          >
            {subheadline}
          </motion.h2>
          <motion.a
            href="#schedule"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary"
          >
            Get started
          </motion.a>
        </div>
      </section>

      {/* Pain Points */}
      <section className="section-padding" style={{ background: '#000' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease }}
            viewport={{ once: true }}
            style={{ marginBottom: 'clamp(2rem, 6vw, 4rem)', fontWeight: 400, fontSize: 'clamp(1.5rem, 4vw, 32px)' }}
          >
            Sound familiar?
          </motion.h3>
          <div className="grid-3" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {painPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.8, ease }}
                viewport={{ once: true }}
                className="card-glass"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: '140px' }}
              >
                <p style={{ fontSize: 'clamp(18px, 2.5vw, 22px)', fontWeight: 500, color: 'var(--foreground)', margin: 0, lineHeight: 1.4 }}>
                  {point}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      {stats && stats.length > 0 && (
        <section style={{ padding: 'clamp(2rem, 5vw, 4rem) 0' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(2rem, 5vw, 4rem)', flexWrap: 'wrap' }}>
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.8, ease }}
                  viewport={{ once: true }}
                  style={{ textAlign: 'center', minWidth: '150px' }}
                >
                  <p style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 300, color: 'var(--accent-green)', marginBottom: '0.5rem', lineHeight: 1 }}>
                    {stat.value}
                  </p>
                  <p style={{ fontSize: '15px', color: 'var(--light-gray)', opacity: 0.8, margin: 0 }}>
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="section-padding" style={{ background: '#000' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease }}
            viewport={{ once: true }}
            style={{ marginBottom: '1rem', fontWeight: 300 }}
          >
            Farhand <strong>Relay</strong>&#8482;
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            style={{ fontSize: '18px', color: 'var(--light-gray)', opacity: 0.8, marginBottom: 'clamp(2rem, 6vw, 4rem)', maxWidth: '600px', margin: '0 auto clamp(2rem, 6vw, 4rem)' }}
          >
            Our AI platform that becomes your senior technician.
          </motion.p>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
            {howItWorks.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15, duration: 0.8, ease }}
                viewport={{ once: true }}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1.5rem',
                  padding: '1.5rem 0',
                  borderBottom: i < howItWorks.length - 1 ? '1px solid var(--border-color)' : 'none',
                }}
              >
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--accent-green)', minWidth: '28px', paddingTop: '2px' }}>
                  0{i + 1}
                </span>
                <p style={{ fontSize: 'clamp(17px, 2vw, 20px)', color: 'var(--foreground)', margin: 0, lineHeight: 1.5 }}>
                  {step}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding" style={{ background: '#000' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 6vw, 4rem)', fontWeight: 400 }}
          >
            Frequently asked questions
          </motion.h3>
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8, ease }}
              viewport={{ once: true }}
              style={{
                padding: '1.5rem 0',
                borderBottom: '1px solid var(--border-color)',
              }}
            >
              <h4 style={{ fontSize: 'clamp(17px, 2vw, 20px)', fontWeight: 500, color: 'var(--foreground)', marginBottom: '0.75rem' }}>
                {faq.q}
              </h4>
              <p style={{ fontSize: '16px', color: 'var(--light-gray)', lineHeight: 1.6, margin: 0, opacity: 0.9 }}>
                {faq.a}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
