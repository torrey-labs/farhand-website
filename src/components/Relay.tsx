'use client';

import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    title: "Learns",
    desc: "your documentation",
    icon: "🧠"
  },
  {
    title: "Guides",
    desc: "technicians during repairs",
    icon: "🗺️"
  },
  {
    title: "Improves",
    desc: "by text and voice debriefs",
    icon: "📈"
  }
];

export default function Relay() {
  return (
    <section 
      style={{
        padding: '10rem 2rem',
        background: '#050505',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}
    >
      <div className="container" style={{ textAlign: 'center' }}>
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ 
            fontSize: 'clamp(3rem, 8vw, 6rem)', 
            marginBottom: '1rem',
            color: '#fff'
          }}
        >
          FARHAND RELAY™
        </motion.h2>
        
        <p style={{ 
          fontSize: '1.25rem', 
          color: 'var(--secondary)', 
          textTransform: 'uppercase', 
          marginBottom: '6rem',
          letterSpacing: '0.2em'
        }}>
          Every zip code in the US.
        </p>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '4rem',
          textAlign: 'left'
        }}>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.3, duration: 0.8 }}
              viewport={{ once: true }}
              style={{
                position: 'relative',
                padding: '3rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(255, 255, 255, 0.01)'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '2rem' }}>{step.icon}</div>
              <h3 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{step.title}</h3>
              <p style={{ fontSize: '1.125rem', color: 'var(--secondary)', textTransform: 'uppercase', fontWeight: 600 }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
