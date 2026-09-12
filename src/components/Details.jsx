import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/No_Image_Available.jpg";
import { genres, languages } from "../data/language_genre";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";
import { Navigation, EffectCoverflow, Autoplay } from "swiper/modules";
import { IMAGE_BASE_URL } from "../services/tmdb";
import { useApp } from "../context/AppContext";
import { FiStar, FiCalendar, FiGlobe, FiUsers, FiTrendingUp, FiX, FiPlay, FiTv, FiFilm, FiLoader } from "react-icons/fi";

const sectionVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: "easeOut" },
  }),
};

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3 py-2.5" style={{ borderBottom: "1px solid var(--color-border)" }}>
    <Icon size={16} className="mt-0.5 flex-shrink-0" style={{ color: "var(--color-accent-gold)" }} />
    <span className="text-sm font-semibold w-28 flex-shrink-0" style={{ color: "var(--color-accent-gold)" }}>
      {label}
    </span>
    <span className="text-sm" style={{ color: "var(--color-text-primary)" }}>{value}</span>
  </div>
);

function Details() {
  const location  = useLocation();
  const { state } = location;
  const { navigateToActor } = useApp();

  const detail    = state?.item      || {};
  const reviews   = state?.reviews   || [];
  const videos    = state?.videos    || [];
  const cast      = state?.cast      || [];
  const crew      = state?.crew      || [];
  const backdrops = state?.backdrops || [];
  const posters   = state?.posters   || [];

  const [selectedReview, setSelectedReview] = useState(null);
  const [isModalOpen,    setIsModalOpen]     = useState(false);
  const [showPlayer,     setShowPlayer]      = useState(false);
  const [season,         setSeason]          = useState(1);
  const [episode,        setEpisode]         = useState(1);

  const isTVSeries = detail.media_type === "tv" || !!detail.first_air_date;
  const playerUrl  = isTVSeries
    ? `https://vidsrc.sbs/embed/tv/${detail.id}/${season}/${episode}`
    : `https://vidsrc.sbs/embed/movie/${detail.id}`;

  if (!detail?.id) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--color-bg-primary)" }}>
        <p className="text-xl" style={{ color: "var(--color-text-muted)" }}>No detail selected.</p>
      </div>
    );
  }

  const genreNames =
    detail?.genre_ids
      ?.map((id) => genres.find((g) => g.id === id)?.name)
      .filter(Boolean)
      .join(", ") || "N/A";

  const languageName =
    languages.find((l) => l.iso_639_1 === detail?.original_language)?.english_name || "Unknown";

  const backdropUrl = backdrops?.[0]?.file_path
    ? `${IMAGE_BASE_URL}${backdrops[0].file_path}`
    : null;

  const SectionTitle = ({ children, index = 0 }) => (
    <motion.div
      custom={index}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="mb-6"
    >
      <h3 className="text-2xl md:text-3xl font-black gradient-text-gold inline-block pb-1">
        {children}
      </h3>
      <div className="h-0.5 w-16 rounded-full mt-1"
        style={{ background: "linear-gradient(90deg, var(--color-accent-gold), transparent)" }} />
    </motion.div>
  );

  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg-primary)", paddingTop: "80px" }}>
      {/* Hero Section */}
      <div className="relative w-full min-h-[60vh] flex items-end overflow-hidden">
        {/* Backdrop image */}
        {backdropUrl && (
          <div className="absolute inset-0">
            <img src={backdropUrl} alt="backdrop" className="w-full h-full object-cover" />
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(to right, rgba(13,15,26,0.95) 30%, rgba(13,15,26,0.5) 70%, rgba(13,15,26,0.3) 100%)" }} />
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(13,15,26,1) 0%, transparent 60%)" }} />
          </div>
        )}
        {!backdropUrl && (
          <div className="absolute inset-0" style={{ background: "var(--color-bg-secondary)" }} />
        )}

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-end text-center md:text-left">
            {/* Poster */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex-shrink-0"
            >
              <img
                src={detail.poster_path ? `${IMAGE_BASE_URL}${detail.poster_path}` : logo}
                alt={detail.title || "Poster"}
                className="w-40 md:w-52 lg:w-64 rounded-2xl shadow-2xl"
                style={{ border: "3px solid var(--color-accent-gold)" }}
              />
            </motion.div>

            {/* Title & Quick Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              className="flex-1 pb-2 flex flex-col items-center md:items-start"
            >
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-3">
                {detail.title || detail.name}
                {detail.original_name !== (detail.title || detail.name) &&
                  detail.original_title !== (detail.title || detail.name) && (
                  <span className="block text-lg md:text-xl font-normal mt-1" style={{ color: "var(--color-text-muted)" }}>
                    {detail.original_name || detail.original_title}
                  </span>
                )}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                {detail.vote_average > 0 && (
                  <span className="flex items-center gap-1.5 text-sm font-bold px-3 py-1 rounded-full"
                    style={{ background: "var(--color-accent-gold)", color: "#0D0F1A" }}>
                    <FiStar size={13} /> {detail.vote_average?.toFixed(1)}
                  </span>
                )}
                {(detail.release_date || detail.first_air_date) && (
                  <span className="flex items-center gap-1.5 text-sm px-3 py-1 rounded-full"
                    style={{ background: "var(--color-bg-elevated)", color: "var(--color-text-primary)", border: "1px solid var(--color-border)" }}>
                    <FiCalendar size={12} />
                    {detail.release_date || detail.first_air_date}
                  </span>
                )}
                {genreNames !== "N/A" && genreNames.split(", ").slice(0, 3).map((g) => (
                  <span key={g} className="text-xs px-3 py-1 rounded-full font-medium"
                    style={{ background: "rgba(108,99,255,0.15)", color: "var(--color-accent-purple)", border: "1px solid rgba(108,99,255,0.3)" }}>
                    {g}
                  </span>
                ))}
              </div>
              {detail.overview && (
                <p className="text-sm md:text-base leading-relaxed max-w-2xl line-clamp-3 mb-5"
                  style={{ color: "var(--color-text-muted)" }}>
                  {detail.overview}
                </p>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-1">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowPlayer(true)}
                  className="flex items-center gap-2.5 px-6 py-3 rounded-2xl text-sm font-black"
                  style={{
                    background: "var(--color-accent-gold)",
                    color: "#0D0F1A",
                    boxShadow: "0 0 28px rgba(0,240,255,0.4)",
                  }}
                >
                  <FiPlay size={16} fill="currentColor" />
                  {isTVSeries ? "Watch Series" : "Watch Movie"}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Detail Body */}
      <div className="container mx-auto px-4 lg:px-8 py-10 space-y-12">

        {/* Embedded Player Section */}
        <AnimatePresence>
          {showPlayer && (
            <motion.section
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 32, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="rounded-3xl overflow-hidden"
              style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}
            >
              {/* Player Header */}
              <div className="flex items-center justify-between p-4 md:p-5"
                style={{ borderBottom: "1px solid var(--color-border)" }}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl" style={{ background: "rgba(0,240,255,0.15)" }}>
                    {isTVSeries ? <FiTv size={18} style={{ color: "var(--color-accent-gold)" }} />
                                : <FiFilm size={18} style={{ color: "var(--color-accent-gold)" }} />}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest font-bold" style={{ color: "var(--color-accent-gold)" }}>
                      Now Playing
                    </p>
                    <p className="text-sm font-bold text-white">
                      {detail.title || detail.name}
                      {isTVSeries && ` — S${String(season).padStart(2,"0")} E${String(episode).padStart(2,"0")}`}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setShowPlayer(false)}
                  className="p-2 rounded-xl"
                  style={{ background: "var(--color-bg-elevated)", color: "var(--color-text-muted)" }}
                >
                  <FiX size={18} />
                </motion.button>
              </div>

              {/* Season / Episode Controls for TV */}
              {isTVSeries && (
                <div className="flex flex-wrap gap-4 px-5 py-3" style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--color-text-dim)" }}>Season</label>
                    <select
                      value={season}
                      onChange={(e) => setSeason(Number(e.target.value))}
                      className="px-3 py-1.5 rounded-lg text-sm font-semibold outline-none"
                      style={{ background: "var(--color-bg-elevated)", color: "var(--color-text-primary)", border: "1px solid var(--color-border)" }}
                    >
                      {Array.from({ length: 20 }, (_, i) => i + 1).map((s) => (
                        <option key={s} value={s}>Season {s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--color-text-dim)" }}>Episode</label>
                    <select
                      value={episode}
                      onChange={(e) => setEpisode(Number(e.target.value))}
                      className="px-3 py-1.5 rounded-lg text-sm font-semibold outline-none"
                      style={{ background: "var(--color-bg-elevated)", color: "var(--color-text-primary)", border: "1px solid var(--color-border)" }}
                    >
                      {Array.from({ length: 50 }, (_, i) => i + 1).map((ep) => (
                        <option key={ep} value={ep}>Episode {ep}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* iframe Player with Skeleton Loader */}
              <div className="relative w-full bg-[#0D0F1A]" style={{ paddingTop: "56.25%" }}>
                {/* Background Skeleton Loader */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  >
                    <FiLoader size={32} style={{ color: "var(--color-accent-gold)", opacity: 0.5 }} />
                  </motion.div>
                </div>
                {/* Foreground Iframe */}
                <iframe
                  key={playerUrl}
                  src={playerUrl}
                  title={`Watch ${detail.title || detail.name}`}
                  className="absolute inset-0 w-full h-full z-10"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  style={{ border: "none" }}
                />
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Quick Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 rounded-2xl"
          style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}
        >
          <InfoRow icon={FiStar}       label="Rating"      value={`⭐ ${detail.vote_average?.toFixed(1) || "N/A"} (${detail.vote_count?.toLocaleString()} votes)`} />
          <InfoRow icon={FiGlobe}      label="Language"    value={languageName} />
          <InfoRow icon={FiTrendingUp} label="Popularity"  value={detail.popularity?.toFixed(0) || "N/A"} />
          <InfoRow icon={FiCalendar}   label="Released"    value={detail.release_date || detail.first_air_date || "N/A"} />
          <InfoRow icon={FiUsers}      label="Genres"      value={genreNames} />
        </motion.div>

        {/* Cast & Crew */}
        {cast.concat(crew).length > 0 && (
          <section>
            <SectionTitle index={0}>Cast & Crew</SectionTitle>
            <Swiper modules={[Navigation]} navigation spaceBetween={16} loop
              breakpoints={{ 320: { slidesPerView: 2 }, 480: { slidesPerView: 3 }, 768: { slidesPerView: 5 }, 1024: { slidesPerView: 7 } }}>
              {cast.concat(crew).map((member, index) => (
                <SwiperSlide key={`${member.id}-${index}`}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-center cursor-pointer group py-2"
                    onClick={() => navigateToActor(member.id)}
                  >
                    <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-3 shadow-lg transition-shadow duration-300 group-hover:shadow-gold-glow"
                      style={{ border: "2px solid var(--color-border)", transition: "border-color 0.3s" }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--color-accent-gold)"}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--color-border)"}
                    >
                      <img
                        src={member.profile_path ? `${IMAGE_BASE_URL}${member.profile_path}` : logo}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-xs font-semibold leading-tight truncate px-1 group-hover:transition-colors"
                      style={{ color: "var(--color-text-primary)" }}
                      onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-accent-gold)"}
                      onMouseLeave={(e) => e.currentTarget.style.color = "var(--color-text-primary)"}>
                      {member.name}
                    </p>
                    <p className="text-xs mt-0.5 truncate px-1" style={{ color: "var(--color-text-dim)" }}>
                      {member.job ? member.job : "Cast"}
                    </p>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        )}


        {/* Posters */}
        {posters.length > 0 && (
          <section>
            <SectionTitle index={2}>Posters</SectionTitle>
            <div className="py-4 overflow-hidden">
              <Swiper 
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                loop={posters.length > 3}
                slidesPerView="auto"
                coverflowEffect={{
                  rotate: 20,
                  stretch: 0,
                  depth: 150,
                  modifier: 2,
                  slideShadows: true,
                }}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                modules={[Navigation, EffectCoverflow, Autoplay]}
                className="w-full"
              >
                {posters.slice(0, 10).map((p, i) => (
                  <SwiperSlide key={i} style={{ width: "320px", height: "480px", maxWidth: "80vw" }}>
                    <div className="w-full h-full rounded-2xl overflow-hidden relative group shadow-[0_0_20px_rgba(0,0,0,0.4)]"
                      style={{ border: "2px solid var(--color-border)", background: "var(--color-bg-elevated)" }}>
                      <img src={`${IMAGE_BASE_URL}${p.file_path}`}
                        alt={`Poster ${i + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Premium Glass reflection */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[rgba(255,255,255,0.05)] to-transparent pointer-events-none" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>
        )}

        {/* Videos */}
        {videos.length > 0 && (
          <section>
            <SectionTitle index={3}>Videos</SectionTitle>
            <Swiper modules={[Navigation]} navigation loop spaceBetween={16} slidesPerView={1}>
              {videos.slice(0, 10).map((video, i) => (
                <SwiperSlide key={i}>
                  <div className="relative w-full rounded-2xl overflow-hidden bg-[#0D0F1A]" style={{ height: "clamp(200px, 50vw, 580px)" }}>
                    {/* Background Loader */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                        <FiLoader size={32} style={{ color: "var(--color-accent-gold)", opacity: 0.5 }} />
                      </motion.div>
                    </div>
                    {/* Foreground iframe */}
                    <iframe
                      src={`https://www.youtube.com/embed/${video.key}`}
                      title={video.name}
                      className="absolute inset-0 w-full h-full z-10"
                      allowFullScreen
                      style={{ border: "none" }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        )}

        {/* Reviews */}
        {reviews.length > 0 && (
          <section>
            <SectionTitle index={4}>Reviews</SectionTitle>
            <div className="space-y-4">
              {reviews.map((review) => {
                const truncated =
                  review.content.split(". ").slice(0, 4).join(". ") +
                  (review.content.split(". ").length > 4 ? "..." : "");
                return (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="p-5 rounded-2xl"
                    style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-sm" style={{ color: "var(--color-accent-gold)" }}>
                        {review.author_details?.name || review.author || "Anonymous"}
                      </h4>
                      {review.author_details?.rating && (
                        <span className="text-xs px-2.5 py-1 rounded-full font-bold"
                          style={{ background: "var(--color-accent-gold)", color: "#0D0F1A" }}>
                          ⭐ {review.author_details.rating}/10
                        </span>
                      )}
                    </div>
                    <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--color-text-muted)" }}>
                      {truncated}
                    </p>
                    <button
                      onClick={() => { setSelectedReview(review); setIsModalOpen(true); }}
                      className="text-xs font-semibold underline transition-colors hover:no-underline"
                      style={{ color: "var(--color-accent-indigo)" }}
                    >
                      Read full review →
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </section>
        )}
      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {isModalOpen && selectedReview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            style={{ background: "rgba(0,0,0,0.8)" }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 max-h-[80vh] overflow-y-auto rounded-2xl p-6 shadow-2xl"
              style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold gradient-text-gold">
                  @{selectedReview.author}
                </h3>
                <motion.button
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full transition-colors"
                  style={{ background: "var(--color-bg-elevated)", color: "var(--color-text-muted)" }}
                >
                  <FiX size={18} />
                </motion.button>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                {selectedReview.content}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Details;
