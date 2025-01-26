import { useState, useEffect } from "react";

const TopMovies = () => {
  const [topMovies, settopMovies] = useState([]);

  useEffect(() => {
    const gettopmovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/top_rated?api_key=db8d53ea7f93c34789d584745abbbd08"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movie data");
        }
        const data = await response.json();
        settopMovies(data.results);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    gettopmovies();
  }, []);

  return topMovies;
};

export default TopMovies;
