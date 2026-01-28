"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SplashScreen from "@/components/SplashScreen";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PhotoGallery from "@/components/PhotoGallery";
import QuoteSection from "@/components/QuoteSection";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";

// Photo data - dynamically loaded from public/photos
const photos = [
  "1cf7db25-34fb-4225-ae06-e950cd80b7d9.jpg",
  "02d83b29-4272-4dde-a04a-61f742b65801.jpg",
  "2f7c374c-fa56-4fc0-aa07-25e37baf1fc7.jpg",
  "3dceb752-a23e-4084-9b4f-8e25cb805040.jpg",
  "3e42deb9-5a83-48ec-bf02-c21579674cc3.jpg",
  "4e230007-5d10-4a09-90a6-e77ffa7dd6e8.jpg",
  "7f387414-5060-430e-a43e-99d1b3614e82.jpg",
  "9c396ab1-faf2-423d-906b-60a21a4b21c0.jpg",
  "9e152362-3c9f-4476-b4c7-c24d10a3df9e.jpg",
  "97e62580-36ad-4c10-9f1e-6a7a425aa461.jpg",
  "99d381aa-40a4-4a4d-9ebf-d7a384199958.jpg",
  "658d2650-233d-48ac-8979-fbf10ed7dc5f.jpg",
  "665a378d-94cb-432d-9769-da53056613a6.jpg",
  "767df2b7-6aa8-4941-a4c6-9661e9323852.jpg",
  "840ab121-d668-4d66-b57e-8ee3271ecb76.jpg",
  "3686bc7f-affa-43f0-a21e-2200d6ed50d1.jpg",
  "6641D7E1-03DF-4769-BB2F-C0B3CCF41006.jpg",
  "7375cd17-f70d-4e97-a94f-b9e5432e2230.jpg",
  "417698c7-4c4b-4bb9-866f-fdcab3f42abf.jpg",
  "804069A8-5D32-4A4A-AE01-9A94608834C1.jpg",
  "3969424C-DD50-4E24-A3C9-7ACBCDB82CA7.jpg",
  "a8dd2da3-213f-4bf9-8377-c8db5fe5e2eb.jpg",
  "BD99D9BA-FAD7-4E66-B31E-92641770FDC1.jpg",
  "be779620-04bb-426c-8cf8-b89bba83e0fd.jpg",
  "BED70001-D71E-45BF-8479-6E9F9ED2B4C0.jpg",
  "bef0177c-842a-414c-8246-8dff0dabe1e6.jpg",
  "cc25fbd8-5d07-441e-a3ba-a3b5655b0635.jpg",
  "cfe0714c-b804-4f0b-b994-073a27648047.jpg",
  "e517f11a-dd9d-48a6-87e9-77443171db76.jpg",
  "ef35eacd-abc2-40df-9782-359d2f5d9698.jpg",
  "F6D285CB-7123-4D45-AD78-0A939C91DD82.jpg",
  "IMG_2429.JPG",
  "IMG_4500.jpeg",
  "IMG_4773.jpeg",
  "IMG_5609.jpeg",
  "IMG_5697.jpeg",
  "IMG_5713.jpeg",
  "IMG_5722.jpeg",
  "IMG_5749.jpeg",
  "IMG_6111.jpeg",
  "IMG_6150.jpeg",
  "IMG_6743.JPG",
  "IMG_6759.JPG",
  "IMG_6770.JPG",
  "IMG_7233.jpeg",
  "IMG_7499.jpeg",
  "IMG_7612.JPG",
  "IMG_7708.jpeg",
  "IMG_7904.jpeg",
  "IMG_7970.jpeg",
  "IMG_8025.jpeg",
  "IMG_8026.jpeg",
  "IMG_8027.jpeg",
].map((filename) => ({
  src: `/photos/${filename}`,
  alt: `Asia adventure - ${filename.replace(/\.[^/.]+$/, "").replace(/_/g, " ")}`,
  width: 1200,
  height: 800,
}));

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if splash was already shown in this session
    const splashShown = sessionStorage.getItem("splashShown");
    if (splashShown) {
      setShowSplash(false);
      setIsLoaded(true);
    }
  }, []);

  const handleSplashComplete = () => {
    sessionStorage.setItem("splashShown", "true");
    setShowSplash(false);
    setIsLoaded(true);
  };

  return (
    <main className="relative min-h-screen bg-[#0a0908]">
      {/* Cursor glow effect */}
      <CursorGlow />

      {/* Splash screen */}
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence>
        {(isLoaded || !showSplash) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <Header />
            <HeroSection />

            {/* Gallery section */}
            <section id="gallery" className="relative py-24 sm:py-32">
              {/* Section header */}
              <motion.div
                className="max-w-7xl mx-auto px-6 mb-16 sm:mb-24"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
                  <div>
                    <motion.p
                      className="font-body text-xs tracking-[0.5em] uppercase text-[#d4a574] mb-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      The Collection
                    </motion.p>
                    <motion.h2
                      className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-[#f5f1eb]"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    >
                      Captured Moments
                    </motion.h2>
                  </div>

                  <motion.div
                    className="flex items-center gap-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    <span className="font-display text-5xl text-[#d4a574]/20">
                      {String(photos.length).padStart(2, "0")}
                    </span>
                    <div className="text-right">
                      <p className="font-body text-sm text-[#6b6561]">Photos</p>
                      <p className="font-body text-xs text-[#6b6561]/60">
                        Click to explore
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Decorative line */}
                <motion.div
                  className="mt-8 h-px bg-gradient-to-r from-[#d4a574]/30 via-[#d4a574]/10 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.6 }}
                />
              </motion.div>

              {/* Photo gallery */}
              <PhotoGallery photos={photos} />
            </section>

            <QuoteSection />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
