'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Monitor,
  Headphones,
  ScrollText,
  Plug,
  Eye,
} from 'lucide-react';

const CAPS = [
  {
    icon: FileText,
    title: 'AI-generated SOPs',
    desc: 'Upload messy docs. Get visual SOPs and training materials.',
  },
  {
    icon: Monitor,
    title: 'Autonomous diagnostics',
    desc: 'SSHs into your robot. Reads logs. Troubleshoots.',
  },
  {
    icon: Headphones,
    title: 'Contextual escalation',
    desc: 'Remote → field → your engineers. Every handoff carries full context.',
  },
  {
    icon: ScrollText,
    title: 'Service reports',
    desc: 'Every interaction documented. Every job closed out.',
  },
  {
    icon: Plug,
    title: 'Integrations',
    desc: 'Slack, Jira, Zendesk, Salesforce, GitHub, AWS CloudWatch, and more.',
  },
  {
    icon: Eye,
    title: 'Closed-loop learning',
    desc: 'Every field issue feeds back. Diagnostics improve over time.',
  },
];

export default function RelayCapabilities() {
  return (
    <section className="py-20 md:py-28 border-t border-border">
      <div className="container max-w-[1100px]">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-12 md:mb-16 font-light text-center"
        >
          What Relay does.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {CAPS.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: (i % 3) * 0.08, duration: 0.5 }}
                className="p-6 md:p-7 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-accent/40 hover:bg-white/[0.04] transition-colors"
              >
                <div className="w-10 h-10 rounded-full border border-accent/50 flex items-center justify-center text-accent mb-5">
                  <Icon size={18} strokeWidth={1.8} />
                </div>
                <h3
                  className="text-foreground mb-2"
                  style={{ fontSize: 'clamp(1.125rem, 2vw, 1.25rem)', fontWeight: 500 }}
                >
                  {cap.title}
                </h3>
                <p className="text-light-gray leading-relaxed text-sm md:text-base">
                  {cap.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
