"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background ambient elements */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y, scale }}
      >
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-[#d4a574]/5 blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[#e8c4a0]/3 blur-[120px]" />
      </motion.div>

      {/* Grid pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(212, 165, 116, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(212, 165, 116, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center px-6"
        style={{ opacity }}
      >
        {/* Top decorative line */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.span
            className="h-px w-20 bg-gradient-to-r from-transparent to-[#d4a574]/50"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          />
          <span className="font-body text-xs tracking-[0.5em] uppercase text-[#6b6561]">
            A Visual Journey
          </span>
          <motion.span
            className="h-px w-20 bg-gradient-to-l from-transparent to-[#d4a574]/50"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          />
        </motion.div>

        {/* Main title */}
        <motion.h1
          className="font-display text-6xl sm:text-8xl md:text-[10rem] lg:text-[12rem] font-light leading-[0.85] tracking-tight text-[#f5f1eb] mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block">Never</span>
          <span className="block text-[#d4a574]">Forget</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="font-body text-lg sm:text-xl text-[#6b6561] max-w-md mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          Memories etched in time, moments that transcend the ordinary.
        </motion.p>

        {/* Stats/Info */}
        <motion.div
          className="flex items-center justify-center gap-8 sm:gap-16 mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <div className="text-center">
            <span className="font-display text-4xl sm:text-5xl text-[#d4a574]">80</span>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-[#6b6561] mt-2">
              Moments
            </p>
          </div>
          <div className="w-px h-12 bg-[#6b6561]/30" />
          <div className="text-center">
            <span className="font-display text-4xl sm:text-5xl text-[#d4a574]">1</span>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-[#6b6561] mt-2">
              Journey
            </p>
          </div>
          <div className="w-px h-12 bg-[#6b6561]/30" />
          <div className="text-center">
            <span className="font-display text-4xl sm:text-5xl text-[#d4a574]">&infin;</span>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-[#6b6561] mt-2">
              Memories
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <span className="font-body text-xs tracking-[0.3em] uppercase text-[#6b6561]">
          Scroll
        </span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-[#d4a574] to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Corner decorations */}
      <motion.div
        className="absolute top-24 left-8 w-24 h-24 border-l border-t border-[#d4a574]/10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
      />
      <motion.div
        className="absolute bottom-24 right-8 w-24 h-24 border-r border-b border-[#d4a574]/10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
      />
    </section>
  );
}
