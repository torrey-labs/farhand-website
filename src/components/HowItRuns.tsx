'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Search, Truck, Wrench, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';

const ease = [0.19, 1, 0.22, 1] as const;

const steps = [
  {
    title: 'Call',
    body: 'Tell us the machine, the site, the urgency.',
    icon: <Phone size={20} />,
  },
  {
    title: 'Match',
    body: 'Closest hub. Right brand certs. Real availability.',
    icon: <Search size={20} />,
  },
  {
    title: 'Dispatch',
    body: 'FSE on-site within 48 hours. Often same-day in dense markets.',
    icon: <Truck size={20} />,
  },
  {
    title: 'Resolve',
    body: 'AI-guided diagnosis. Real-time remote backup.',
    icon: <Wrench size={20} />,
  },
  {
    title: 'Debrief',
    body: 'Every fix improves the AI. Your next job is smoother.',
    icon: <Sparkles size={20} />,
  },
];

export default function HowItRuns() {
  return (
    <section className="bg-background py-12 md:py-20 lg:py-28">
      <div className="container max-w-[1200px]">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-2xl md:text-3xl lg:text-[34px] font-light text-center mb-10 md:mb-14 m-0"
        >
          How a job runs
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.7, ease }}
              viewport={{ once: true, margin: '-50px' }}
            >
              <Card className="h-full flex flex-col gap-3 p-5 md:p-6 lg:p-7">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full border border-accent flex items-center justify-center text-accent shrink-0">
                    {step.icon}
                  </div>
                  <span className="text-light-gray/60 text-xs tracking-[0.2em] uppercase">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h4 className="text-lg md:text-xl font-medium text-foreground m-0">
                  {step.title}
                </h4>
                <p className="text-sm md:text-base text-light-gray/85 m-0 leading-relaxed">
                  {step.body}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-10 md:mt-14 text-center text-base md:text-lg text-light-gray/85"
        >
          All at a per-job rate.{' '}
          <strong className="font-medium text-foreground">
            No retainers, no minimums.
          </strong>
        </motion.p>
      </div>
    </section>
  );
}
