'use client';

import React from 'react';
import { motion } from 'framer-motion';

const problems = [
  "Travelling or regional technicians don’t scale",
  "Outsourced service contracts are slow and expensive",
  "Only your senior guy knows some repairs"
];

export default function Problem() {
  return (
    <section 
      style={{
        padding: '10rem 2rem',
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <div className="container" style={{ textAlign: 'center' }}>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ 
            fontSize: 'clamp(2rem, 5vw, 4rem)', 
            marginBottom: '6rem',
            lineHeight: 1.1,
            color: '#fff'
          }}
        >
          YOU’VE BUILT A NEXT-GEN MACHINE. <br/>
          DON’T RUN IT ON LAST-GEN OPS.
        </motion.h2>

        <div style={{ display: 'grid', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
          {problems.map((problem, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '2rem 3rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '2rem',
                textAlign: 'left'
              }}
            >
              <span style={{ fontSize: '2rem', fontWeight: 900, opacity: 0.2 }}>0{i+1}</span>
              <p style={{ fontSize: '1.25rem', fontWeight: 700, textTransform: 'uppercase' }}>
                {problem}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
