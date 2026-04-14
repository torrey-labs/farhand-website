'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Navigation() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
      className="fixed top-0 left-0 right-0 z-[100] py-5 bg-black/85 backdrop-blur-md"
    >
      <div className="container flex justify-between items-center">
        <Link href="/" className="flex items-center min-h-[44px]">
          <img
            src="/logo-w-type-light-on-dark.png"
            alt="Farhand Logo"
            className="h-11 object-contain"
          />
        </Link>

        <motion.a
          href="#schedule"
          whileHover={{ opacity: 0.8 }}
          className="text-accent text-lg font-normal no-underline px-5 py-2.5 min-h-[44px] flex items-center"
        >
          Schedule a Call
        </motion.a>
      </div>
    </motion.nav>
  );
}
