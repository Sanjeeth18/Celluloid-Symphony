import React, { useState, useEffect } from 'react';

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/discover/movie?api_key=db8d53ea7f93c34789d584745abbbd08'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch movie data');
        }
        const data = await response.json();
        setMovieList(data.results);
      } catch (error)  {
        console.error('Error fetching movie data:', error);
      }
    };

    getMovie();
  }, []);

  return movieList;
};

export default MovieList;
