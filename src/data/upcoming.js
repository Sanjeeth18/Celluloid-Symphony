import  { useState, useEffect } from 'react';

const Upcoming = () => {
  const [upcome, setUpcome] = useState([]);

  useEffect(() => {
    const getUpcome = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/movie/upcoming?api_key=db8d53ea7f93c34789d584745abbbd08'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch movie data');
        }
        const data = await response.json();
        setUpcome(data.results);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    getUpcome();
  }, []);

  return upcome; 
};

export default Upcoming;
