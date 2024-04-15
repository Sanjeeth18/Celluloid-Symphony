import React, { useState, useEffect } from 'react';

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/discover/movie?api_key=44138842cb5326f8d36361f3de1243ad'
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
