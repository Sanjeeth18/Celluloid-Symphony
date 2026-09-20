import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useWatchHistory } from "../context/WatchHistoryContext";
import { useApp } from "../context/AppContext";
import { getMLRecommendations } from "../services/recommendationEngine";
import { IMAGE_BASE_URL } from "../services/tmdb";
import { FiCpu, FiStar, FiSliders, FiFilm } from "react-icons/fi";
import PreferenceTunerModal from "./PreferenceTunerModal";

function RecommendationsSection() {
  const { watchHistory } = useWatchHistory();
  const { navigateToDetails } = useApp();
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTunerOpen, setIsTunerOpen] = useState(false);
  const [tunerConfig, setTunerConfig] = useState({ weights: {}, minRating: 0 });

  useEffect(() => {
    let isMounted = true;
    async function loadRecs() {
      setIsLoading(true);
      try {
        const recs = await getMLRecommendations(watchHistory, {
          customWeights: tunerConfig.weights,
          minRating: tunerConfig.minRating,
          limit: 10,
        });
        if (isMounted) setRecommendations(recs);
      } catch (err) {
        console.error("Failed to load ML recommendations:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadRecs();
    return () => {
      isMounted = false;
    };
  }, [watchHistory, tunerConfig]);

  return (
    <section className="py-8 px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className="p-1.5 rounded-lg text-[#0D0F1A]"
              style={{ background: "var(--color-accent-gold)" }}
            >
              <FiCpu size={18} />
            </span>
            <h2 className="text-xl lg:text-2xl font-black text-white tracking-wide">
              Recommended For You
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              ML Scored
            </span>
          </div>
          <p className="text-xs lg:text-sm text-gray-400">
            Personalized vector match based on your viewing history and preferences.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsTunerOpen(true)}
          className="px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-lg"
          style={{
            background: "var(--color-bg-elevated)",
            color: "var(--color-accent-gold)",
            border: "1px solid rgba(0,240,255,0.25)",
          }}
        >
          <FiSliders size={16} />
          Tune Preferences
        </motion.button>
      </div>

      {/* Content Grid / Skeleton */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-64 rounded-2xl bg-white/5 animate-pulse border border-white/5"
            />
          ))}
        </div>
      ) : recommendations.length === 0 ? (
        <div className="p-8 rounded-2xl text-center bg-[#151328] border border-white/10">
          <FiFilm size={36} className="mx-auto text-cyan-400/60 mb-2" />
          <p className="text-sm font-semibold text-gray-300">
            Watch a few movies or series to unlock personalized ML recommendations!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {recommendations.map((item, index) => {
            const posterUrl = item.poster_path
              ? `${IMAGE_BASE_URL}${item.poster_path}`
              : "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&auto=format&fit=crop&q=80";

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => navigateToDetails(item)}
                className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-xl flex flex-col bg-[#141226] border border-white/5 hover:border-cyan-500/40 transition-all duration-300"
              >
                {/* Poster Image */}
                <div className="relative aspect-[2/3] overflow-hidden bg-black/40">
                  <img
                    src={posterUrl}
                    alt={item.title || item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141226] via-transparent to-black/30 opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* ML Match Badge */}
                  <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold shadow-lg backdrop-blur-md bg-cyan-500/90 text-black border border-white/20">
                    {item.matchPercentage}% Match
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/70 text-amber-400 backdrop-blur-md flex items-center gap-1">
                    <FiStar size={10} className="fill-amber-400" />
                    {item.vote_average ? item.vote_average.toFixed(1) : "N/A"}
                  </div>
                </div>

                {/* Info Bar */}
                <div className="p-3 flex flex-col flex-grow justify-between">
                  <h3 className="text-xs lg:text-sm font-bold text-white line-clamp-1 group-hover:text-cyan-400 transition-colors">
                    {item.title || item.name}
                  </h3>
                  <div className="flex items-center justify-between text-[11px] text-gray-400 mt-1">
                    <span>{(item.release_date || item.first_air_date || "").slice(0, 4)}</span>
                    <span className="capitalize px-1.5 py-0.5 rounded bg-white/5">
                      {item.media_type || "movie"}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Tuner Modal */}
      <PreferenceTunerModal
        isOpen={isTunerOpen}
        onClose={() => setIsTunerOpen(false)}
        initialWeights={tunerConfig.weights}
        initialMinRating={tunerConfig.minRating}
        onApply={(newConfig) => setTunerConfig(newConfig)}
      />
    </section>
  );
}

export default RecommendationsSection;
