import React, { useState, useEffect } from 'react';

const Popular = () => {
  const [popular, setpopular] = useState([]);

  useEffect(() => {
    const getpopular = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/movie/popular?api_key=44138842cb5326f8d36361f3de1243ad'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch movie data');
        }
        const data = await response.json();
        setpopular(data.results);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    getpopular();
  }, []);

  return popular;
};

export default Popular;
