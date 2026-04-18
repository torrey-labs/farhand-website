'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';

type Node = {
  label: string;
  sublabel?: string;
  x: number;  // normalized 0-1 of width (600)
  y: number;  // normalized 0-1 of height (400)
};

const NODES: Node[] = [
  { label: 'Your Robot',      sublabel: 'SSH', x: 0.12, y: 0.18 },
  { label: 'Field Tech',                      x: 0.12, y: 0.82 },
  { label: 'End User',                        x: 0.88, y: 0.18 },
  { label: 'Your Engineers',                  x: 0.88, y: 0.82 },
];

const W = 600;
const H = 400;
const CENTER = { x: W / 2, y: H / 2 };

export default function Relay() {
  const reduce = useReducedMotion();

  return (
    <section id="relay" className="bg-background py-16 md:py-24 border-t border-border">
      <div className="container text-center">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="font-light mb-3 md:mb-4"
        >
          Your <em className="text-accent italic not-italic">senior engineer</em>, on every robot.
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-light-gray/80 mb-12 md:mb-16"
        >
          Farhand <span className="text-foreground font-medium">Relay</span>™ — the AI agent that learns your robot, guides every repair, logs every action.
        </motion.p>

        {/* Animated diagram */}
        <div className="relative mx-auto max-w-[780px]">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Glow filter */}
            <defs>
              <filter id="relay-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <radialGradient id="relay-gradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#1aff67" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#1aff67" stopOpacity="0.3" />
              </radialGradient>
            </defs>

            {/* Connecting lines (draw on view) */}
            {NODES.map((node, i) => {
              const nx = node.x * W;
              const ny = node.y * H;
              return (
                <motion.line
                  key={`line-${i}`}
                  x1={CENTER.x}
                  y1={CENTER.y}
                  x2={nx}
                  y2={ny}
                  stroke="#1aff67"
                  strokeWidth={1.5}
                  strokeOpacity={0.5}
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: 0.4 + i * 0.15, duration: 0.8, ease: 'easeOut' }}
                />
              );
            })}

            {/* Outer nodes */}
            {NODES.map((node, i) => {
              const nx = node.x * W;
              const ny = node.y * H;
              return (
                <motion.g
                  key={`node-${i}`}
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: 'backOut' }}
                  style={{ transformOrigin: `${nx}px ${ny}px` }}
                >
                  <rect
                    x={nx - 70}
                    y={ny - 22}
                    width={140}
                    height={44}
                    rx={22}
                    fill="rgba(26, 255, 103, 0.06)"
                    stroke="#1aff67"
                    strokeWidth={1}
                    strokeOpacity={0.5}
                  />
                  <text
                    x={nx}
                    y={ny + 5}
                    textAnchor="middle"
                    fill="#f5f5f5"
                    fontSize="15"
                    fontFamily="var(--font-sans)"
                    fontWeight="500"
                  >
                    {node.label}
                  </text>
                </motion.g>
              );
            })}

            {/* Central Relay node */}
            <motion.g
              initial={{ opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 1.2, duration: 0.6, ease: 'backOut' }}
              style={{ transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}
            >
              {/* Outer pulse rings (CSS-driven for persistent looping) */}
              {!reduce && (
                <>
                  <circle cx={CENTER.x} cy={CENTER.y} r={50} fill="none" stroke="#1aff67" strokeWidth={1} opacity={0.6}>
                    <animate attributeName="r" values="50;90;50" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0;0.6" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={CENTER.x} cy={CENTER.y} r={50} fill="none" stroke="#1aff67" strokeWidth={1} opacity={0.4}>
                    <animate attributeName="r" values="50;110;50" dur="3s" begin="1s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" begin="1s" repeatCount="indefinite" />
                  </circle>
                </>
              )}

              {/* Solid center */}
              <circle
                cx={CENTER.x}
                cy={CENTER.y}
                r={52}
                fill="url(#relay-gradient)"
                filter="url(#relay-glow)"
              />
              <circle
                cx={CENTER.x}
                cy={CENTER.y}
                r={46}
                fill="#000"
                stroke="#1aff67"
                strokeWidth={1.5}
              />
              <text
                x={CENTER.x}
                y={CENTER.y - 3}
                textAnchor="middle"
                fill="#1aff67"
                fontSize="20"
                fontFamily="var(--font-sans)"
                fontWeight="600"
              >
                Relay
              </text>
              <text
                x={CENTER.x}
                y={CENTER.y + 17}
                textAnchor="middle"
                fill="#f5f5f5"
                fontSize="11"
                fontFamily="var(--font-sans)"
                fontWeight="400"
                opacity={0.6}
              >
                AI Agent
              </text>
            </motion.g>
          </svg>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 md:mt-16"
        >
          <Link
            href="/relay"
            className="inline-flex items-center gap-2 text-accent text-base md:text-lg font-medium hover:opacity-80 transition-opacity"
          >
            See how Relay works
            <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
