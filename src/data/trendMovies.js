import { useState, useEffect } from 'react';

const TrendMovies = () => {
  const [TrendMovieList, setTrendMovieList] = useState([]);

  useEffect(() => {
    const getTrendMovie = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/trending/movie/week?api_key=db8d53ea7f93c34789d584745abbbd08&language=en-US'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch movie data');
        }
        const data = await response.json();
        setTrendMovieList(data.results);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    getTrendMovie();
  }, []);

  return TrendMovieList;
};

export default TrendMovies;
