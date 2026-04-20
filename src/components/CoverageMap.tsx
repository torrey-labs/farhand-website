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
      className="bg-background py-10 md:py-24 overflow-hidden"
    >
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr] gap-8 md:gap-12 items-center max-w-[900px] mx-auto">
          {/* Stat — fixed column so count-up doesn't reflow the map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left md:pl-2 lg:pl-4"
          >
            <div
              className="text-accent font-light tracking-tight leading-none tabular-nums"
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
                fontFeatureSettings: '"tnum"',
              }}
            >
              {count.toLocaleString('en-US')}+
            </div>
            <div className="mt-2 md:mt-3 text-light-gray text-xs md:text-sm uppercase tracking-[0.15em]">
              Field Service Engineers
              <br />
              across the US
            </div>
          </motion.div>

          {/* Map — world coverage */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative w-full max-w-[520px] mx-auto"
            style={{ aspectRatio: '1024 / 722' }}
          >
            <img
              src="/world-map.avif"
              alt="World coverage map"
              className="absolute inset-0 w-full h-full object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
