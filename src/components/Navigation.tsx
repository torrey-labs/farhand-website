'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Navigation() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '1.2rem 0',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
        background: 'rgba(0,0,0,0.5)'
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src="/logo-w-type-dark.png" 
            alt="Farhand Logo" 
            style={{ height: '28px', filter: 'invert(1)', objectFit: 'contain' }} 
          />
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <motion.a
            href="#schedule"
            whileHover={{ scale: 1.05 }}
            style={{
              color: 'var(--accent-green)',
              fontSize: '16px',
              fontWeight: 500,
              textDecoration: 'none',
              letterSpacing: '-0.01em'
            }}
          >
            Schedule a Call
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
}
