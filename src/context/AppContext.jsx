import React, { createContext, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { fetchReviews, fetchVideos, fetchMovieCredits, fetchTVCredits, fetchImages, fetchPersonDetails } from "../services/tmdb";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const navigate = useNavigate();

  // ── Shared navigation to movie/series details ─────────────────────────────
  const navigateToDetails = useCallback(async (item) => {
    const isTVSeries = item.media_type === "tv" || !!item.first_air_date;
    const type = isTVSeries ? "tv" : "movie";

    const [reviews, videos, credits, images] = await Promise.all([
      fetchReviews(item.id, type),
      fetchVideos(item.id, type),
      isTVSeries ? fetchTVCredits(item.id) : fetchMovieCredits(item.id),
      fetchImages(item.id, type),
    ]);

    navigate("/details", {
      state: {
        item,
        reviews,
        videos,
        cast: credits.cast,
        crew: credits.crew,
        backdrops: images.backdrops,
        posters: images.posters,
      },
    });
  }, [navigate]);

  // ── Navigate to actor details ─────────────────────────────────────────────
  const navigateToActor = useCallback(async (memberId) => {
    try {
      const memberDetails = await fetchPersonDetails(memberId);
      navigate("/actors", { state: { memberDetails } });
    } catch (error) {
      console.error("Error fetching actor details:", error);
    }
  }, [navigate]);

  return (
    <AppContext.Provider value={{ navigateToDetails, navigateToActor }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
