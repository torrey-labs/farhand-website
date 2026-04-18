'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const W = 800;
const H = 460;
const CENTER = { x: W / 2, y: H / 2 };

type Node = { label: string; x: number; y: number; accent?: 'green' | 'orange' };

const LEFT_X = 120;
const RIGHT_X = W - 120;
const RELAY_CLI = { x: 250, y: H / 2 };
const RELAY_HQ = { x: W - 250, y: H / 2 };

const NODES: Node[] = [
  { label: 'Your Robot',       x: LEFT_X,       y: 90        },
  { label: 'Field Tech',       x: LEFT_X,       y: H - 90    },
  { label: 'Remote Support',   x: LEFT_X + 140, y: H - 60    },
  { label: 'End User',         x: RIGHT_X,      y: 90,        accent: 'orange' },
  { label: 'Your Engineers',   x: RIGHT_X,      y: H - 90    },
];

export default function RelayDiagram() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto max-w-[900px]">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="rd-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="rd-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1aff67" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1aff67" stopOpacity="0.3" />
          </radialGradient>
        </defs>

        {/* Connecting lines */}
        {/* Robot → Relay CLI (dashed SSH) */}
        <motion.line
          x1={LEFT_X + 60} y1={90}
          x2={RELAY_CLI.x - 20} y2={RELAY_CLI.y}
          stroke="#1aff67"
          strokeWidth={1.5}
          strokeOpacity={0.5}
          strokeDasharray="5,5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.4, duration: 0.8 }}
        />
        {/* Relay CLI → center */}
        <motion.line
          x1={RELAY_CLI.x + 20} y1={RELAY_CLI.y}
          x2={CENTER.x - 60} y2={CENTER.y}
          stroke="#1aff67"
          strokeWidth={1.5}
          strokeOpacity={0.5}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.55, duration: 0.8 }}
        />
        {/* Field Tech → center */}
        <motion.line
          x1={LEFT_X + 60} y1={H - 90}
          x2={CENTER.x - 50} y2={CENTER.y + 20}
          stroke="#1aff67"
          strokeWidth={1.5}
          strokeOpacity={0.5}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.7, duration: 0.8 }}
        />
        {/* End User → center (orange, reports) */}
        <motion.line
          x1={RIGHT_X - 60} y1={90}
          x2={CENTER.x + 50} y2={CENTER.y - 20}
          stroke="#ff8a3a"
          strokeWidth={1.5}
          strokeOpacity={0.6}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.85, duration: 0.8 }}
        />
        {/* center → Relay HQ */}
        <motion.line
          x1={CENTER.x + 60} y1={CENTER.y}
          x2={RELAY_HQ.x - 20} y2={RELAY_HQ.y}
          stroke="#1aff67"
          strokeWidth={1.5}
          strokeOpacity={0.5}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 1.0, duration: 0.8 }}
        />
        {/* Relay HQ → Your Engineers */}
        <motion.line
          x1={RELAY_HQ.x + 20} y1={RELAY_HQ.y}
          x2={RIGHT_X - 60} y2={H - 90}
          stroke="#1aff67"
          strokeWidth={1.5}
          strokeOpacity={0.5}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 1.15, duration: 0.8 }}
        />

        {/* Edge labels */}
        <text x={(LEFT_X + RELAY_CLI.x) / 2} y={90 - 10} textAnchor="middle" fill="#888" fontSize="11" fontFamily="var(--font-sans)">SSH</text>
        <text x={(CENTER.x + RIGHT_X) / 2} y={90 - 10} textAnchor="middle" fill="#ff8a3a" fontSize="11" fontFamily="var(--font-sans)">reports</text>
        <text x={(CENTER.x + RELAY_HQ.x) / 2} y={CENTER.y - 10} textAnchor="middle" fill="#888" fontSize="11" fontFamily="var(--font-sans)">escalates</text>

        {/* Relay CLI small node */}
        <motion.g
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{ transformOrigin: `${RELAY_CLI.x}px ${RELAY_CLI.y}px` }}
        >
          <circle cx={RELAY_CLI.x} cy={RELAY_CLI.y} r={22} fill="rgba(26, 255, 103, 0.1)" stroke="#1aff67" strokeOpacity={0.5} />
          <text x={RELAY_CLI.x} y={RELAY_CLI.y + 5} textAnchor="middle" fill="#f5f5f5" fontSize="14" fontFamily="var(--font-sans)">›_</text>
          <text x={RELAY_CLI.x} y={RELAY_CLI.y + 42} textAnchor="middle" fill="#888" fontSize="10" fontFamily="var(--font-sans)">Relay CLI</text>
        </motion.g>

        {/* Relay HQ small node */}
        <motion.g
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.9, duration: 0.5 }}
          style={{ transformOrigin: `${RELAY_HQ.x}px ${RELAY_HQ.y}px` }}
        >
          <circle cx={RELAY_HQ.x} cy={RELAY_HQ.y} r={22} fill="rgba(26, 255, 103, 0.1)" stroke="#1aff67" strokeOpacity={0.5} />
          <text x={RELAY_HQ.x} y={RELAY_HQ.y + 5} textAnchor="middle" fill="#f5f5f5" fontSize="14" fontFamily="var(--font-sans)">⌂</text>
          <text x={RELAY_HQ.x} y={RELAY_HQ.y + 42} textAnchor="middle" fill="#888" fontSize="10" fontFamily="var(--font-sans)">Relay HQ</text>
        </motion.g>

        {/* Outer nodes */}
        {NODES.map((node, i) => {
          const stroke = node.accent === 'orange' ? '#ff8a3a' : '#1aff67';
          const fill = node.accent === 'orange' ? 'rgba(255, 138, 58, 0.06)' : 'rgba(26, 255, 103, 0.06)';
          return (
            <motion.g
              key={`node-${i}`}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.45, ease: 'backOut' }}
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            >
              <rect
                x={node.x - 65}
                y={node.y - 20}
                width={130}
                height={40}
                rx={20}
                fill={fill}
                stroke={stroke}
                strokeWidth={1}
                strokeOpacity={0.6}
              />
              <text
                x={node.x}
                y={node.y + 5}
                textAnchor="middle"
                fill="#f5f5f5"
                fontSize="13"
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
          transition={{ delay: 1.3, duration: 0.6, ease: 'backOut' }}
          style={{ transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}
        >
          {!reduce && (
            <>
              <circle cx={CENTER.x} cy={CENTER.y} r={55} fill="none" stroke="#1aff67" strokeWidth={1} opacity={0.6}>
                <animate attributeName="r" values="55;100;55" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;0;0.6" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx={CENTER.x} cy={CENTER.y} r={55} fill="none" stroke="#1aff67" strokeWidth={1} opacity={0.5}>
                <animate attributeName="r" values="55;120;55" dur="3s" begin="1s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" begin="1s" repeatCount="indefinite" />
              </circle>
            </>
          )}
          <circle cx={CENTER.x} cy={CENTER.y} r={55} fill="url(#rd-gradient)" filter="url(#rd-glow)" />
          <circle cx={CENTER.x} cy={CENTER.y} r={48} fill="#000" stroke="#1aff67" strokeWidth={1.5} />
          <text x={CENTER.x} y={CENTER.y - 2} textAnchor="middle" fill="#1aff67" fontSize="22" fontFamily="var(--font-sans)" fontWeight="600">Relay</text>
          <text x={CENTER.x} y={CENTER.y + 18} textAnchor="middle" fill="#f5f5f5" fontSize="11" fontFamily="var(--font-sans)" opacity={0.6}>AI Agent</text>
        </motion.g>
      </svg>
    </div>
  );
}
