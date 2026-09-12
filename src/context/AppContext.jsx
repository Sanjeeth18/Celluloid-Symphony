import React, { createContext, useContext, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllDetails, fetchPersonDetails } from "../services/tmdb";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);

  // Shared navigation to movie/series details
  const navigateToDetails = useCallback(async (item) => {
    setIsNavigating(true);
    try {
      const isTVSeries = item.media_type === "tv" || !!item.first_air_date;
      const type = isTVSeries ? "tv" : "movie";

      const data = await fetchAllDetails(item.id, type);

      navigate("/details", {
        state: {
          item: data,
          reviews: data.reviews?.results || [],
          videos: data.videos?.results || [],
          cast: data.credits?.cast || [],
          crew: data.credits?.crew || [],
          backdrops: data.images?.backdrops || [],
          posters: data.images?.posters || [],
        },
      });
    } catch (error) {
      console.error("Error fetching movie details:", error);
    } finally {
      setIsNavigating(false);
    }
  }, [navigate]);

  // Navigate to actor details
  const navigateToActor = useCallback(async (memberId) => {
    setIsNavigating(true);
    try {
      const memberDetails = await fetchPersonDetails(memberId);
      navigate("/actors", { state: { memberDetails } });
    } catch (error) {
      console.error("Error fetching actor details:", error);
    } finally {
      setIsNavigating(false);
    }
  }, [navigate]);

  return (
    <AppContext.Provider value={{ navigateToDetails, navigateToActor, isNavigating }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
