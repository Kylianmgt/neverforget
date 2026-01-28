"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<"initial" | "title" | "subtitle" | "exit">("initial");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("title"), 500),
      setTimeout(() => setPhase("subtitle"), 2000),
      setTimeout(() => setPhase("exit"), 4000),
      setTimeout(() => onComplete(), 5000),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const titleLetters = "Never Forget".split("");
  const subtitleWords = ["The", "moments", "that", "shaped", "us"];

  return (
    <AnimatePresence>
      {phase !== "exit" || true ? (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0908]"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "exit" ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
        >
          {/* Ambient background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#d4a574]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.03, scale: 1 }}
              transition={{ duration: 3, ease: "easeOut" }}
              style={{ filter: "blur(100px)" }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#e8c4a0]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.02, scale: 1 }}
              transition={{ duration: 3, delay: 0.5, ease: "easeOut" }}
              style={{ filter: "blur(120px)" }}
            />
          </div>

          {/* Decorative lines */}
          <motion.div
            className="absolute top-0 left-1/2 w-px h-32 bg-gradient-to-b from-transparent via-[#d4a574] to-transparent"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 0.3 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          />
          <motion.div
            className="absolute bottom-0 left-1/2 w-px h-32 bg-gradient-to-t from-transparent via-[#d4a574] to-transparent"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 0.3 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          />

          {/* Main title */}
          <div className="relative z-10 text-center">
            <h1 className="font-display text-6xl sm:text-8xl md:text-9xl font-light tracking-wider text-[#f5f1eb] mb-6 overflow-hidden">
              {titleLetters.map((letter, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  initial={{ y: 120, opacity: 0, rotateX: -80 }}
                  animate={
                    phase !== "initial"
                      ? { y: 0, opacity: 1, rotateX: 0 }
                      : {}
                  }
                  transition={{
                    duration: 0.8,
                    delay: index * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </h1>

            {/* Subtitle */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-hidden px-4">
              <motion.span
                className="hidden sm:block h-px bg-[#d4a574] origin-left"
                initial={{ scaleX: 0 }}
                animate={phase === "subtitle" || phase === "exit" ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{ width: 60 }}
              />
              <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                {subtitleWords.map((word, index) => (
                  <motion.span
                    key={index}
                    className="font-body text-xs sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[#6b6561]"
                    initial={{ y: 30, opacity: 0 }}
                    animate={
                      phase === "subtitle" || phase === "exit"
                        ? { y: 0, opacity: 1 }
                        : {}
                    }
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
              <motion.span
                className="hidden sm:block h-px bg-[#d4a574] origin-right"
                initial={{ scaleX: 0 }}
                animate={phase === "subtitle" || phase === "exit" ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                style={{ width: 60 }}
              />
            </div>

            {/* Location tag */}
            <motion.p
              className="mt-12 font-body text-xs tracking-[0.5em] uppercase text-[#d4a574]"
              initial={{ opacity: 0 }}
              animate={phase === "subtitle" || phase === "exit" ? { opacity: 0.7 } : {}}
              transition={{ duration: 1, delay: 0.8 }}
            >
              Asia 2025
            </motion.p>
          </div>

          {/* Corner decorations */}
          <motion.div
            className="absolute top-8 left-8 w-16 h-16 border-l border-t border-[#d4a574]/20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
          />
          <motion.div
            className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-[#d4a574]/20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
