// Centralized TMDB API service - single source of truth for all API calls
const BASE_URL = process.env.REACT_APP_TMDB_BASE_URL || "https://api.themoviedb.org/3";
const API_KEY = process.env.REACT_APP_TMDB_API_KEY || "db8d53ea7f93c34789d584745abbbd08";
const AUTH_TOKEN =
  process.env.REACT_APP_TMDB_AUTH_TOKEN ||
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYjhkNTNlYTdmOTNjMzQ3ODlkNTg0NzQ1YWJiYmQwOCIsIm5iZiI6MTczNzgxNjY0Mi44ODQsInN1YiI6IjY3OTRmYTQyMDljMjUyZTNhYjIzNzY4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ySw6r3Llu06lHY-0T75EVLrn71bT41ofcZsDLUg_oPo";

export const IMAGE_BASE_URL = process.env.REACT_APP_TMDB_IMAGE_BASE_URL || "https://image.tmdb.org/t/p/original";
export const IMAGE_W500_URL = "https://image.tmdb.org/t/p/w500";

// ─── Auth Headers ──────────────────────────────────────────────────────────────
const authHeaders = {
  Authorization: `Bearer ${AUTH_TOKEN}`,
  "Content-Type": "application/json",
};

// ─── Generic fetch with auth token ────────────────────────────────────────────
const fetchWithAuth = async (url) => {
  const response = await fetch(url, { headers: authHeaders });
  if (!response.ok) throw new Error(`TMDB API error: ${response.status}`);
  const data = await response.json();
  return data.results ?? data;
};

// ─── Generic fetch with API key ───────────────────────────────────────────────
const fetchWithKey = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`TMDB API error: ${response.status}`);
  const data = await response.json();
  return data.results ?? [];
};

// ─── Movie Lists ───────────────────────────────────────────────────────────────
export const fetchMovieList = () =>
  fetchWithKey(`${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`);

export const fetchSeriesList = () =>
  fetchWithKey(`${BASE_URL}/discover/tv?api_key=${API_KEY}&sort_by=popularity.desc`);

export const fetchTrendingMovies = () =>
  fetchWithKey(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US`);

export const fetchFilteredContent = (year, isMovie) => {
  const type = isMovie ? "movie" : "tv";
  const yearParam = year ? `&primary_release_year=${year}` : "";
  return fetchWithKey(
    `${BASE_URL}/discover/${type}?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc${yearParam}`
  );
};

// ─── Movie Details ─────────────────────────────────────────────────────────────
export const fetchReviews = (id, type) =>
  fetchWithAuth(`${BASE_URL}/${type}/${id}/reviews?language=en-US&page=1`);

export const fetchVideos = (id, type) =>
  fetchWithAuth(`${BASE_URL}/${type}/${id}/videos?language=en-US`);

export const fetchMovieCredits = (id) =>
  fetchWithAuth(`${BASE_URL}/movie/${id}/credits?language=en-US`);

export const fetchTVCredits = (id) =>
  fetchWithAuth(`${BASE_URL}/tv/${id}/credits?language=en-US`);

export const fetchImages = (id, type) =>
  fetchWithAuth(`${BASE_URL}/${type}/${id}/images`);

export const fetchPersonDetails = (memberId) =>
  fetch(`${BASE_URL}/person/${memberId}?api_key=${API_KEY}&language=en-US`)
    .then((r) => r.json());

export const fetchPersonMovieCredits = (personId) =>
  fetch(`${BASE_URL}/person/${personId}/movie_credits?api_key=${API_KEY}&language=en-US`)
    .then((r) => r.json());

export const fetchPersonTVCredits = (personId) =>
  fetch(`${BASE_URL}/person/${personId}/tv_credits?api_key=${API_KEY}&language=en-US`)
    .then((r) => r.json());

export const searchMulti = (query) =>
  fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`)
    .then((r) => r.json())
    .then((d) => d.results || []);
