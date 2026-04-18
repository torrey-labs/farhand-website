'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

function useCountUp(target: number, start: boolean, duration = 1400) {
  const [value, setValue] = useState(0);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const tick = (t: number) => {
      if (startTime.current === null) startTime.current = t;
      const elapsed = t - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);

  return value;
}

export default function CoverageMap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const count = useCountUp(2100, inView);

  return (
    <section
      ref={ref}
      className="bg-background py-16 md:py-24 border-t border-border overflow-hidden"
    >
      <div className="container">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mb-3 md:mb-4 font-light text-center"
        >
          Robots everywhere. <em className="text-accent italic not-italic">People everywhere.</em>
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-light-gray/80 mb-12 md:mb-16 text-center"
        >
          Every US zip code.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-10 md:gap-16 items-center max-w-[1200px] mx-auto">
          {/* Stat */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left md:pl-4 lg:pl-8 shrink-0"
          >
            <div
              className="text-accent font-light tracking-tight leading-none"
              style={{
                fontSize: 'clamp(4rem, 12vw, 7.5rem)',
                fontFeatureSettings: '"tnum"',
              }}
            >
              {count.toLocaleString('en-US')}+
            </div>
            <div className="mt-3 md:mt-4 text-light-gray text-sm md:text-base uppercase tracking-[0.15em]">
              Field techs
              <br />
              across the US
            </div>
          </motion.div>

          {/* Map — static US outline */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative w-full"
            style={{ aspectRatio: '959 / 593' }}
          >
            <img
              src="/us-outline.svg"
              alt="US coverage map"
              className="absolute inset-0 w-full h-full object-contain"
              style={{ filter: 'invert(1) opacity(0.35)' }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
