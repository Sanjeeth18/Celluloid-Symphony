import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { searchMulti } from "../services/tmdb";
import { useAuth } from "../context/AuthContext";
import { sanitizeSearchQuery } from "../utils/security";
import {
  FiSearch,
  FiX,
  FiMenu,
  FiFilm,
  FiClock,
  FiLogOut,
  FiChevronDown,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/history", label: "Watch History" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

function Header() {
  const { user, loginWithGoogle, logout } = useAuth();
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const searchRef = useRef(null);
  const userMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Shrink header on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchResults([]);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  const handleChange = async (e) => {
    const rawVal = e.target.value;
    setQuery(rawVal);

    const sanitized = sanitizeSearchQuery(rawVal);
    if (!sanitized) {
      setSearchResults([]);
      return;
    }

    try {
      const results = await searchMulti(sanitized);
      setSearchResults(results.slice(0, 5));
    } catch (_) {}
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    const sanitized = sanitizeSearchQuery(query);
    if (!sanitized) return;

    setIsLoading(true);
    try {
      const results = await searchMulti(sanitized);
      navigate("/search", { state: { searchResults: results } });
      setSearchResults([]);
      setQuery("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (item) => {
    setQuery(item.title || item.name);
    setSearchResults([]);
    navigate("/search", { state: { searchResults: [item] } });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2 shadow-xl" : "py-4"
      }`}
      style={{
        background: scrolled
          ? "rgba(13, 15, 26, 0.92)"
          : "rgba(13, 15, 26, 0.75)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0,240,255,0.1)",
      }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center w-full justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="p-1.5 rounded-lg"
              style={{ background: "var(--color-accent-gold)", color: "#0D0F1A" }}
            >
              <FiFilm size={20} />
            </motion.div>
            <span
              className="text-xl lg:text-2xl font-black tracking-tight hidden sm:block"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-accent-gold), var(--color-accent-gold2))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Celluloid Symphony
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ to, label }) => {
              const active = location.pathname === to;
              return (
                <Link key={to} to={to} state={{ fromApp: true }}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative px-4 py-2 rounded-xl text-sm font-semibold transition-colors duration-200"
                    style={{
                      color: active ? "var(--color-accent-gold)" : "var(--color-text-muted)",
                    }}
                  >
                    {label}
                    {active && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background: "rgba(0,240,255,0.1)",
                          border: "1px solid rgba(0,240,255,0.3)",
                        }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          {/* Right Controls: Search + Google Auth */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Search Input */}
            <div className="hidden md:block relative" ref={searchRef}>
              <form onSubmit={handleSubmit} className="flex items-center">
                <div
                  className="flex items-center rounded-xl overflow-hidden transition-all duration-300"
                  style={{
                    background: "var(--color-bg-elevated)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <input
                    className="px-4 py-2 w-48 lg:w-56 bg-transparent text-sm outline-none placeholder-gray-500"
                    style={{ color: "var(--color-text-primary)" }}
                    placeholder="Search movies, series..."
                    onChange={handleChange}
                    value={query}
                  />
                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.95 }}
                    disabled={isLoading}
                    className="px-3.5 py-2 transition-colors flex items-center justify-center"
                    style={{ color: "var(--color-accent-gold)" }}
                    aria-label="Search"
                  >
                    {isLoading ? (
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" className="opacity-75" />
                      </svg>
                    ) : (
                      <FiSearch size={17} />
                    )}
                  </motion.button>
                </div>
              </form>

              {/* Suggestions Dropdown */}
              <AnimatePresence>
                {searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full mt-2 w-full rounded-xl overflow-hidden shadow-2xl z-50"
                    style={{
                      background: "var(--color-bg-card)",
                      border: "1px solid var(--color-border)",
                      backdropFilter: "blur(16px)",
                    }}
                  >
                    {searchResults.map((result) => (
                      <div
                        key={result.id}
                        className="px-4 py-3 cursor-pointer transition-colors text-sm font-medium flex items-center gap-3"
                        style={{ color: "var(--color-text-primary)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-bg-elevated)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        onClick={() => handleSuggestionClick(result)}
                      >
                        <FiFilm size={14} style={{ color: "var(--color-accent-gold)", flexShrink: 0 }} />
                        <span className="truncate">{result.title || result.name}</span>
                        <span
                          className="ml-auto text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                          style={{ background: "var(--color-bg-elevated)", color: "var(--color-text-muted)" }}
                        >
                          {result.media_type}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Google Authentication Section */}
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl border border-cyan-500/30 bg-[#16142A] hover:border-cyan-400 transition-colors"
                >
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-8 h-8 rounded-lg object-cover border border-white/10"
                  />
                  <span className="text-xs font-bold text-white hidden sm:block max-w-[100px] truncate">
                    {user.displayName}
                  </span>
                  <FiChevronDown size={14} className="text-gray-400" />
                </motion.button>

                {/* User Dropdown */}
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-56 rounded-2xl p-2 shadow-2xl bg-[#141226] border border-white/10 backdrop-blur-xl z-50"
                    >
                      <div className="px-3 py-2 border-b border-white/5 mb-1">
                        <p className="text-xs font-bold text-white truncate">{user.displayName}</p>
                        <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
                      </div>

                      <Link
                        to="/history"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-200 hover:bg-white/10 hover:text-cyan-300 transition-colors"
                      >
                        <FiClock size={15} /> Watch History
                      </Link>

                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors mt-1"
                      >
                        <FiLogOut size={15} /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={loginWithGoogle}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-white text-black hover:bg-gray-100 transition-all shadow-md"
              >
                <FcGoogle size={18} />
                <span>Sign-In</span>
              </motion.button>
            )}

            {/* Mobile Menu Toggle Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="lg:hidden p-2 rounded-xl transition-colors"
              style={{ color: "var(--color-text-primary)", background: "var(--color-bg-elevated)" }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden w-full overflow-hidden shadow-2xl border-b border-[var(--color-border)] bg-[#0A0915]"
          >
            <div className="px-4 py-5 flex flex-col gap-3">
              {/* Nav Links */}
              {NAV_LINKS.map(({ to, label }) => {
                const active = location.pathname === to;
                return (
                  <Link
                    key={to}
                    to={to}
                    state={{ fromApp: true }}
                    className="block px-4 py-3 rounded-xl font-bold transition-all text-center text-sm"
                    style={{
                      color: active ? "#0D0F1A" : "var(--color-text-primary)",
                      background: active ? "var(--color-accent-gold)" : "var(--color-bg-elevated)",
                      border: active ? "none" : "1px solid var(--color-border)",
                    }}
                  >
                    {label}
                  </Link>
                );
              })}

              {/* Mobile Search */}
              <form onSubmit={handleSubmit} className="flex items-center rounded-xl overflow-hidden mt-2" style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}>
                <input
                  className="flex-1 px-4 py-3 bg-transparent text-xs outline-none text-white"
                  placeholder="Search movies, series..."
                  onChange={handleChange}
                  value={query}
                />
                <button type="submit" className="px-4 flex items-center justify-center h-full" style={{ color: "var(--color-accent-gold)" }}>
                  <FiSearch size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Header;
