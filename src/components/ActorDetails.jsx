import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/No_Image_Available.jpg";
import { fetchPersonMovieCredits, fetchPersonTVCredits } from "../services/tmdb";
import SkeletonCard from "./ui/SkeletonCard";
import MovieCard from "./ui/MovieCard";
import { FiMapPin, FiCalendar, FiUser } from "react-icons/fi";

function ActorsDetails() {
  const location                          = useLocation();
  const [movieCredits, setMovieCredits]   = useState([]);
  const [tvCredits, setTvCredits]         = useState([]);
  const [isLoading, setIsLoading]         = useState(true);
  const [showMoreMovies, setShowMoreMovies] = useState(false);
  const [showMoreTv, setShowMoreTv]       = useState(false);
  const memberDetails                     = location.state?.memberDetails;

  useEffect(() => {
    if (!memberDetails) return;
    setIsLoading(true);
    Promise.all([
      fetchPersonMovieCredits(memberDetails.id),
      fetchPersonTVCredits(memberDetails.id),
    ]).then(([movies, tv]) => {
      setMovieCredits(movies.cast || []);
      setTvCredits(tv.cast || []);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, [memberDetails]);

  if (!memberDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--color-bg-primary)", paddingTop: "80px" }}>
        <p style={{ color: "var(--color-text-muted)" }}>No actor details available.</p>
      </div>
    );
  }

  const renderMovies  = showMoreMovies ? movieCredits : movieCredits.slice(0, 8);
  const renderTvShows = showMoreTv     ? tvCredits     : tvCredits.slice(0, 8);

  const InfoItem = ({ icon: Icon, label, value }) => value ? (
    <div className="flex items-start gap-3">
      <Icon size={15} className="mt-0.5 flex-shrink-0" style={{ color: "var(--color-accent-gold)" }} />
      <div>
        <span className="text-xs uppercase tracking-wider font-semibold block" style={{ color: "var(--color-text-dim)" }}>{label}</span>
        <span className="text-sm" style={{ color: "var(--color-text-primary)" }}>{value}</span>
      </div>
    </div>
  ) : null;

  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg-primary)", paddingTop: "80px" }}>
      <div className="container mx-auto px-4 lg:px-8 py-10">

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row gap-8 p-6 md:p-10 rounded-2xl mb-12"
          style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}
        >
          {/* Photo */}
          <div className="flex-shrink-0 flex justify-center md:justify-start">
            <div className="relative">
              <img
                src={memberDetails.profile_path
                  ? `https://image.tmdb.org/t/p/w500${memberDetails.profile_path}`
                  : logo}
                alt={memberDetails.name}
                className="w-48 md:w-60 lg:w-72 rounded-2xl object-cover shadow-2xl"
                style={{ border: "3px solid var(--color-accent-gold)" }}
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 overflow-y-auto max-h-[60vh]">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-black gradient-text-gold mb-2"
            >
              {memberDetails.name}
            </motion.h2>
            <div className="h-0.5 w-20 rounded-full mb-6" style={{ background: "linear-gradient(90deg, var(--color-accent-gold), transparent)" }} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <InfoItem icon={FiCalendar} label="Birthday"      value={memberDetails.birthday} />
              <InfoItem icon={FiMapPin}   label="Place of Birth" value={memberDetails.place_of_birth} />
              <InfoItem icon={FiUser}     label="Known For"      value={memberDetails.known_for_department} />
            </div>

            {memberDetails.biography && (
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold mb-2" style={{ color: "var(--color-text-dim)" }}>Biography</p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                  {memberDetails.biography}
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Credits */}
        {isLoading ? (
          <SkeletonCard variant="grid" count={8} />
        ) : (
          <>
            {/* Movies */}
            <section className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black gradient-text-gold">Movies</h2>
                  <div className="h-0.5 w-12 rounded-full mt-1" style={{ background: "linear-gradient(90deg, var(--color-accent-gold), transparent)" }} />
                </div>
                {movieCredits.length > 8 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowMoreMovies(!showMoreMovies)}
                    className="text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
                    style={{ background: "var(--color-bg-elevated)", color: "var(--color-accent-gold)", border: "1px solid var(--color-border)" }}
                  >
                    {showMoreMovies ? "Show Less" : "Show More"}
                  </motion.button>
                )}
              </div>
              {renderMovies.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {renderMovies.map((movie, i) => (
                    <MovieCard key={movie.id} item={movie} isMovie={true} index={i} />
                  ))}
                </div>
              ) : (
                <p style={{ color: "var(--color-text-muted)" }}>No movies available.</p>
              )}
            </section>

            {/* TV Shows */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black gradient-text-gold">TV Shows</h2>
                  <div className="h-0.5 w-12 rounded-full mt-1" style={{ background: "linear-gradient(90deg, var(--color-accent-gold), transparent)" }} />
                </div>
                {tvCredits.length > 8 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowMoreTv(!showMoreTv)}
                    className="text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
                    style={{ background: "var(--color-bg-elevated)", color: "var(--color-accent-gold)", border: "1px solid var(--color-border)" }}
                  >
                    {showMoreTv ? "Show Less" : "Show More"}
                  </motion.button>
                )}
              </div>
              {renderTvShows.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {renderTvShows.map((tv, i) => (
                    <MovieCard key={tv.id} item={tv} isMovie={false} index={i} />
                  ))}
                </div>
              ) : (
                <p style={{ color: "var(--color-text-muted)" }}>No TV shows available.</p>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default ActorsDetails;
