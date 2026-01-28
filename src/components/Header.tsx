"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0908]/80 backdrop-blur-md py-4"
          : "bg-transparent py-6"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-8 h-8 relative">
            <motion.div
              className="absolute inset-0 border border-[#d4a574]/40 rotate-45"
              animate={{ rotate: [45, 405] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-1 bg-[#d4a574]/10 rotate-45" />
          </div>
          <span className="font-display text-xl tracking-wider text-[#f5f1eb]">
            NF
          </span>
        </motion.div>

        {/* Navigation */}
        <nav className="flex items-center gap-4 sm:gap-8">
          <motion.a
            href="#gallery"
            className="font-body text-xs sm:text-sm tracking-wider sm:tracking-widest uppercase text-[#6b6561] hover:text-[#d4a574] transition-colors"
            whileHover={{ y: -2 }}
          >
            Gallery
          </motion.a>
          <motion.a
            href="#about"
            className="font-body text-xs sm:text-sm tracking-wider sm:tracking-widest uppercase text-[#6b6561] hover:text-[#d4a574] transition-colors"
            whileHover={{ y: -2 }}
          >
            Story
          </motion.a>
        </nav>

        {/* Year badge */}
        <motion.div
          className="flex items-center gap-2 font-body text-xs tracking-[0.3em] text-[#6b6561]"
          whileHover={{ scale: 1.05 }}
        >
          <span className="hidden sm:inline">ASIA</span>
          <span className="w-4 h-px bg-[#d4a574]/40" />
          <span className="text-[#d4a574]">2025</span>
        </motion.div>
      </div>
    </motion.header>
  );
}
