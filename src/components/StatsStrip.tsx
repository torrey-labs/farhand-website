'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

type Stat = {
  target: number;
  suffix?: string;
  prefix?: string;
  label: string;
};

const STATS: Stat[] = [
  { target: 1700, suffix: '+', label: 'Field techs' },
  { target: 8000, suffix: '+', label: 'Work orders' },
  { target: 40, suffix: '+', label: 'Countries' },
];

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

function formatNumber(n: number) {
  return n.toLocaleString('en-US');
}

function StatItem({ stat, start, delay }: { stat: Stat; start: boolean; delay: number }) {
  const value = useCountUp(stat.target, start, 1400);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={start ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <div
        className="text-5xl md:text-6xl lg:text-7xl text-accent font-light tracking-tight"
        style={{ fontFeatureSettings: '"tnum"' }}
      >
        {stat.prefix}
        {formatNumber(value)}
        {stat.suffix}
      </div>
      <div className="mt-2 md:mt-3 text-light-gray/80 text-sm md:text-base uppercase tracking-[0.15em]">
        {stat.label}
      </div>
    </motion.div>
  );
}

export default function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="bg-background py-16 md:py-24 border-t border-border"
    >
      <div className="container">
        <div className="grid grid-cols-3 gap-4 md:gap-8 lg:gap-16 max-w-[1000px] mx-auto">
          {STATS.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} start={inView} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
