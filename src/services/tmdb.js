// Centralized TMDB API service - single source of truth for all API calls
const BASE_URL = "/api";

export const IMAGE_BASE_URL = process.env.REACT_APP_TMDB_IMAGE_BASE_URL || "https://image.tmdb.org/t/p/original";
export const IMAGE_W500_URL = "https://image.tmdb.org/t/p/w500";

// ─── Generic fetch helper for Vercel API Proxy ───────────────────────────────
const fetchFromProxy = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`API Proxy error: ${response.status}`);
  const data = await response.json();
  return data.results ?? data;
};

// ─── Movie Lists ───────────────────────────────────────────────────────────────
export const fetchMovieList = () =>
  fetchFromProxy(`${BASE_URL}/movies?action=discover`);

export const fetchSeriesList = () =>
  fetchFromProxy(`${BASE_URL}/tv?action=discover`);

export const fetchTrendingMovies = () =>
  fetchFromProxy(`${BASE_URL}/movies?action=trending`);

export const fetchFilteredContent = (year, isMovie) => {
  const type = isMovie ? "movies" : "tv";
  const yearParam = year ? `&year=${year}` : "";
  return fetchFromProxy(`${BASE_URL}/${type}?action=filtered${yearParam}`);
};

// ─── Movie Details ─────────────────────────────────────────────────────────────
export const fetchReviews = (id, type) =>
  fetchFromProxy(`${BASE_URL}/details?action=reviews&type=${type}&id=${id}`);

export const fetchVideos = (id, type) =>
  fetchFromProxy(`${BASE_URL}/details?action=videos&type=${type}&id=${id}`);

export const fetchMovieCredits = (id) =>
  fetchFromProxy(`${BASE_URL}/details?action=credits&type=movie&id=${id}`);

export const fetchTVCredits = (id) =>
  fetchFromProxy(`${BASE_URL}/details?action=credits&type=tv&id=${id}`);

export const fetchImages = (id, type) =>
  fetchFromProxy(`${BASE_URL}/details?action=images&type=${type}&id=${id}`);

export const fetchAllDetails = (id, type) =>
  fetchFromProxy(`${BASE_URL}/details?action=all&type=${type}&id=${id}`);

export const fetchPersonDetails = (memberId) =>
  fetch(`${BASE_URL}/person?action=details&id=${memberId}`).then((r) => r.json());

export const fetchPersonMovieCredits = (personId) =>
  fetch(`${BASE_URL}/person?action=movie_credits&id=${personId}`).then((r) => r.json());

export const fetchPersonTVCredits = (personId) =>
  fetch(`${BASE_URL}/person?action=tv_credits&id=${personId}`).then((r) => r.json());

export const searchMulti = (query) =>
  fetch(`${BASE_URL}/search?query=${encodeURIComponent(query)}`)
    .then((r) => r.json())
    .then((d) => d.results || []);
