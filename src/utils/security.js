/**
 * Application Security & Input Hardening Utilities for Celluloid Symphony
 */

/**
 * Sanitizes input string to prevent XSS (Cross-Site Scripting) injection attacks.
 * Converts dangerous HTML control characters to safe entity equivalents.
 */
export function sanitizeInput(input) {
  if (typeof input !== "string") return "";
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .replace(/script/gi, "");
}

/**
 * Validates and cleans search queries before firing network requests.
 * Trims whitespace, truncates max length, and removes invalid control chars.
 */
export function sanitizeSearchQuery(query) {
  if (typeof query !== "string") return "";
  // Strip control characters and sanitize
  const cleaned = query.trim().replace(/[\u0000-\u001F\u007F]/g, "");
  return cleaned.slice(0, 100); // Enforce max 100 chars
}

/**
 * Client-Side Rate Limiter / Debouncer
 * Prevents rapid-fire API flooding and DOS-like network bursts.
 */
export function createDebounce(fn, delay = 300) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

/**
 * Safe JSON Parser with fallback to prevent unexpected payload crash vulnerabilities.
 */
export function safeJsonParse(jsonString, fallback = null) {
  try {
    return jsonString ? JSON.parse(jsonString) : fallback;
  } catch (err) {
    console.warn("Security Alert: Invalid JSON string supplied to safeJsonParse", err);
    return fallback;
  }
}

/**
 * Validates item objects before writing to local storage or Firebase to ensure schema integrity.
 */
export function validateMediaItem(item) {
  if (!item || typeof item !== "object") return null;
  if (!item.id || (typeof item.id !== "number" && typeof item.id !== "string")) return null;

  return {
    id: String(item.id),
    title: sanitizeInput(item.title || item.name || "Untitled"),
    name: sanitizeInput(item.name || item.title || "Untitled"),
    poster_path: typeof item.poster_path === "string" ? item.poster_path : null,
    backdrop_path: typeof item.backdrop_path === "string" ? item.backdrop_path : null,
    overview: sanitizeInput(item.overview || "").slice(0, 500),
    vote_average: typeof item.vote_average === "number" ? Math.min(10, Math.max(0, item.vote_average)) : 0,
    media_type: item.media_type === "tv" ? "tv" : "movie",
    genre_ids: Array.isArray(item.genre_ids) ? item.genre_ids.filter((g) => typeof g === "number") : [],
    genres: Array.isArray(item.genres) ? item.genres : [],
    release_date: item.release_date || item.first_air_date || "",
    watchedAt: item.watchedAt || new Date().toISOString(),
  };
}
