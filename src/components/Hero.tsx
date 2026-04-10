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
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: '#000'
      }}
    >
      {/* Video Background */}
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
      <div className="container" style={{ zIndex: 1, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
            marginBottom: '3rem',
            textShadow: '0 4px 20px rgba(0,0,0,0.8)',
            color: 'var(--light-gray)',
            fontWeight: 400
          }}
        >
          Our AI-guided technicians install & service your robots & machinery at your client sites.
        </motion.h2>

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <motion.a
            href="#schedule"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary"
          >
            Deploy smarter
          </motion.a>
          
          <motion.a
            href="#relay"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            whileHover={{ background: 'rgba(255,255,255,0.05)', borderColor: '#fff' }}
            style={{
              padding: '0.8rem 2.2rem',
              borderRadius: '9999px',
              border: '1px solid rgba(255,255,255,0.2)',
              fontSize: '18px',
              fontWeight: 500,
              color: '#fff',
              transition: 'all 0.3s'
            }}
          >
            Explore Relay™
          </motion.a>
        </div>
      </div>

      {/* Product Placeholder Image */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 0.2, y: 0 }}
        transition={{ delay: 0.8, duration: 1.2 }}
        style={{
          position: 'absolute',
          bottom: '-10%',
          width: '80%',
          maxWidth: '1200px',
          height: '400px',
          background: 'linear-gradient(180deg, rgba(26, 255, 103, 0.1) 0%, transparent 100%)',
          border: '1px solid rgba(26, 255, 103, 0.2)',
          borderBottom: 'none',
          borderRadius: '40px 40px 0 0',
          zIndex: 0,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5em', opacity: 0.5, marginBottom: '1rem' }}>
            Farhand Relay Platform
          </div>
          <div style={{ width: '200px', height: '1px', background: 'var(--accent-green)', opacity: 0.3, margin: '0 auto' }}></div>
        </div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          width: '1px',
          height: '40px',
          background: 'linear-gradient(to bottom, var(--accent-green), transparent)',
          opacity: 0.4,
          zIndex: 1
        }}
      />
    </section>
  );
}
