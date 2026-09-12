/**
 * data/datas.js — Legacy hooks kept for reference.
 * New code should use hooks/useMovieData.js (React Query powered).
 */
import { useState, useEffect } from "react";
import { fetchMovieList, fetchSeriesList, fetchTrendingMovies } from "../services/tmdb";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  useEffect(() => {
    fetchMovieList().then(setMovieList).catch(console.error);
  }, []);
  return movieList;
};

const SeriesList = () => {
  const [seriesList, setSeriesList] = useState([]);
  useEffect(() => {
    fetchSeriesList().then(setSeriesList).catch(console.error);
  }, []);
  return seriesList;
};

const TrendMovies = () => {
  const [trendList, setTrendList] = useState([]);
  useEffect(() => {
    fetchTrendingMovies().then(setTrendList).catch(console.error);
  }, []);
  return trendList;
};

export { MovieList, SeriesList, TrendMovies };
