/**
 * data/Details.js — now re-exports from the centralized services/tmdb.js
 * Kept for backward compatibility. Use services/tmdb.js for new code.
 */
export {
  fetchReviews,
  fetchVideos,
  fetchMovieCredits,
  fetchTVCredits,
  fetchImages,
} from "../services/tmdb";

// Legacy fetchCredits helper (used only in old ActorDetails — now replaced)
export const fetchCredits = async (memberDetails, apiKey, setMovieCredits, setTvCredits, setIsLoading) => {
  const BASE_URL = "/api";
  try {
    setIsLoading(true);
    const [movieRes, tvRes] = await Promise.all([
      fetch(`${BASE_URL}/person?action=movie_credits&id=${memberDetails.id}`),
      fetch(`${BASE_URL}/person?action=tv_credits&id=${memberDetails.id}`),
    ]);
    const [movieData, tvData] = await Promise.all([movieRes.json(), tvRes.json()]);
    setMovieCredits(movieData.cast || []);
    setTvCredits(tvData.cast || []);
  } catch (error) {
    console.error("Error fetching credits:", error);
  } finally {
    setIsLoading(false);
  }
};
