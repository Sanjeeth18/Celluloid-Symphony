import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiSliders, FiCheck, FiRefreshCw, FiZap } from "react-icons/fi";
import { genres as GENRE_LIST } from "../data/language_genre";

const PRESET_MOODS = [
  { name: "Adrenaline", icon: "💥", genres: [28, 12, 53] },
  { name: "Mind-Bending", icon: "🧪", genres: [878, 9648] },
  { name: "Feel Good", icon: "✨", genres: [35, 10751, 16] },
  { name: "Deep & Dark", icon: "🌘", genres: [18, 80, 27] },
];

function PreferenceTunerModal({ isOpen, onClose, initialWeights = {}, initialMinRating = 0, onApply }) {
  const [weights, setWeights] = useState(initialWeights);
  const [minRating, setMinRating] = useState(initialMinRating);
  const [selectedMood, setSelectedMood] = useState(null);

  if (!isOpen) return null;

  const handleSliderChange = (genreId, value) => {
    setWeights((prev) => ({
      ...prev,
      [genreId]: parseFloat(value),
    }));
    setSelectedMood(null);
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood.name);
    const newWeights = { ...weights };
    GENRE_LIST.forEach((g) => {
      newWeights[g.id] = mood.genres.includes(g.id) ? 2.0 : 0.5;
    });
    setWeights(newWeights);
  };

  const handleReset = () => {
    setWeights({});
    setMinRating(0);
    setSelectedMood(null);
  };

  const handleSave = () => {
    onApply({ weights, minRating });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="w-full max-w-2xl rounded-2xl p-6 overflow-hidden shadow-2xl relative"
          style={{
            background: "linear-gradient(145deg, #121026, #0D0F1A)",
            border: "1px solid rgba(0,240,255,0.25)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(0,240,255,0.15)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border)]">
            <div className="flex items-center gap-3">
              <div
                className="p-2.5 rounded-xl text-[#0D0F1A]"
                style={{ background: "var(--color-accent-gold)" }}
              >
                <FiSliders size={22} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  Recommendation Tuner
                  <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    Smart Scored
                  </span>
                </h3>
                <p className="text-xs text-gray-400">
                  Tune genre weights and rating thresholds to retrain your recommendation vector.
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="py-4 space-y-6 max-h-[65vh] overflow-y-auto pr-2 custom-scrollbar">
            {/* Mood Presets */}
            <div>
              <label className="text-xs uppercase font-bold tracking-wider text-cyan-400 mb-2 block flex items-center gap-1.5">
                <FiZap size={14} /> Quick Mood Presets
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {PRESET_MOODS.map((mood) => {
                  const active = selectedMood === mood.name;
                  return (
                    <button
                      key={mood.name}
                      onClick={() => handleMoodSelect(mood)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                        active
                          ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20 font-bold"
                          : "bg-[#1A1830] text-gray-300 hover:bg-[#252245] border border-white/5"
                      }`}
                    >
                      <span>{mood.icon}</span>
                      <span>{mood.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Minimum Rating Filter */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs uppercase font-bold tracking-wider text-cyan-400">
                  Minimum Rating Filter: <span className="text-amber-400 font-extrabold">{minRating.toFixed(1)}+ ⭐</span>
                </label>
              </div>
              <input
                type="range"
                min="0"
                max="9"
                step="0.5"
                value={minRating}
                onChange={(e) => setMinRating(parseFloat(e.target.value))}
                className="w-full h-2 bg-[#1A1830] rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>

            {/* Genre Weight Sliders */}
            <div>
              <label className="text-xs uppercase font-bold tracking-wider text-cyan-400 mb-3 block">
                Fine-Tune Genre Multipliers
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {GENRE_LIST.map((genre) => {
                  const weightVal = weights[genre.id] !== undefined ? weights[genre.id] : 1.0;
                  return (
                    <div key={genre.id} className="p-3 rounded-xl bg-[#181630] border border-white/5">
                      <div className="flex justify-between items-center text-xs font-semibold mb-1">
                        <span className="text-gray-200">{genre.name}</span>
                        <span
                          className={`font-mono font-bold ${
                            weightVal > 1.2
                              ? "text-cyan-400"
                              : weightVal < 0.8
                              ? "text-gray-500"
                              : "text-amber-400"
                          }`}
                        >
                          {weightVal.toFixed(1)}x
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0.2"
                        max="2.5"
                        step="0.1"
                        value={weightVal}
                        onChange={(e) => handleSliderChange(genre.id, e.target.value)}
                        className="w-full h-1.5 bg-black/40 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between gap-3">
            <button
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-400 hover:text-white flex items-center gap-1.5 hover:bg-white/5 transition-colors"
            >
              <FiRefreshCw size={14} /> Reset Vector
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-300 hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-black flex items-center gap-2 shadow-lg transition-transform active:scale-95"
                style={{ background: "var(--color-accent-gold)" }}
              >
                <FiCheck size={16} /> Retrain Recommendations
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default PreferenceTunerModal;
