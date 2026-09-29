import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiTv, FiFilm, FiLoader, FiZap, FiAlertCircle, FiRefreshCw } from "react-icons/fi";

// ─── Streaming source definitions ────────────────────────────────────────────
const SOURCES = [
  {
    id: "vidsrc",
    label: "VidSrc",
    color: "#00f0ff",
    movie: (id) => `https://vidsrc.cc/v2/embed/movie/${id}`,
    tv:    (id, s, e) => `https://vidsrc.cc/v2/embed/tv/${id}/${s}/${e}`,
  },
  {
    id: "embedmaster",
    label: "EmbedMaster",
    color: "#a78bfa",
    movie: (id) => `https://embedmaster.link/embed/movie/${id}`,
    tv:    (id, s, e) => `https://embedmaster.link/embed/tv/${id}/${s}/${e}`,
  },
  {
    id: "superembed",
    label: "SuperEmbed",
    color: "#f59e0b",
    movie: (id) => `https://multiembed.mov/?video_id=${id}&tmdb=1`,
    tv:    (id, s, e) => `https://multiembed.mov/?video_id=${id}&tmdb=1&s=${s}&e=${e}`,
  },
  {
    id: "primesrc",
    label: "PrimeSrc",
    color: "#34d399",
    movie: (id) => `https://primesrc.net/embed/movie/${id}`,
    tv:    (id, s, e) => `https://primesrc.net/embed/tv/${id}/${s}/${e}`,
  },
  {
    id: "frembed",
    label: "Frembed",
    color: "#f87171",
    movie: (id) => `https://frembed.live/api/film.php?id=${id}`,
    tv:    (id, s, e) => `https://frembed.live/api/serie.php?id=${id}&sa=${s}&epi=${e}`,
  },
  {
    id: "autoembed",
    label: "AutoEmbed",
    color: "#fb923c",
    movie: (id) => `https://autoembed.co/movie/tmdb/${id}`,
    tv:    (id, s, e) => `https://autoembed.co/tv/tmdb/${id}-${s}-${e}`,
  },
  {
    id: "superflixapi",
    label: "SuperFlixAPI",
    color: "#e879f9",
    movie: (id) => `https://superflixapi.top/filme/${id}`,
    tv:    (id, s, e) => `https://superflixapi.top/serie/${id}/${s}/${e}`,
  },
];

function EmbeddedPlayer({
  showPlayer,
  onClose,
  isTVSeries,
  detail,
  season,
  setSeason,
  episode,
  setEpisode,
}) {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [sourceId, setSourceId]             = useState(SOURCES[0].id);
  const [iframeError, setIframeError]       = useState(false);
  const [refreshKey, setRefreshKey]         = useState(0);

  const activeSource = useMemo(
    () => SOURCES.find((s) => s.id === sourceId) || SOURCES[0],
    [sourceId]
  );

  const playerUrl = useMemo(() => {
    if (!detail?.id) return "";
    return isTVSeries
      ? activeSource.tv(detail.id, season, episode)
      : activeSource.movie(detail.id);
  }, [activeSource, detail?.id, isTVSeries, season, episode]);

  const iframeKey = `${playerUrl}-${refreshKey}`;

  const handleSourceChange = (id) => {
    setSourceId(id);
    setIsIframeLoaded(false);
    setIframeError(false);
  };

  const handleRefresh = () => {
    setIsIframeLoaded(false);
    setIframeError(false);
    setRefreshKey((k) => k + 1);
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
          {/* ── Player Header ─────────────────────────────── */}
          <div
            className="flex items-center justify-between p-4 md:p-5"
            style={{ borderBottom: "1px solid var(--color-border)" }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl" style={{ background: "rgba(0,240,255,0.15)" }}>
                {isTVSeries
                  ? <FiTv  size={18} style={{ color: "var(--color-accent-gold)" }} />
                  : <FiFilm size={18} style={{ color: "var(--color-accent-gold)" }} />}
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest font-bold" style={{ color: "var(--color-accent-gold)" }}>
                  Now Playing
                </p>
                <p className="text-sm font-bold text-white">
                  {detail.title || detail.name}
                  {isTVSeries && ` — S${String(season).padStart(2, "0")} E${String(episode).padStart(2, "0")}`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Refresh button */}
              <motion.button
                whileHover={{ rotate: 180, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                onClick={handleRefresh}
                title="Reload player"
                className="p-2 rounded-xl"
                style={{ background: "var(--color-bg-elevated)", color: "var(--color-text-muted)" }}
              >
                <FiRefreshCw size={16} />
              </motion.button>
              {/* Close button */}
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
          </div>

          {/* ── Source Picker ──────────────────────────────── */}
          <div
            className="flex items-center gap-2 px-4 py-3 overflow-x-auto"
            style={{ borderBottom: "1px solid var(--color-border)", background: "rgba(0,0,0,0.25)" }}
          >
            <FiZap size={13} style={{ color: "var(--color-text-dim)", flexShrink: 0 }} />
            <span
              className="text-xs font-bold uppercase tracking-widest mr-1 flex-shrink-0"
              style={{ color: "var(--color-text-dim)" }}
            >
              Source
            </span>
            {SOURCES.map((src) => {
              const isActive = src.id === sourceId;
              return (
                <motion.button
                  key={src.id}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSourceChange(src.id)}
                  className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200"
                  style={{
                    background: isActive ? src.color : "rgba(255,255,255,0.07)",
                    color: isActive ? "#0D0F1A" : "rgba(255,255,255,0.6)",
                    border: isActive ? `1px solid ${src.color}` : "1px solid rgba(255,255,255,0.1)",
                    boxShadow: isActive ? `0 0 14px ${src.color}60` : "none",
                  }}
                >
                  {src.label}
                </motion.button>
              );
            })}
          </div>

          {/* ── Season / Episode Controls (TV only) ───────── */}
          {isTVSeries && (
            <div className="flex flex-wrap gap-4 px-5 py-3" style={{ borderBottom: "1px solid var(--color-border)" }}>
              <div className="flex items-center gap-2">
                <label className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--color-text-dim)" }}>
                  Season
                </label>
                <select
                  value={season}
                  onChange={(e) => {
                    setSeason(Number(e.target.value));
                    setEpisode(1);
                    setIsIframeLoaded(false);
                    setIframeError(false);
                  }}
                  className="bg-transparent text-sm font-bold outline-none cursor-pointer"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {Array.from({ length: detail.number_of_seasons || 1 }).map((_, i) => (
                    <option key={i + 1} value={i + 1} className="bg-gray-900 text-white">
                      Season {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--color-text-dim)" }}>
                  Episode
                </label>
                <input
                  type="number"
                  min="1"
                  value={episode}
                  onChange={(e) => {
                    setEpisode(Number(e.target.value) || 1);
                    setIsIframeLoaded(false);
                    setIframeError(false);
                  }}
                  className="bg-transparent text-sm font-bold outline-none w-16"
                  style={{ color: "var(--color-text-primary)" }}
                />
              </div>
            </div>
          )}

          {/* ── iframe Player ─────────────────────────────── */}
          <div className="relative w-full aspect-video bg-black">
            {/* Loading skeleton */}
            {!isIframeLoaded && !iframeError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10 gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <FiLoader size={32} style={{ color: activeSource.color }} />
                </motion.div>
                <p className="text-xs font-bold tracking-widest text-white animate-pulse">
                  CONNECTING TO {activeSource.label.toUpperCase()}...
                </p>
              </div>
            )}

            {/* Error / blocked state */}
            {iframeError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-10 gap-4 px-6 text-center">
                <FiAlertCircle size={36} style={{ color: "#f87171" }} />
                <p className="text-sm font-bold text-white">This source couldn't load.</p>
                <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                  Try another source from the bar above, or hit the refresh button.
                </p>
                <div className="flex gap-3 flex-wrap justify-center">
                  {SOURCES.filter((s) => s.id !== sourceId).slice(0, 3).map((alt) => (
                    <motion.button
                      key={alt.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSourceChange(alt.id)}
                      className="px-3 py-1.5 rounded-full text-xs font-bold"
                      style={{
                        background: alt.color,
                        color: "#0D0F1A",
                        boxShadow: `0 0 10px ${alt.color}50`,
                      }}
                    >
                      Try {alt.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            <iframe
              key={iframeKey}
              src={playerUrl}
              className="w-full h-full border-0 absolute inset-0"
              title="Media Player"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="no-referrer"
              onLoad={() => {
                setIsIframeLoaded(true);
                setIframeError(false);
              }}
              onError={() => {
                setIsIframeLoaded(true);
                setIframeError(true);
              }}
            />
          </div>

          {/* ── Active source info bar ────────────────────── */}
          <div
            className="flex items-center justify-between px-4 py-2"
            style={{ background: "rgba(0,0,0,0.3)", borderTop: "1px solid var(--color-border)" }}
          >
            <span className="text-xs" style={{ color: "var(--color-text-dim)" }}>
              Streaming via{" "}
              <span className="font-bold" style={{ color: activeSource.color }}>
                {activeSource.label}
              </span>
            </span>
            <span className="text-xs" style={{ color: "var(--color-text-dim)" }}>
              {SOURCES.indexOf(activeSource) + 1} / {SOURCES.length} sources
            </span>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

export default EmbeddedPlayer;
