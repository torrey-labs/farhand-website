'use client';

import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    title: "Learns",
    desc: "your documentation"
  },
  {
    title: "Guides",
    desc: "technicians during repairs"
  },
  {
    title: "Improves",
    desc: "by text and voice debriefs"
  }
];

export default function Relay() {
  return (
    <section className="section-padding" style={{ background: '#050505', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        
        {/* The Solution Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ marginBottom: '10rem' }}
        >
          <p style={{ fontSize: '18px', color: 'var(--light-gray)', marginBottom: '1.5rem', fontWeight: 400 }}>
            There's a <span className="text-accent" style={{ fontWeight: 600 }}>better</span> model
          </p>
          <h3 style={{ maxWidth: '850px', margin: '0 auto 1.5rem', fontWeight: 300, lineHeight: 1.45 }}>
            On-demand technicians guided by AI to service your machines like your own guys
          </h3>
          <p style={{ fontSize: '18px', color: 'var(--light-gray)', opacity: 0.8 }}>
            Every zip code in the US
          </p>
        </motion.div>

        {/* Farhand Relay Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          style={{ paddingBottom: '4rem' }}
        >
          <h3 style={{ fontSize: '38px', marginBottom: '1rem', fontWeight: 300 }}>
            Farhand Relay™
          </h3>
          <p style={{ fontSize: '18px', fontWeight: 300, color: 'var(--light-gray)', marginBottom: '6rem', opacity: 0.7 }}>
            Our AI platform that becomes your senior technician.
          </p>

          <div className="grid-3" style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'left' }}>
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 1, ease: [0.19, 1, 0.22, 1] }}
                viewport={{ once: true }}
                className="card-glass"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  minHeight: '180px'
                }}
              >
                <p style={{ fontSize: '22px', fontWeight: 500, color: 'var(--foreground)', marginBottom: '0.8rem' }}>
                  {step.title}
                </p>
                <p style={{ fontSize: '16px', color: 'var(--light-gray)', margin: 0, lineHeight: 1.5 }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
