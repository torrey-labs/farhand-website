'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// All coordinates in 959 × 593 viewBox (matches public/us-outline.svg).
const TECH_DOTS: [number, number][] = [
  // Northeast
  [855, 195], [820, 220], [820, 240], [760, 245], [810, 265], [815, 250],
  [795, 285], [850, 205], [830, 208], [845, 212], [775, 205], [790, 200],
  [795, 195], [775, 230],
  // Midwest
  [620, 240], [690, 220], [650, 280], [700, 260], [720, 235], [680, 280],
  [615, 205], [555, 175], [590, 305], [525, 300], [540, 250], [490, 250],
  [655, 205], [610, 180], [590, 200], [510, 225], [580, 255], [700, 225],
  // South / Southeast
  [720, 385], [810, 530], [775, 510], [790, 490], [790, 455], [765, 335],
  [680, 335], [615, 355], [600, 475], [510, 450], [490, 415], [475, 445],
  [465, 470], [480, 380], [510, 365], [580, 380], [670, 395], [790, 320],
  [735, 340], [720, 340], [780, 395], [760, 420], [730, 460], [650, 445],
  [580, 460],
  // West
  [120, 360], [65, 275], [145, 400], [70, 285], [130, 90], [110, 115],
  [75, 260], [95, 310], [200, 335], [240, 400], [265, 430], [330, 350],
  [275, 245], [380, 295], [230, 180], [215, 100], [390, 310], [125, 95],
  [85, 135], [415, 375], [345, 415],
];

const REMOTE_HUBS: { x: number; y: number; label: string }[] = [
  { x: 120, y: 360, label: 'West' },
  { x: 480, y: 415, label: 'Central' },
  { x: 820, y: 220, label: 'East' },
];

const PM_HUBS: [number, number][] = [
  [820, 220],  // NYC
  [720, 385],  // Atlanta
  [620, 240],  // Chicago
  [490, 415],  // Dallas
  [380, 295],  // Denver
  [120, 360],  // LA
];

type ViewKey = 'techs' | 'remote' | 'pms';

const VIEWS: { key: ViewKey; label: string; stat: string; description: string }[] = [
  { key: 'techs', label: 'Field Techs', stat: '1,700+', description: 'Nationwide' },
  { key: 'remote', label: 'Remote Ops', stat: '24/7', description: 'Always on' },
  { key: 'pms', label: 'Project Managers', stat: 'Every region', description: 'On the ground' },
];

export default function InteractiveCoverageMap() {
  const [view, setView] = useState<ViewKey>('techs');
  const active = VIEWS.find((v) => v.key === view)!;

  return (
    <section className="bg-background py-16 md:py-24 border-t border-border overflow-hidden">
      <div className="container text-center">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mb-3 md:mb-4 font-light"
        >
          Robots everywhere. <em className="text-accent italic not-italic">People everywhere.</em>
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-light-gray/80 mb-10 md:mb-12"
        >
          {active.stat} · {active.description}
        </motion.p>

        {/* Pills */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-14">
          {VIEWS.map((v) => {
            const isActive = view === v.key;
            return (
              <button
                key={v.key}
                onClick={() => setView(v.key)}
                className={
                  'px-5 py-2.5 md:px-6 md:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 border ' +
                  (isActive
                    ? 'bg-accent text-background border-accent'
                    : 'bg-transparent text-light-gray border-white/15 hover:border-white/30')
                }
              >
                {v.label}
              </button>
            );
          })}
        </div>

        {/* Map */}
        <div
          className="relative mx-auto max-w-[1100px]"
          style={{ aspectRatio: '959 / 593' }}
        >
          {/* US outline backdrop */}
          <img
            src="/us-outline.svg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-contain opacity-[0.08]"
            style={{ filter: 'invert(1)' }}
          />

          {/* Dots layer */}
          <svg
            viewBox="0 0 959 593"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <AnimatePresence mode="wait">
              {view === 'techs' && (
                <motion.g key="techs">
                  {TECH_DOTS.map(([x, y], i) => (
                    <motion.circle
                      key={`tech-${i}`}
                      cx={x}
                      cy={y}
                      r={3.5}
                      fill="#1aff67"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.9 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{
                        delay: (i % 20) * 0.02,
                        duration: 0.4,
                        ease: 'easeOut',
                      }}
                      style={{ transformOrigin: `${x}px ${y}px` }}
                    >
                      <animate
                        attributeName="opacity"
                        values="0.9;0.4;0.9"
                        dur={`${2 + (i % 5) * 0.3}s`}
                        begin={`${(i % 10) * 0.2}s`}
                        repeatCount="indefinite"
                      />
                    </motion.circle>
                  ))}
                </motion.g>
              )}

              {view === 'remote' && (
                <motion.g key="remote">
                  {REMOTE_HUBS.map((hub, i) => (
                    <g key={`hub-${i}`}>
                      {/* Outer pulse ring */}
                      <motion.circle
                        cx={hub.x}
                        cy={hub.y}
                        r={10}
                        fill="none"
                        stroke="#1aff67"
                        strokeWidth={1.5}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ delay: i * 0.15, duration: 0.5 }}
                        style={{ transformOrigin: `${hub.x}px ${hub.y}px` }}
                      >
                        <animate
                          attributeName="r"
                          values="10;30;10"
                          dur="3s"
                          begin={`${i * 0.4}s`}
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0.9;0;0.9"
                          dur="3s"
                          begin={`${i * 0.4}s`}
                          repeatCount="indefinite"
                        />
                      </motion.circle>
                      {/* Inner solid dot */}
                      <motion.circle
                        cx={hub.x}
                        cy={hub.y}
                        r={7}
                        fill="#1aff67"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ delay: i * 0.15 + 0.1, duration: 0.4 }}
                        style={{ transformOrigin: `${hub.x}px ${hub.y}px` }}
                      />
                    </g>
                  ))}
                </motion.g>
              )}

              {view === 'pms' && (
                <motion.g key="pms">
                  {PM_HUBS.map(([x, y], i) => (
                    <motion.circle
                      key={`pm-${i}`}
                      cx={x}
                      cy={y}
                      r={6}
                      fill="#1aff67"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{
                        delay: i * 0.08,
                        duration: 0.45,
                        ease: 'backOut',
                      }}
                      style={{ transformOrigin: `${x}px ${y}px` }}
                    >
                      <animate
                        attributeName="opacity"
                        values="1;0.5;1"
                        dur="2.5s"
                        begin={`${i * 0.2}s`}
                        repeatCount="indefinite"
                      />
                    </motion.circle>
                  ))}
                </motion.g>
              )}
            </AnimatePresence>
          </svg>
        </div>
      </div>
    </section>
  );
}
