import { useState, useEffect } from 'react';

const TrendSeries = () => {
  const [TrendSeriesList, setTrendSeriesList] = useState([]);

  useEffect(() => {
    const getTrendSeries = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/trending/tv/week?api_key=db8d53ea7f93c34789d584745abbbd08&language=en-US'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch series data');
        }
        const data = await response.json();
        setTrendSeriesList(data.results);
      } catch (error) {
        console.error('Error fetching series data:', error);
      }
    };

    getTrendSeries();
  }, []);

  return TrendSeriesList;
};

export default TrendSeries;
