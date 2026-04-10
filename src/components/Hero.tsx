'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section 
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 2rem',
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
          opacity: 0.4, // Subtle visibility for that "Tech-Noir" look
          zIndex: 0
        }}
      >
        <source src="/Farhand website.mp4" type="video/mp4" />
      </video>

      {/* Content Overlay */}
      <div style={{ zIndex: 1, position: 'relative' }}>
        <motion.div style={{ y: y1, opacity }} transition={{ duration: 0.8 }}>
          <h1 
            style={{ 
              fontSize: 'clamp(3rem, 10vw, 8rem)', 
              lineHeight: 0.9, 
              marginBottom: '2rem',
              maxWidth: '1200px',
              textShadow: '0 0 20px rgba(0,0,0,0.5)'
            }}
          >
            FARHAND: YOUR FIELD SERVICE PARTNER
          </h1>
        </motion.div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{
            maxWidth: '800px',
            fontSize: 'clamp(1rem, 2vw, 1.5rem)',
            color: 'var(--secondary)',
            textTransform: 'uppercase',
            fontWeight: 600,
            marginBottom: '3rem',
            letterSpacing: '0.05em'
          }}
        >
          OUR AI-GUIDED TECHNICIANS INSTALL & SERVICE YOUR ROBOTS & MACHINERY AT YOUR CLIENT SITES.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05, background: '#fff', color: '#000' }}
          whileTap={{ scale: 0.95 }}
          style={{
            border: '1px solid #fff',
            padding: '1rem 2.5rem',
            fontSize: '1rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            transition: 'background 0.3s, color 0.3s',
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(5px)'
          }}
        >
          Deploy smarter
        </motion.button>
      </div>

      {/* Background decoration */}
      <motion.div 
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1px',
          height: '100px',
          background: 'linear-gradient(to bottom, #fff, transparent)',
          opacity: 0.5,
          zIndex: 1
        }}
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />
    </section>
  );
}
