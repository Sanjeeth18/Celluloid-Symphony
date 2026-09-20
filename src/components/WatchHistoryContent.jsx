import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWatchHistory } from "../context/WatchHistoryContext";
import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";
import { IMAGE_BASE_URL } from "../services/tmdb";
import {
  FiClock,
  FiTrash2,
  FiSearch,
  FiFilm,
  FiCpu,
  FiCloud,
  FiHardDrive,
  FiStar,
  FiPlay,
} from "react-icons/fi";
import RecommendationsSection from "./RecommendationsSection";

function WatchHistoryContent() {
  const { watchHistory, loadingHistory, removeFromHistory, clearHistory } = useWatchHistory();
  const { user } = useAuth();
  const { navigateToDetails } = useApp();

  const [activeTab, setActiveTab] = useState("history"); // 'history' | 'recommendations'
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all"); // 'all' | 'movie' | 'tv'
  const [showClearModal, setShowClearModal] = useState(false);

  // Filter watch history items
  const filteredHistory = useMemo(() => {
    return watchHistory.filter((item) => {
      const matchesSearch =
        !searchQuery ||
        (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesType =
        filterType === "all" ||
        (filterType === "movie" && (item.media_type === "movie" || !item.media_type)) ||
        (filterType === "tv" && item.media_type === "tv");

      return matchesSearch && matchesType;
    });
  }, [watchHistory, searchQuery, filterType]);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="relative rounded-3xl p-6 lg:p-8 mb-8 overflow-hidden border border-white/10"
        style={{
          background: "linear-gradient(135deg, rgba(24, 21, 49, 0.9), rgba(13, 15, 26, 0.95))",
          boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-xl text-[#0D0F1A]" style={{ background: "var(--color-accent-gold)" }}>
                <FiClock size={22} />
              </span>
              <h1 className="text-2xl lg:text-3xl font-black text-white tracking-wide">
                Watch History & AI Hub
              </h1>
            </div>
            <p className="text-sm text-gray-400">
              Track your watched movies and television series with automatic cloud synchronization.
            </p>
          </div>

          {/* Cloud Sync Status Badge */}
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 bg-white/5 border border-white/10 text-gray-300">
              {user && !user.isDemoUser ? (
                <>
                  <FiCloud className="text-cyan-400 animate-pulse" size={16} />
                  <span>Cloud Synced ({user.displayName})</span>
                </>
              ) : (
                <>
                  <FiHardDrive className="text-amber-400" size={16} />
                  <span>Local Sync (Guest Mode)</span>
                </>
              )}
            </div>

            {watchHistory.length > 0 && activeTab === "history" && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowClearModal(true)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 flex items-center gap-1.5 transition-colors"
              >
                <FiTrash2 size={14} /> Clear History
              </motion.button>
            )}
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mt-6 pt-6 border-t border-white/10">
          <button
            onClick={() => setActiveTab("history")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === "history"
                ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20"
                : "bg-white/5 text-gray-300 hover:bg-white/10"
            }`}
          >
            <FiClock size={16} />
            Watch History ({watchHistory.length})
          </button>
          <button
            onClick={() => setActiveTab("recommendations")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === "recommendations"
                ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20"
                : "bg-white/5 text-gray-300 hover:bg-white/10"
            }`}
          >
            <FiCpu size={16} />
            AI Recommendations
          </button>
        </div>
      </div>

      {/* TAB 1: WATCH HISTORY */}
      {activeTab === "history" && (
        <div>
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search history..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-[#16142A] border border-white/10 text-white outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 bg-[#16142A] p-1 rounded-xl border border-white/10">
              {["all", "movie", "tv"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                    filterType === type
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {type === "all" ? "All Media" : type === "movie" ? "Movies" : "TV Series"}
                </button>
              ))}
            </div>
          </div>

          {/* Items Timeline / Grid */}
          {loadingHistory ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-40 rounded-2xl bg-white/5 animate-pulse" />
              ))}
            </div>
          ) : filteredHistory.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-[#141226] border border-white/10">
              <FiFilm size={48} className="mx-auto text-cyan-400/40 mb-3" />
              <h3 className="text-lg font-bold text-white mb-1">
                {searchQuery ? "No matching history found" : "Your watch history is empty"}
              </h3>
              <p className="text-xs text-gray-400 mb-4">
                Explore movies and click details or watch trailers to automatically build your history.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredHistory.map((item) => {
                const posterUrl = item.poster_path
                  ? `${IMAGE_BASE_URL}${item.poster_path}`
                  : "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&auto=format&fit=crop&q=80";

                const formattedDate = item.watchedAt
                  ? new Date(item.watchedAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Recently";

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="group relative rounded-2xl overflow-hidden bg-[#151328] border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden bg-black/50 cursor-pointer" onClick={() => navigateToDetails(item)}>
                      <img
                        src={item.backdrop_path ? `${IMAGE_BASE_URL}${item.backdrop_path}` : posterUrl}
                        alt={item.title || item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#151328] via-black/20 to-transparent" />

                      {/* Play Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                        <div className="p-3 rounded-full bg-cyan-500 text-black shadow-lg">
                          <FiPlay size={18} className="ml-0.5" />
                        </div>
                      </div>

                      {/* Date Badge */}
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-semibold bg-black/80 text-cyan-300 backdrop-blur-md">
                        {formattedDate}
                      </div>

                      {/* Delete Icon */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromHistory(item.id);
                        }}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/80 text-gray-400 hover:text-red-400 hover:bg-red-500/20 transition-colors"
                        title="Remove from history"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>

                    {/* Meta info */}
                    <div className="p-3">
                      <h4 className="text-sm font-bold text-white line-clamp-1 group-hover:text-cyan-400 transition-colors">
                        {item.title || item.name}
                      </h4>
                      <div className="flex items-center justify-between text-[11px] text-gray-400 mt-1">
                        <span className="flex items-center gap-1">
                          <FiStar size={11} className="text-amber-400 fill-amber-400" />
                          {item.vote_average ? item.vote_average.toFixed(1) : "N/A"}
                        </span>
                        <span className="uppercase text-[10px] px-1.5 py-0.5 rounded bg-white/5 font-mono">
                          {item.media_type || "movie"}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: AI RECOMMENDATIONS */}
      {activeTab === "recommendations" && <RecommendationsSection />}

      {/* Clear Confirmation Modal */}
      <AnimatePresence>
        {showClearModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-md p-6 rounded-2xl bg-[#141226] border border-white/10 shadow-2xl text-center"
            >
              <FiTrash2 size={36} className="mx-auto text-red-400 mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">Clear Watch History?</h3>
              <p className="text-xs text-gray-400 mb-6">
                This will permanently delete your watched titles history across local storage and cloud database.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setShowClearModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    clearHistory();
                    setShowClearModal(false);
                  }}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-red-500 text-white hover:bg-red-600 transition-colors shadow-lg"
                >
                  Confirm Clear
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default WatchHistoryContent;
