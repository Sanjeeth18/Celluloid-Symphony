import  { useState, useEffect } from 'react';

const PlayingList = () => {
  const [playList, setplayList] = useState([]);

  useEffect(() => {
    const getplaylist = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/movie/now_playing?api_key=db8d53ea7f93c34789d584745abbbd08'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch movie data');
        }
        const data = await response.json();
        setplayList(data.results);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    getplaylist();
  }, []);

  return playList;
};

export default PlayingList;
