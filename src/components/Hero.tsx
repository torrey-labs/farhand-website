'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -60]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="min-h-[85svh] md:min-h-screen flex flex-col justify-center items-center p-0 text-center relative overflow-hidden bg-background">
      {/* Video Background — poster paints instantly; metadata-only preload keeps LCP fast */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        poster="/opengraph-image"
        className="absolute inset-0 w-full h-full object-cover opacity-100 z-0"
      >
        <source src="/Farhand website.mp4" type="video/mp4" />
      </video>

      {/* Bottom fade to black */}
      <div className="absolute inset-x-0 bottom-0 h-48 z-0 bg-gradient-to-b from-transparent to-black pointer-events-none" />

      {/* Content Overlay */}
      <div className="container z-[1] relative flex flex-col items-center">
        <motion.div style={{ y: y1, opacity }} transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}>
          <h1
            className="mb-6 max-w-[1000px]"
            style={{
              textShadow: '0 4px 30px rgba(0,0,0,0.9)',
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontWeight: 400,
              letterSpacing: '-0.025em',
            }}
          >
            Your field service partner
          </h1>
        </motion.div>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="max-w-[850px] mb-8 md:mb-12 text-light-gray font-normal"
          style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}
        >
          Our AI-guided service engineers install & service your robots & machinery at your client sites.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Button asChild size="lg">
            <a href="#schedule">Deploy smarter</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
