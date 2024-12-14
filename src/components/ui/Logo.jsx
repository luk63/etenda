import React from 'react';
import { motion } from 'framer-motion';

export function Logo({ scrolled = false }) {
  return (
    <div className="flex items-center gap-2">
      <motion.div
        whileHover={{ rotate: 10 }}
        transition={{ duration: 0.2 }}
        className="relative"
      >
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          <path
            d="M16 2L2 9L16 16L30 9L16 2Z"
            className="fill-purple-500"
          />
          <path
            d="M2 9V23L16 30V16L2 9Z"
            className="fill-pink-500"
          />
          <path
            d="M30 9V23L16 30V16L30 9Z"
            className="fill-purple-600"
          />
          <path
            d="M16 2L2 9L16 16L30 9L16 2Z"
            className="stroke-white/50"
            strokeWidth="0.5"
          />
        </svg>
        <div className="absolute inset-0 blur-xl bg-gradient-to-br from-purple-500 to-pink-500 opacity-50" />
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center"
      >
        <span className={`text-xl font-bold tracking-tight bg-gradient-to-r from-white to-white/90 bg-clip-text
          ${scrolled ? 'text-transparent' : 'text-transparent'}`}
        >
          Etenda
        </span>
        <span className="ml-1 text-2xs px-2 py-0.5 rounded-full bg-gradient-to-r 
          from-purple-500/10 to-pink-500/10 text-purple-300 border border-purple-500/20
          font-medium tracking-wide uppercase"
        >
          Beta
        </span>
      </motion.div>
    </div>
  );
} 