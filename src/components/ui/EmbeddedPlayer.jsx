import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiTv, FiFilm, FiExternalLink, FiPlay } from "react-icons/fi";

function EmbeddedPlayer({ 
  showPlayer, 
  onClose, 
  isTVSeries, 
  detail, 
  season, 
  setSeason, 
  episode, 
  setEpisode, 
  playerUrl 
}) {
  const handleWatch = () => {
    window.open(playerUrl, "_blank", "noopener,noreferrer");
  };

  return (
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
              onClick={onClose}
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
                  onChange={(e) => {
                    setSeason(Number(e.target.value));
                    setEpisode(1);
                  }}
                  className="bg-transparent text-sm font-bold outline-none cursor-pointer"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {Array.from({ length: detail.number_of_seasons || 1 }).map((_, i) => (
                    <option key={i + 1} value={i + 1} className="bg-gray-900 text-white">Season {i + 1}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--color-text-dim)" }}>Episode</label>
                <input
                  type="number"
                  min="1"
                  value={episode}
                  onChange={(e) => {
                    setEpisode(Number(e.target.value) || 1);
                  }}
                  className="bg-transparent text-sm font-bold outline-none w-16"
                  style={{ color: "var(--color-text-primary)" }}
                />
              </div>
            </div>
          )}

          {/* Launch Player Area */}
          <div
            className="relative w-full aspect-video flex flex-col items-center justify-center gap-6"
            style={{
              background: "radial-gradient(ellipse at center, rgba(0,240,255,0.06) 0%, #000 70%)"
            }}
          >
            {/* Decorative pulsing ring */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="w-52 h-52 rounded-full border animate-ping"
                style={{ borderColor: "var(--color-accent-gold)", opacity: 0.08, animationDuration: "2.5s" }}
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="w-36 h-36 rounded-full border"
                style={{ borderColor: "var(--color-accent-gold)", opacity: 0.18 }}
              />
            </div>

            {/* Launch button */}
            <div className="relative z-10 flex flex-col items-center gap-4 px-6 text-center">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWatch}
                className="flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-black shadow-2xl"
                style={{
                  background: "var(--color-accent-gold)",
                  color: "#0D0F1A",
                  boxShadow: "0 0 40px rgba(0,240,255,0.35)",
                }}
              >
                <FiPlay size={20} fill="currentColor" />
                {isTVSeries
                  ? `Play S${String(season).padStart(2,"0")} E${String(episode).padStart(2,"0")}`
                  : "Play Movie"}
                <FiExternalLink size={16} />
              </motion.button>
              <p className="text-xs max-w-xs" style={{ color: "var(--color-text-dim)" }}>
                Opens in a new tab · Powered by VidSrc
              </p>
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

export default EmbeddedPlayer;
