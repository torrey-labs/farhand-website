'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -60]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section 
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 1.5rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: '#000'
      }}
    >
      {/* Video Background with exact opacity from original */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.3, 
          zIndex: 0
        }}
      >
        <source src="/Farhand website.mp4" type="video/mp4" />
      </video>

      {/* Content Overlay */}
      <div style={{ zIndex: 1, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.div style={{ y: y1, opacity }} transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}>
          <h1 style={{ 
            marginBottom: '1.5rem', 
            maxWidth: '1000px', 
            textShadow: '0 4px 30px rgba(0,0,0,0.9)',
            fontWeight: 400
          }}>
            Your field service partner
          </h1>
        </motion.div>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          style={{
            maxWidth: '850px',
            marginBottom: '3.5rem',
            textShadow: '0 4px 20px rgba(0,0,0,0.8)',
            color: 'var(--light-gray)',
            fontWeight: 400
          }}
        >
          Our AI-guided technicians install & service your robots & machinery at your client sites.
        </motion.h2>

        <motion.a
          href="#schedule"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="btn-primary"
        >
          Deploy smarter
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          width: '1px',
          height: '40px',
          background: 'linear-gradient(to bottom, var(--accent-green), transparent)',
          opacity: 0.6
        }}
      />
    </section>
  );
}
