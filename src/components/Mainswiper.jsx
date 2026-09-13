import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/No_Image_Available.jpg";
import { IMAGE_BASE_URL } from "../services/tmdb";
import { useMovieList } from "../hooks/useMovieData";
import { useApp } from "../context/AppContext";
import SkeletonCard from "./ui/SkeletonCard";
import { FiStar, FiCalendar, FiPlay, FiInfo, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const SLIDE_DURATION = 8000; // ms per slide

export default function HeroBanner() {
  const { navigateToDetails } = useApp();
  const { data: movieList = [], isLoading } = useMovieList();

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1=forward, -1=backward

  const total = Math.min(movieList.length, 10); // show top 10

  const goTo = useCallback((idx, dir = 1) => {
    setDirection(dir);
    setCurrent((idx + total) % total);
  }, [total]);

  const next = useCallback(() => goTo(current + 1, 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, -1), [current, goTo]);

  // Auto-advance
  useEffect(() => {
    if (total === 0) return;
    const id = setInterval(next, SLIDE_DURATION);
    return () => clearInterval(id);
  }, [next, total]);

  if (isLoading) return <SkeletonCard variant="hero" />;
  if (!movieList.length) return null;

  const movie = movieList[current];
  const backdropSrc = movie.backdrop_path
    ? `${IMAGE_BASE_URL}${movie.backdrop_path}`
    : movie.poster_path
      ? `${IMAGE_BASE_URL}${movie.poster_path}`
      : logo;

  const slideVariants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -80 : 80, transition: { duration: 0.4 } }),
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" },
    }),
  };

  return (
    <div
      className="relative w-full overflow-hidden h-[55vh] min-h-[480px] lg:h-[85vh] lg:min-h-[600px] lg:max-h-[860px]"
      style={{ background: "var(--color-bg-primary)" }}
    >
      {/* Backdrop Layer */}
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={`bg-${movie.id}`}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <img
            src={backdropSrc}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          {/* Multi-layer gradient for readability */}
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to right, rgba(13,15,26,0.97) 0%, rgba(13,15,26,0.75) 45%, rgba(13,15,26,0.25) 100%)" }} />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(13,15,26,1) 0%, transparent 45%)" }} />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(13,15,26,0.6) 0%, transparent 20%)" }} />
        </motion.div>
      </AnimatePresence>

      {/* Content Layer */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-6 lg:px-16 pb-16 max-w-3xl text-center md:text-left flex flex-col items-center md:items-start">
          <AnimatePresence mode="wait">
            <motion.div key={`content-${movie.id}`} className="space-y-4">

              {/* Label */}
              <motion.p
                custom={0} variants={contentVariants} initial="hidden" animate="visible"
                className="text-xs font-bold tracking-[0.3em] uppercase"
                style={{ color: "var(--color-accent-gold)" }}
              >
                🎬 Featured Now
              </motion.p>

              {/* Title */}
              <motion.h1
                custom={1} variants={contentVariants} initial="hidden" animate="visible"
                className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-none tracking-tight"
              >
                {movie.title || movie.name}
              </motion.h1>

              {/* Metadata row */}
              <motion.div
                custom={2} variants={contentVariants} initial="hidden" animate="visible"
                className="flex flex-wrap items-center justify-center md:justify-start gap-3"
              >
                {movie.vote_average > 0 && (
                  <span className="flex items-center gap-1.5 text-sm font-black px-3 py-1 rounded-full"
                    style={{ background: "var(--color-accent-gold)", color: "#0D0F1A" }}>
                    <FiStar size={13} /> {movie.vote_average.toFixed(1)}
                  </span>
                )}
                {movie.release_date && (
                  <span className="flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full"
                    style={{ background: "rgba(255,255,255,0.1)", color: "var(--color-text-primary)", backdropFilter: "blur(8px)" }}>
                    <FiCalendar size={12} />
                    {movie.release_date.split("-")[0]}
                  </span>
                )}
                {/* Slide counter */}
                <span className="text-sm font-semibold" style={{ color: "var(--color-text-dim)" }}>
                  {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
              </motion.div>

              {/* Overview */}
              <motion.p
                custom={3} variants={contentVariants} initial="hidden" animate="visible"
                className="text-sm sm:text-base leading-relaxed line-clamp-3 max-w-xl"
                style={{ color: "var(--color-text-muted)" }}
              >
                {movie.overview || "No overview available."}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                custom={4} variants={contentVariants} initial="hidden" animate="visible"
                className="flex flex-wrap justify-center md:justify-start gap-3 pt-2"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigateToDetails(movie)}
                  className="flex items-center gap-2.5 px-7 py-3 rounded-2xl text-sm font-black transition-shadow"
                  style={{
                    background: "var(--color-accent-gold)",
                    color: "#0D0F1A",
                    boxShadow: "0 0 30px rgba(0,240,255,0.4)",
                  }}
                >
                  <FiPlay size={16} fill="currentColor" /> Watch Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, background: "rgba(255,255,255,0.15)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigateToDetails(movie)}
                  className="flex items-center gap-2.5 px-7 py-3 rounded-2xl text-sm font-bold transition-all"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    color: "var(--color-text-primary)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  <FiInfo size={16} /> More Info
                </motion.button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide Thumbnails (right side desktop) */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-3">
        {movieList.slice(0, total).map((m, i) => (
          <motion.button
            key={m.id}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            whileHover={{ scale: 1.08 }}
            className="relative overflow-hidden rounded-xl transition-all duration-300"
            style={{
              width: i === current ? 80 : 60,
              height: i === current ? 48 : 36,
              opacity: i === current ? 1 : 0.45,
              border: i === current ? "2px solid var(--color-accent-gold)" : "2px solid transparent",
              transition: "all 0.3s ease",
            }}
          >
            <img
              src={m.poster_path ? `${IMAGE_BASE_URL}${m.poster_path}` : logo}
              alt={m.title}
              className="w-full h-full object-cover"
            />
          </motion.button>
        ))}
      </div>

      {/* Nav Arrows */}
      <div className="absolute bottom-10 w-full flex items-center justify-center lg:w-auto lg:justify-start lg:left-16 gap-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={prev}
          className="flex items-center justify-center w-10 h-10 rounded-full transition-colors"
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "white",
            backdropFilter: "blur(8px)",
          }}
        >
          <FiChevronLeft size={20} />
        </motion.button>

        {/* Progress dots */}
        <div className="flex gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? 24 : 6,
                height: 6,
                background: i === current ? "var(--color-accent-gold)" : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={next}
          className="flex items-center justify-center w-10 h-10 rounded-full transition-colors"
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "white",
            backdropFilter: "blur(8px)",
          }}
        >
          <FiChevronRight size={20} />
        </motion.button>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: "rgba(255,255,255,0.1)" }}>
        <motion.div
          key={`progress-${current}`}
          className="h-full"
          style={{ background: "var(--color-accent-gold)" }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
        />
      </div>
    </div>
  );
}
