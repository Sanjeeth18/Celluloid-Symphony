import React, { useState, useEffect } from 'react';

const SeriesList = () => {
  const [seriesList, setseriesList] = useState([]);

  useEffect(() => {
    const getseries = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/discover/tv?api_key=44138842cb5326f8d36361f3de1243ad'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch movie data');
        }
        const data = await response.json();
        setseriesList(data.results);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    getseries();
  }, []);

  return seriesList;
};

export default SeriesList;
