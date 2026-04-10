'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer 
      style={{
        padding: '10rem 2rem 4rem',
        background: '#000',
        color: '#fff',
        textAlign: 'center'
      }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          style={{ marginBottom: '8rem' }}
        >
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', marginBottom: '3rem', lineHeight: 1 }}>
            YOU DON’T NEED A <br/> FIELD SUPPORT TEAM. <br/> YOU NEED FIELD SERVICE DONE.
          </h2>
          
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.a
              href="mailto:aaryan@farhand.live"
              whileHover={{ scale: 1.05 }}
              style={{
                background: '#fff',
                color: '#000',
                padding: '1.25rem 3rem',
                fontSize: '1.125rem',
                fontWeight: 800,
                textTransform: 'uppercase'
              }}
            >
              Email Us
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              style={{
                border: '1px solid #fff',
                color: '#fff',
                padding: '1.25rem 3rem',
                fontSize: '1.125rem',
                fontWeight: 800,
                textTransform: 'uppercase'
              }}
            >
              Schedule a Call
            </motion.button>
          </div>
        </motion.div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-end',
          paddingTop: '4rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          flexWrap: 'wrap',
          gap: '2rem',
          textAlign: 'left'
        }}>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1rem' }}>FARHAND</div>
            <p style={{ color: 'var(--secondary)', textTransform: 'uppercase', fontWeight: 600, maxWidth: '300px' }}>
              Designed by SF-based roboticists. <br/> For robots out in the field.
            </p>
          </div>
          <div style={{ color: 'var(--secondary)', textTransform: 'uppercase', fontWeight: 600, fontSize: '0.875rem' }}>
            © 2026 FARHAND INC. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
}
