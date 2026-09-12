import { useQuery } from "@tanstack/react-query";
import {
  fetchMovieList,
  fetchSeriesList,
  fetchTrendingMovies,
  fetchFilteredContent,
} from "../services/tmdb";

// Stale time: 5 minutes – data is fresh enough for a movie app
const STALE_TIME = 5 * 60 * 1000;

export const useMovieList = () =>
  useQuery({
    queryKey: ["movies", "discover"],
    queryFn: fetchMovieList,
    staleTime: STALE_TIME,
  });

export const useSeriesList = () =>
  useQuery({
    queryKey: ["series", "discover"],
    queryFn: fetchSeriesList,
    staleTime: STALE_TIME,
  });

export const useTrendingMovies = () =>
  useQuery({
    queryKey: ["movies", "trending"],
    queryFn: fetchTrendingMovies,
    staleTime: STALE_TIME,
  });

export const useFilteredContent = (year, isMovie) =>
  useQuery({
    queryKey: ["filtered", isMovie ? "movie" : "tv", year],
    queryFn: () => fetchFilteredContent(year, isMovie),
    staleTime: STALE_TIME,
  });
