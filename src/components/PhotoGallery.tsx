"use client";

import { motion, AnimatePresence, useInView, PanInfo } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";

interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface PhotoGalleryProps {
  photos: Photo[];
}

// Simple blur placeholder - a neutral warm tone that matches the site's aesthetic
const BLUR_PLACEHOLDER = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI4MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGZpbHRlciBpZD0iYiI+PGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMTIiLz48L2ZpbHRlcj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMTgxNiIvPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNiKSIgZmlsbD0iIzJhMjUyMCIgb3BhY2l0eT0iMC41Ii8+PC9zdmc+";

// Swipe threshold for navigation (in pixels)
const SWIPE_THRESHOLD = 50;
// Velocity threshold for quick swipes (pixels/ms)
const VELOCITY_THRESHOLD = 0.3;

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
            className="w-full h-auto object-cover transition-opacity duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading={index < 8 ? "eager" : "lazy"}
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
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
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Get current index for navigation
  const currentIndex = useMemo(() => {
    if (!selectedPhoto) return -1;
    return photos.findIndex((p) => p.src === selectedPhoto.src);
  }, [selectedPhoto, photos]);

  // Calculate adjacent photo indices for preloading
  const adjacentIndices = useMemo(() => {
    if (currentIndex === -1) return [];
    const prev = (currentIndex - 1 + photos.length) % photos.length;
    const next = (currentIndex + 1) % photos.length;
    return [prev, next];
  }, [currentIndex, photos.length]);

  // Navigate to next/previous photo
  const navigateToPhoto = useCallback(
    (direction: "next" | "prev") => {
      if (currentIndex === -1) return;
      setSwipeDirection(direction === "next" ? "left" : "right");
      const newIndex =
        direction === "next"
          ? (currentIndex + 1) % photos.length
          : (currentIndex - 1 + photos.length) % photos.length;
      setSelectedPhoto(photos[newIndex]);
      // Reset swipe direction after animation
      setTimeout(() => setSwipeDirection(null), 300);
    },
    [currentIndex, photos]
  );

  // Handle swipe/drag end
  const handleDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      setIsDragging(false);
      const { offset, velocity } = info;

      // Check if swipe was fast enough or far enough
      const swipedLeft = offset.x < -SWIPE_THRESHOLD || velocity.x < -VELOCITY_THRESHOLD;
      const swipedRight = offset.x > SWIPE_THRESHOLD || velocity.x > VELOCITY_THRESHOLD;

      if (swipedLeft) {
        navigateToPhoto("next");
      } else if (swipedRight) {
        navigateToPhoto("prev");
      }
    },
    [navigateToPhoto]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!selectedPhoto) return;

      if (e.key === "Escape") {
        setSelectedPhoto(null);
      } else if (e.key === "ArrowRight") {
        navigateToPhoto("next");
      } else if (e.key === "ArrowLeft") {
        navigateToPhoto("prev");
      }
    },
    [selectedPhoto, navigateToPhoto]
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

  // Preload adjacent images when lightbox is open
  useEffect(() => {
    if (!selectedPhoto || adjacentIndices.length === 0) return;

    adjacentIndices.forEach((index) => {
      const img = new window.Image();
      img.src = photos[index].src;
    });
  }, [selectedPhoto, adjacentIndices, photos]);

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
            className="fixed inset-0 z-50 flex items-center justify-center lightbox-backdrop bg-[#0a0908]/95 p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Close button */}
            <motion.button
              className="absolute top-3 right-3 sm:top-6 sm:right-6 z-10 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center text-[#f5f1eb]/60 hover:text-[#f5f1eb] active:text-[#f5f1eb] transition-colors touch-manipulation"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhoto(null);
              }}
            >
              <svg
                className="w-7 h-7 sm:w-8 sm:h-8"
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
              className="absolute left-1 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-11 h-16 sm:w-12 sm:h-12 flex items-center justify-center text-[#f5f1eb]/40 hover:text-[#d4a574] active:text-[#d4a574] transition-colors touch-manipulation"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={(e) => {
                e.stopPropagation();
                navigateToPhoto("prev");
              }}
            >
              <svg
                className="w-7 h-7 sm:w-8 sm:h-8"
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
              className="absolute right-1 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-11 h-16 sm:w-12 sm:h-12 flex items-center justify-center text-[#f5f1eb]/40 hover:text-[#d4a574] active:text-[#d4a574] transition-colors touch-manipulation"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={(e) => {
                e.stopPropagation();
                navigateToPhoto("next");
              }}
            >
              <svg
                className="w-7 h-7 sm:w-8 sm:h-8"
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

            {/* Image container with swipe support */}
            <motion.div
              className="relative max-w-[92vw] sm:max-w-[90vw] max-h-[75vh] sm:max-h-[80vh] touch-pan-y"
              initial={{
                scale: 0.9,
                opacity: 0,
                x: swipeDirection === "left" ? 100 : swipeDirection === "right" ? -100 : 0
              }}
              animate={{
                scale: 1,
                opacity: 1,
                x: 0
              }}
              exit={{
                scale: 0.9,
                opacity: 0,
                x: swipeDirection === "left" ? -100 : swipeDirection === "right" ? 100 : 0
              }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              // Swipe/drag support
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={handleDragEnd}
              whileDrag={{ cursor: "grabbing" }}
              style={{ touchAction: "pan-y" }}
            >
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                width={selectedPhoto.width}
                height={selectedPhoto.height}
                className={`max-w-full max-h-[75vh] sm:max-h-[80vh] w-auto h-auto object-contain rounded-sm select-none transition-opacity duration-300 ${isDragging ? "pointer-events-none" : ""}`}
                priority
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
                draggable={false}
              />

              {/* Image counter */}
              <motion.div
                className="absolute -bottom-10 sm:-bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 sm:gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="font-display text-xl sm:text-2xl text-[#d4a574]">
                  {String(currentIndex + 1).padStart(2, "0")}
                </span>
                <span className="w-6 sm:w-8 h-px bg-[#6b6561]" />
                <span className="font-body text-xs sm:text-sm text-[#6b6561]">
                  {String(photos.length).padStart(2, "0")}
                </span>
              </motion.div>

              {/* Swipe hint for mobile */}
              <motion.div
                className="absolute -bottom-20 sm:-bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[#6b6561]/50 sm:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                <span className="text-xs font-body">Swipe to navigate</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
