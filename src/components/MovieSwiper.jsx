import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import logo from "../assets/No_Image_Available.jpg";
import { IMAGE_BASE_URL } from "../services/tmdb";
import { useApp } from "../context/AppContext";
import { useFilteredContent } from "../hooks/useMovieData";
import SkeletonCard from "./ui/SkeletonCard";
import { FiStar, FiCalendar, FiChevronDown, FiPlay, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const YEARS = Array.from({ length: 50 }, (_, i) => 2025 - i);

const sectionVariants = {
  hidden:  { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

// ── Individual Card ─────────────────────────────────────────────────────────────
function MovieCard({ item, isMovie, index, navigateToDetails }) {
  const [hovered, setHovered] = useState(false);
  const title = isMovie ? item.title : item.name;
  const date  = (isMovie ? item.release_date : item.first_air_date)?.split("-")[0];
  const src   = item.poster_path ? `${IMAGE_BASE_URL}${item.poster_path}` : logo;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3) }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => navigateToDetails(item)}
      className="relative cursor-pointer select-none"
      style={{ aspectRatio: "2/3" }}
    >
      {/* Card shell with spring animation */}
      <motion.div
        animate={{
          scale:     hovered ? 1.06 : 1,
          y:         hovered ? -8   : 0,
          boxShadow: hovered
            ? "0 28px 64px rgba(0,0,0,0.75), 0 0 0 2px rgba(0,240,255,0.6)"
            : "0 4px 20px rgba(0,0,0,0.35)",
        }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        className="relative w-full h-full rounded-2xl overflow-hidden"
        style={{ transformOrigin: "center bottom" }}
      >
        {/* Poster image */}
        <img
          src={src}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Permanent bottom gradient */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.18) 45%, transparent 70%)" }} />

        {/* Rating pill – always visible top right */}
        {item.vote_average > 0 && (
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1 text-xs font-black px-2.5 py-1 rounded-xl"
            style={{
              background:    "rgba(13,15,26,0.85)",
              color:         "var(--color-accent-gold)",
              backdropFilter:"blur(8px)",
              border:        "1px solid rgba(0,240,255,0.3)",
            }}>
            <FiStar size={10} />
            {item.vote_average.toFixed(1)}
          </div>
        )}

        {/* Bottom info – always visible */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-sm font-bold text-white leading-tight truncate">{title}</h3>
          <p className="text-xs mt-0.5 flex items-center gap-1" style={{ color: "var(--color-text-dim)" }}>
            <FiCalendar size={9} /> {date || "—"}
          </p>
        </div>

        {/* Hover: play button overlay */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.22 }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl"
          style={{ background: "rgba(13,15,26,0.5)", backdropFilter: "blur(3px)" }}
          aria-hidden={!hovered}
        >
          <motion.div
            animate={{ scale: hovered ? 1 : 0.65, opacity: hovered ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 360, damping: 22, delay: 0.02 }}
            className="flex items-center justify-center w-14 h-14 rounded-full"
            style={{
              background: "var(--color-accent-gold)",
              boxShadow:  "0 0 36px rgba(0,240,255,0.65)",
              color:      "#0D0F1A",
            }}
          >
            <FiPlay size={22} fill="currentColor" />
          </motion.div>
          <motion.span
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
            transition={{ duration: 0.22, delay: 0.06 }}
            className="text-xs font-black tracking-[0.15em]"
            style={{ color: "var(--color-accent-gold)" }}
          >
            VIEW DETAILS
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ── Main Swiper Section ──────────────────────────────────────────────────────────
function MovieSwiper({ title, isMovie = true, upcoming = false }) {
  const [selectedYear, setSelectedYear] = useState("");
  const { navigateToDetails } = useApp();
  const { data: filteredData = [], isLoading } = useFilteredContent(selectedYear, isMovie);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  if (isLoading) return <SkeletonCard variant="hero" />;

  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="relative pb-16"
      style={{ background: "var(--color-bg-primary)" }}
    >
      {/* ── Section Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between px-6 md:px-10 lg:px-14 pt-14 pb-8 gap-4">
        <div>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold tracking-[0.3em] uppercase mb-2"
            style={{ color: "var(--color-accent-gold)" }}
          >
            {isMovie ? "🎬 Cinema" : "📺 Streaming"}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white"
          >
            {title}
          </motion.h2>
        </div>

        <div className="flex items-center gap-3">
          {/* Year Filter */}
          {!upcoming && (
            <div className="relative">
              <select
                id={`yearFilter-${title}`}
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="appearance-none pl-4 pr-9 py-2.5 rounded-xl text-sm font-semibold outline-none cursor-pointer"
                style={{
                  background: "var(--color-bg-elevated)",
                  color:      "var(--color-text-primary)",
                  border:     "1px solid var(--color-border)",
                  fontFamily: "Outfit, sans-serif",
                }}
              >
                <option value="">All Years</option>
                {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
              <FiChevronDown size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "var(--color-accent-gold)" }}
              />
            </div>
          )}

          {/* Custom Nav Buttons */}
          <div className="flex gap-2">
            {[
              { ref: prevRef, Icon: FiChevronLeft,  label: "Previous" },
              { ref: nextRef, Icon: FiChevronRight, label: "Next" },
            ].map(({ ref, Icon, label }) => (
              <button
                key={label}
                ref={ref}
                aria-label={label}
                className="w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200"
                style={{
                  background: "var(--color-bg-elevated)",
                  border:     "1px solid var(--color-border)",
                  color:      "var(--color-text-muted)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background   = "var(--color-accent-gold)";
                  e.currentTarget.style.color        = "#0D0F1A";
                  e.currentTarget.style.borderColor  = "var(--color-accent-gold)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background   = "var(--color-bg-elevated)";
                  e.currentTarget.style.color        = "var(--color-text-muted)";
                  e.currentTarget.style.borderColor  = "var(--color-border)";
                }}
              >
                <Icon size={18} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Swiper Carousel ── */}
      <div className="px-6 md:px-10 lg:px-14">
        <Swiper
          modules={[Navigation, Autoplay, FreeMode]}
          loop={true}
          freeMode={{ enabled: true, momentum: true, momentumRatio: 0.8 }}
          autoplay={{ delay: 3800, disableOnInteraction: false, pauseOnMouseEnter: true }}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          spaceBetween={14}
          breakpoints={{
            320:  { slidesPerView: 1.7 },
            480:  { slidesPerView: 2.3 },
            640:  { slidesPerView: 3.2 },
            1024: { slidesPerView: 4.2 },
            1280: { slidesPerView: 5.2 },
            1536: { slidesPerView: 6.2 },
          }}
          className="!pb-4"
          style={{ overflow: "visible" }}
        >
          {filteredData.map((item, index) => (
            <SwiperSlide key={item.id ?? index} style={{ height: "auto" }}>
              <MovieCard
                item={item}
                isMovie={isMovie}
                index={index}
                navigateToDetails={navigateToDetails}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.section>
  );
}

export default MovieSwiper;
