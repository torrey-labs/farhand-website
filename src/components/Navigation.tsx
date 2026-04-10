'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Navigation() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: '1.5rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <Link href="/" style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '0.1em' }}>
        FARHAND
      </Link>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          background: '#fff',
          color: '#000',
          padding: '0.75rem 1.5rem',
          borderRadius: '2px',
          fontWeight: 700,
          fontSize: '0.875rem',
          textTransform: 'uppercase'
        }}
      >
        Schedule a Call
      </motion.button>
    </motion.nav>
  );
}
