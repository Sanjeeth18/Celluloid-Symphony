import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { searchMulti } from "../services/tmdb";
import { FiSearch, FiX, FiMenu, FiFilm } from "react-icons/fi";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

function Header() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Shrink header on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchResults([]);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close menu on route change
  useEffect(() => { setIsMenuOpen(false); }, [location.pathname]);

  const handleChange = async (e) => {
    const val = e.target.value;
    setQuery(val);
    if (!val.trim()) { setSearchResults([]); return; }
    try {
      const results = await searchMulti(val);
      setSearchResults(results.slice(0, 5));
    } catch (_) { }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!query.trim()) return;
    setIsLoading(true);
    try {
      const results = await searchMulti(query);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-2 shadow-xl" : "py-4"
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
        <div className="flex items-center w-full justify-between lg:justify-start">
          {/* ── Logo ── */}
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
                background: "linear-gradient(135deg, var(--color-accent-gold), var(--color-accent-gold2))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Celluloid Symphony
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-1 ml-8">
            {NAV_LINKS.map(({ to, label }) => {
              const active = location.pathname === to;
              return (
                <Link key={to} to={to}>
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
                        style={{ background: "rgba(0,240,255,0.1)", border: "1px solid rgba(0,240,255,0.3)" }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          {/* ── Mobile Menu Button ── */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="lg:hidden p-2 rounded-xl transition-colors"
            style={{ color: "var(--color-text-primary)", background: "var(--color-bg-elevated)" }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </motion.button>

          {/* ── Search ── */}
          <div className="hidden lg:block ml-auto relative" ref={searchRef}>
            <form onSubmit={handleSubmit} className="flex items-center">
              <div
                className="flex items-center rounded-xl overflow-hidden transition-all duration-300"
                style={{
                  background: "var(--color-bg-elevated)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <input
                  className="px-4 py-2.5 w-56 bg-transparent text-sm outline-none placeholder-gray-500"
                  style={{ color: "var(--color-text-primary)" }}
                  placeholder="Search movies, series..."
                  onChange={handleChange}
                  value={query}
                />
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.95 }}
                  disabled={isLoading}
                  className="px-4 py-2.5 transition-colors flex items-center justify-center"
                  style={{ color: "var(--color-accent-gold)" }}
                  aria-label="Search"
                >
                  {isLoading ? (
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                      <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" className="opacity-75" />
                    </svg>
                  ) : (
                    <FiSearch size={18} />
                  )}
                </motion.button>
              </div>
            </form>

            {/* Search Suggestions Dropdown */}
            <AnimatePresence>
              {searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full mt-2 w-full rounded-xl overflow-hidden shadow-2xl"
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
                      onMouseEnter={(e) => e.currentTarget.style.background = "var(--color-bg-elevated)"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                      onClick={() => handleSuggestionClick(result)}
                    >
                      <FiFilm size={14} style={{ color: "var(--color-accent-gold)", flexShrink: 0 }} />
                      <span className="truncate">{result.title || result.name}</span>
                      <span className="ml-auto text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                        style={{ background: "var(--color-bg-elevated)", color: "var(--color-text-muted)" }}>
                        {result.media_type}
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Mobile Dropdown Menu ── */}
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
                    className="block px-4 py-3.5 rounded-xl font-bold transition-all text-center"
                    style={{
                      color: active ? "#0D0F1A" : "var(--color-text-primary)",
                      background: active ? "var(--color-accent-gold)" : "var(--color-bg-elevated)",
                      border: active ? "none" : "1px solid var(--color-border)"
                    }}
                  >
                    {label}
                  </Link>
                );
              })}

              {/* Mobile Search */}
              <form onSubmit={handleSubmit} className="flex items-center rounded-xl overflow-hidden mt-2"
                style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}>
                <input
                  className="flex-1 px-4 py-3.5 bg-transparent text-sm outline-none"
                  style={{ color: "var(--color-text-primary)" }}
                  placeholder="Search movies, series..."
                  onChange={handleChange}
                  value={query}
                />
                <button type="submit" className="px-5 flex items-center justify-center h-full" style={{ color: "var(--color-accent-gold)" }}>
                  <FiSearch size={20} />
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
