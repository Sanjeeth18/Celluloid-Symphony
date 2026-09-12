import React from "react";
import { motion } from "framer-motion";
import MovieCard from "./ui/MovieCard";
import { FiSearch } from "react-icons/fi";

function Results({ query = {} }) {
  const results = query.searchResults || [];
  const filtered = Array.isArray(results)
    ? results.filter((r) => r.media_type === "movie" || r.media_type === "tv")
    : [];

  return (
    <div className="min-h-screen py-20 px-4 md:px-8" style={{ background: "var(--color-bg-primary)" }}>
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
          style={{ background: "rgba(0,240,255,0.1)", border: "1px solid var(--color-border)" }}>
          <FiSearch size={24} style={{ color: "var(--color-accent-gold)" }} />
        </div>
        <h2 className="text-4xl md:text-6xl font-black gradient-text-cinema">Search Results</h2>
        {filtered.length > 0 && (
          <p className="mt-3 text-sm" style={{ color: "var(--color-text-muted)" }}>
            Found <span style={{ color: "var(--color-accent-gold)" }} className="font-bold">{filtered.length}</span> results
          </p>
        )}
      </motion.div>

      <div className="container mx-auto">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 min-[480px]:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
            {filtered.map((result, index) => (
              <MovieCard
                key={result.id ?? index}
                item={result}
                isMovie={result.media_type === "movie"}
                index={index}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="text-6xl mb-6">🎬</div>
            <p className="text-2xl font-bold mb-2" style={{ color: "var(--color-text-primary)" }}>
              No results found
            </p>
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              Try a different search term or explore our trending sections
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Results;
