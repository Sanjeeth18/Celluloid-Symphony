import React from "react";
import { motion } from "framer-motion";
import logo from "../../assets/No_Image_Available.jpg";
import { IMAGE_W500_URL } from "../../services/tmdb";
import { useApp } from "../../context/AppContext";

/**
 * Reusable movie/series card used in Results, ActorDetails grids.
 * Handles poster fallback, click navigation, and Framer Motion hover.
 */
function MovieCard({ item, isMovie = true, index = 0 }) {
  const { navigateToDetails } = useApp();

  const title = isMovie ? item.title : (item.name || item.title);
  const date = isMovie
    ? item.release_date
    : (item.first_air_date || item.release_date);
  const posterSrc = item.poster_path
    ? `${IMAGE_W500_URL}${item.poster_path}`
    : logo;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.03, y: -4 }}
      className="group rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-gold-glow transition-shadow duration-300"
      style={{ background: "var(--color-bg-card)" }}
      onClick={() => navigateToDetails(item)}
    >
      {/* Poster */}
      <div className="aspect-[2/3] overflow-hidden relative">
        <img
          src={posterSrc}
          alt={title || "Movie Poster"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Rating badge */}
        {item.vote_average > 0 && (
          <div
            className="absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-full"
            style={{ background: "var(--color-accent-gold)", color: "#0D0F1A" }}
          >
            ⭐ {item.vote_average?.toFixed(1)}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3
          className="text-base font-bold truncate mb-1 group-hover:transition-colors duration-200"
          style={{ color: "var(--color-accent-gold)" }}
        >
          {title || "Unknown Title"}
        </h3>
        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
          {date ? date.split("-")[0] : "Unknown Year"}
        </p>
      </div>
    </motion.div>
  );
}

export default MovieCard;
