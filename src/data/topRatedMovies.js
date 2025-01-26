import { useState, useEffect } from "react";

const TopSeries = () => {
  const [topSeries, settopSeries] = useState([]);

  useEffect(() => {
    const gettopseries = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/tv/top_rated?api_key=db8d53ea7f93c34789d584745abbbd08"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movie data");
        }
        const data = await response.json();
        settopSeries(data.results);
      } catch (error) {
        console.error("Error fetching series data:", error);
      }
    };

    gettopseries();
  }, []);

  return topSeries;
};

export default TopSeries;
