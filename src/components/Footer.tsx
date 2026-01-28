"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative py-24 border-t border-[#6b6561]/10">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#d4a574]/5 blur-[100px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Main footer content */}
        <div className="flex flex-col items-center text-center">
          {/* Logo mark */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-16 h-16">
              <motion.div
                className="absolute inset-0 border border-[#d4a574]/30 rotate-45"
                animate={{ rotate: [45, 405] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-2 border border-[#d4a574]/20 rotate-45"
                animate={{ rotate: [45, -315] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-2xl text-[#d4a574]">NF</span>
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h3
            className="font-display text-3xl sm:text-4xl font-light text-[#f5f1eb] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Never Forget
          </motion.h3>

          {/* Tagline */}
          <motion.p
            className="font-body text-sm text-[#6b6561] mb-12 max-w-md"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A collection of moments from our journey through Asia.
            Every photograph a story, every memory a treasure.
          </motion.p>

          {/* Decorative element */}
          <motion.div
            className="flex items-center gap-4 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <span className="w-12 h-px bg-[#d4a574]/30" />
            <span className="font-body text-xs tracking-[0.5em] uppercase text-[#d4a574]">
              2024
            </span>
            <span className="w-12 h-px bg-[#d4a574]/30" />
          </motion.div>

          {/* Copyright */}
          <motion.p
            className="font-body text-xs text-[#6b6561]/60 tracking-wider"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Crafted with memories and love
          </motion.p>

          {/* Back to top - mobile */}
          <motion.button
            className="mt-8 sm:hidden flex flex-col items-center gap-2 text-[#6b6561] hover:text-[#d4a574] active:text-[#d4a574] transition-colors touch-manipulation"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ y: -4 }}
          >
            <svg
              className="w-5 h-5 rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
            <span className="font-body text-xs tracking-widest uppercase">
              Top
            </span>
          </motion.button>
        </div>

        {/* Back to top - desktop */}
        <motion.button
          className="hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2 flex-col items-center gap-2 text-[#6b6561] hover:text-[#d4a574] transition-colors"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          whileHover={{ y: -4 }}
        >
          <svg
            className="w-5 h-5 rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
          <span className="font-body text-xs tracking-widest uppercase">
            Top
          </span>
        </motion.button>
      </div>
    </footer>
  );
}
