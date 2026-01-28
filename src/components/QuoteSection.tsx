"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function QuoteSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative py-32 sm:py-48 overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-1/2 left-0 w-1/2 h-px bg-gradient-to-r from-[#d4a574]/20 to-transparent"
          style={{ y }}
        />
        <motion.div
          className="absolute top-1/2 right-0 w-1/2 h-px bg-gradient-to-l from-[#d4a574]/20 to-transparent"
          style={{ y: useTransform(y, (v) => -v) }}
        />
      </div>

      {/* Main quote */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        style={{ opacity }}
      >
        {/* Opening quote mark */}
        <motion.span
          className="quote-mark -top-16 left-0 sm:left-16 text-[#d4a574]"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 0.1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          &ldquo;
        </motion.span>

        <motion.blockquote
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-[#f5f1eb] italic"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          Some moments are so profound, they become part of who we are.
          <span className="text-[#d4a574]"> These are ours.</span>
        </motion.blockquote>

        {/* Closing quote mark */}
        <motion.span
          className="quote-mark -bottom-32 right-0 sm:right-16 text-[#d4a574]"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 0.1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          &rdquo;
        </motion.span>

        {/* Decorative line */}
        <motion.div
          className="mt-16 flex items-center justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="w-1 h-1 rounded-full bg-[#d4a574]" />
          <div className="w-20 h-px bg-[#d4a574]/30 mx-4" />
          <div className="w-2 h-2 rotate-45 border border-[#d4a574]/50" />
          <div className="w-20 h-px bg-[#d4a574]/30 mx-4" />
          <div className="w-1 h-1 rounded-full bg-[#d4a574]" />
        </motion.div>

        {/* Attribution */}
        <motion.p
          className="mt-8 font-body text-sm tracking-[0.3em] uppercase text-[#6b6561]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          Adventures in Asia, 2025
        </motion.p>
      </motion.div>
    </section>
  );
}
