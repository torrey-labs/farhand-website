'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Coordinates in 959 × 593 viewBox (matches public/us-outline.svg).
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

export default function CoverageMap() {
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
          className="text-light-gray/80 mb-10 md:mb-14"
        >
          Every US zip code. 1,700+ field techs.
        </motion.p>

        <div
          className="relative mx-auto max-w-[1100px]"
          style={{ aspectRatio: '959 / 593' }}
        >
          <img
            src="/us-outline.svg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-contain opacity-[0.08]"
            style={{ filter: 'invert(1)' }}
          />

          <svg
            viewBox="0 0 959 593"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {TECH_DOTS.map(([x, y], i) => (
              <circle
                key={`tech-${i}`}
                cx={x}
                cy={y}
                r={3.5}
                fill="#1aff67"
                opacity={0.9}
              >
                <animate
                  attributeName="opacity"
                  values="0.9;0.4;0.9"
                  dur={`${2 + (i % 5) * 0.3}s`}
                  begin={`${(i % 10) * 0.2}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="r"
                  values="3.5;4.2;3.5"
                  dur={`${2 + (i % 5) * 0.3}s`}
                  begin={`${(i % 10) * 0.2}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}
