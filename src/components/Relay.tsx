'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, MapPin, BarChart } from 'lucide-react';

const steps = [
  {
    title: "Learns",
    desc: "your documentation",
    icon: <Brain size={28} className="text-accent" />
  },
  {
    title: "Guides",
    desc: "technicians during repairs",
    icon: <MapPin size={28} className="text-accent" />
  },
  {
    title: "Improves",
    desc: "by text and voice debriefs",
    icon: <BarChart size={28} className="text-accent" />
  }
];

export default function Relay() {
  return (
    <section id="relay" className="section-padding" style={{ background: '#050505', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        
        {/* The Solution Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ marginBottom: 'clamp(5rem, 15vw, 10rem)' }}
        >
          <p style={{ fontSize: 'clamp(16px, 2vw, 18px)', color: 'var(--light-gray)', marginBottom: '1.5rem', fontWeight: 400 }}>
            There's a <span className="text-accent" style={{ fontWeight: 600 }}>better</span> model
          </p>
          <h3 style={{ maxWidth: '850px', margin: '0 auto 1.5rem', fontWeight: 300, lineHeight: 1.45 }}>
            On-demand technicians guided by AI to service your machines like your own guys
          </h3>
          <p style={{ fontSize: 'clamp(16px, 2vw, 18px)', color: 'var(--light-gray)', opacity: 0.8 }}>
            Every zip code in the US
          </p>
        </motion.div>

        {/* Farhand Relay Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          style={{ paddingBottom: '2rem' }}
        >
          <h3 style={{ fontSize: 'clamp(28px, 5vw, 38px)', marginBottom: '1rem', fontWeight: 300 }}>
            Farhand Relay™
          </h3>
          <p style={{ fontSize: 'clamp(16px, 2vw, 18px)', fontWeight: 300, color: 'var(--light-gray)', marginBottom: 'clamp(3rem, 10vw, 6rem)', opacity: 0.7 }}>
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
                  minHeight: '200px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ marginBottom: '1.5rem' }}>{step.icon}</div>
                <p style={{ fontSize: 'clamp(20px, 3vw, 22px)', fontWeight: 500, color: 'var(--foreground)', marginBottom: '0.8rem' }}>
                  {step.title}
                </p>
                <p style={{ fontSize: 'clamp(15px, 2vw, 16px)', color: 'var(--light-gray)', margin: 0, lineHeight: 1.5 }}>
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
