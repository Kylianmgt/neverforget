"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";

interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface PhotoGalleryProps {
  photos: Photo[];
}

// Individual gallery item with its own intersection observer
function GalleryItem({
  photo,
  index,
  onSelect,
  onHover,
  isHovered,
}: {
  photo: Photo;
  index: number;
  onSelect: (photo: Photo) => void;
  onHover: (index: number | null) => void;
  isHovered: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <div ref={ref} className="masonry-item">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <motion.div
          className="image-container relative cursor-pointer rounded-sm overflow-hidden group"
          onClick={() => onSelect(photo)}
          onMouseEnter={() => onHover(index)}
          onMouseLeave={() => onHover(null)}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            className="w-full h-auto object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading={index < 8 ? "eager" : "lazy"}
          />

          {/* Hover overlay with warm glow */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-[#0a0908]/90 via-[#0a0908]/20 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Photo number indicator */}
          <motion.div
            className="absolute bottom-4 left-4 font-display text-5xl font-light text-[#f5f1eb]/20"
            initial={{ opacity: 0, x: -10 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 0 : -10,
            }}
            transition={{ duration: 0.3 }}
          >
            {String(index + 1).padStart(2, "0")}
          </motion.div>

          {/* Corner brackets on hover */}
          <motion.div
            className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-[#d4a574]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isHovered ? 0.8 : 0,
              scale: isHovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-[#d4a574]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isHovered ? 0.8 : 0,
              scale: isHovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!selectedPhoto) return;

      const currentIndex = photos.findIndex((p) => p.src === selectedPhoto.src);

      if (e.key === "Escape") {
        setSelectedPhoto(null);
      } else if (e.key === "ArrowRight") {
        const nextIndex = (currentIndex + 1) % photos.length;
        setSelectedPhoto(photos[nextIndex]);
      } else if (e.key === "ArrowLeft") {
        const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
        setSelectedPhoto(photos[prevIndex]);
      }
    },
    [selectedPhoto, photos]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (selectedPhoto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedPhoto]);

  return (
    <>
      {/* Masonry Gallery */}
      <div className="masonry-grid px-4 sm:px-8 lg:px-16">
        {photos.map((photo, index) => (
          <GalleryItem
            key={photo.src}
            photo={photo}
            index={index}
            onSelect={setSelectedPhoto}
            onHover={setHoveredIndex}
            isHovered={hoveredIndex === index}
          />
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center lightbox-backdrop bg-[#0a0908]/95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Close button */}
            <motion.button
              className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center text-[#f5f1eb]/60 hover:text-[#f5f1eb] transition-colors"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedPhoto(null)}
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>

            {/* Navigation arrows */}
            <motion.button
              className="absolute left-4 sm:left-8 z-10 w-12 h-12 flex items-center justify-center text-[#f5f1eb]/40 hover:text-[#d4a574] transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = photos.findIndex(
                  (p) => p.src === selectedPhoto.src
                );
                const prevIndex =
                  (currentIndex - 1 + photos.length) % photos.length;
                setSelectedPhoto(photos[prevIndex]);
              }}
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </motion.button>

            <motion.button
              className="absolute right-4 sm:right-8 z-10 w-12 h-12 flex items-center justify-center text-[#f5f1eb]/40 hover:text-[#d4a574] transition-colors"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = photos.findIndex(
                  (p) => p.src === selectedPhoto.src
                );
                const nextIndex = (currentIndex + 1) % photos.length;
                setSelectedPhoto(photos[nextIndex]);
              }}
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>

            {/* Image container */}
            <motion.div
              className="relative max-w-[90vw] max-h-[85vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                width={selectedPhoto.width}
                height={selectedPhoto.height}
                className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-sm"
                priority
              />

              {/* Image counter */}
              <motion.div
                className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="font-display text-2xl text-[#d4a574]">
                  {String(
                    photos.findIndex((p) => p.src === selectedPhoto.src) + 1
                  ).padStart(2, "0")}
                </span>
                <span className="w-8 h-px bg-[#6b6561]" />
                <span className="font-body text-sm text-[#6b6561]">
                  {String(photos.length).padStart(2, "0")}
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
