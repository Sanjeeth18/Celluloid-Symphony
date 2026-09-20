import { fetchMovieList, fetchTrendingMovies, fetchSeriesList } from "./tmdb";

// Standard TMDB Genre IDs
const GENRE_IDS = [
  28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878, 10770, 53, 10752, 37,
];

/**
 * Encodes a movie item's genres into a normalized multi-hot feature vector.
 */
function extractGenreVector(item) {
  const vector = new Array(GENRE_IDS.length).fill(0);
  let itemGenreIds = [];

  if (Array.isArray(item.genre_ids) && item.genre_ids.length > 0) {
    itemGenreIds = item.genre_ids;
  } else if (Array.isArray(item.genres) && item.genres.length > 0) {
    itemGenreIds = item.genres.map((g) => (typeof g === "object" ? g.id : g));
  } else if (item.genre_id) {
    itemGenreIds = [item.genre_id];
  }

  itemGenreIds.forEach((id) => {
    const idx = GENRE_IDS.indexOf(Number(id));
    if (idx !== -1) vector[idx] = 1;
  });

  // Normalize vector to unit length
  const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
  return magnitude > 0 ? vector.map((val) => val / magnitude) : vector;
}

/**
 * Computes the User Interest Vector based on Watch History recency decay and frequency.
 */
export function buildUserProfileVector(watchHistory, customGenreWeights = {}) {
  const userVector = new Array(GENRE_IDS.length).fill(0);

  if (!watchHistory || watchHistory.length === 0) {
    // Default uniform profile if history is empty
    return userVector.fill(1 / Math.sqrt(GENRE_IDS.length));
  }

  const now = Date.now();

  watchHistory.forEach((item, index) => {
    const itemVector = extractGenreVector(item);
    // Recency decay weight: recent items have higher impact
    const watchedTime = item.watchedAt ? new Date(item.watchedAt).getTime() : now;
    const daysAgo = Math.max(0, (now - watchedTime) / (1000 * 60 * 60 * 24));
    const recencyWeight = Math.exp(-0.05 * daysAgo); // Exponential decay

    // Position rank weight (most recently watched first)
    const positionWeight = 1 / (1 + index * 0.1);
    const weight = recencyWeight * positionWeight;

    itemVector.forEach((val, i) => {
      userVector[i] += val * weight;
    });
  });

  // Apply user's explicit preference tuner weights if provided
  GENRE_IDS.forEach((id, i) => {
    if (customGenreWeights[id]) {
      userVector[i] *= customGenreWeights[id];
    }
  });

  // Normalize user vector
  const magnitude = Math.sqrt(userVector.reduce((sum, val) => sum + val * val, 0));
  return magnitude > 0 ? userVector.map((val) => val / magnitude) : userVector;
}

/**
 * Calculates Cosine Similarity between User Profile vector and Candidate Movie vector.
 */
export function calculateCosineSimilarity(vecA, vecB) {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 0;

  let dotProduct = 0;
  let magA = 0;
  let magB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    magA += vecA[i] * vecA[i];
    magB += vecB[i] * vecB[i];
  }

  magA = Math.sqrt(magA);
  magB = Math.sqrt(magB);

  if (magA === 0 || magB === 0) return 0;
  return dotProduct / (magA * magB);
}

/**
 * Machine Learning Hybrid Recommendation Engine
 * Fetches candidate movies, builds feature vectors, computes cosine similarity matrix,
 * incorporates TMDB vote average & popularity, and returns top ML-scored recommendations.
 */
export async function getMLRecommendations(watchHistory = [], options = {}) {
  const {
    customWeights = {},
    minRating = 0,
    limit = 12,
    searchTerms = [],
  } = options;

  try {
    // 1. Build User Profile Vector
    const userVector = buildUserProfileVector(watchHistory, customWeights);

    // 2. Fetch Candidate Movies Pool from TMDB endpoints
    const [popularMovies, trendingMovies, seriesList] = await Promise.allSettled([
      fetchMovieList(),
      fetchTrendingMovies(),
      fetchSeriesList(),
    ]);

    const candidateMap = new Map();

    const addCandidates = (result) => {
      if (result.status === "fulfilled" && Array.isArray(result.value)) {
        result.value.forEach((item) => {
          if (item && item.id && !candidateMap.has(String(item.id))) {
            candidateMap.set(String(item.id), item);
          }
        });
      }
    };

    addCandidates(popularMovies);
    addCandidates(trendingMovies);
    addCandidates(seriesList);

    const candidates = Array.from(candidateMap.values());
    const watchedIds = new Set(watchHistory.map((item) => String(item.id)));

    // 3. Compute ML Scores for each candidate
    const scoredCandidates = candidates.map((movie) => {
      const movieVector = extractGenreVector(movie);
      const genreSim = calculateCosineSimilarity(userVector, movieVector);

      // Normalized rating score (0 to 1)
      const ratingScore = movie.vote_average ? Math.min(10, movie.vote_average) / 10 : 0.5;

      // Normalized popularity score
      const popScore = movie.popularity ? Math.min(1, Math.log10(movie.popularity) / 4) : 0.3;

      // Search keyword similarity bonus
      let searchBonus = 0;
      if (searchTerms.length > 0) {
        const titleLower = (movie.title || movie.name || "").toLowerCase();
        const overviewLower = (movie.overview || "").toLowerCase();
        searchTerms.forEach((term) => {
          if (titleLower.includes(term.toLowerCase()) || overviewLower.includes(term.toLowerCase())) {
            searchBonus += 0.15;
          }
        });
      }

      // Penalty if item was already watched (keep fresh)
      const watchedPenalty = watchedIds.has(String(movie.id)) ? 0.4 : 0;

      // Hybrid Weighting Formula:
      // Final Score = 0.50 * GenreSim + 0.25 * RatingScore + 0.15 * PopScore + 0.10 * SearchBonus - WatchedPenalty
      const hybridScore =
        0.5 * genreSim +
        0.25 * ratingScore +
        0.15 * popScore +
        0.1 * searchBonus -
        watchedPenalty;

      // Convert hybrid score to a user-friendly match percentage (65% to 99%)
      const matchPercentage = Math.min(99, Math.max(65, Math.round(65 + hybridScore * 34)));

      return {
        ...movie,
        mlScore: hybridScore,
        matchPercentage,
        genreSim,
      };
    });

    // 4. Filter by rating threshold & sort descending by ML score
    const filtered = scoredCandidates
      .filter((m) => (m.vote_average || 0) >= minRating)
      .sort((a, b) => b.mlScore - a.mlScore);

    return filtered.slice(0, limit);
  } catch (error) {
    console.error("Error in ML Recommendation Engine:", error);
    return [];
  }
}
