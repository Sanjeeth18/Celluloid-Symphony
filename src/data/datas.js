import { useState, useEffect } from "react";

const fetchData = async (url, setData) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    setData(data.results);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  useEffect(() => {
    fetchData(
      "https://api.themoviedb.org/3/discover/movie?api_key=db8d53ea7f93c34789d584745abbbd08",
      setMovieList
    );
  }, []);
  return movieList;
};

const SeriesList = () => {
  const [seriesList, setSeriesList] = useState([]);
  useEffect(() => {
    fetchData(
      "https://api.themoviedb.org/3/discover/tv?api_key=db8d53ea7f93c34789d584745abbbd08",
      setSeriesList
    );
  }, []);
  return seriesList;
};

const TrendMovies = () => {
  const [trendMovieList, setTrendMovieList] = useState([]);
  useEffect(() => {
    fetchData(
      "https://api.themoviedb.org/3/trending/movie/week?api_key=db8d53ea7f93c34789d584745abbbd08&language=en-US",
      setTrendMovieList
    );
  }, []);
  return trendMovieList;
};

export { MovieList, SeriesList, TrendMovies };
