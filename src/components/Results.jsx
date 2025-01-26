import React, { useEffect } from "react";
import logo from "../assets/No_Image_Available.jpg";
import { useNavigate } from "react-router-dom";

function Results({ query = {} }) {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("query : ", query.searchResults);
  }, [query]);

  const clicked = async (item) => {
    const BASE_URL = "https://api.themoviedb.org/3";

    const fetchReviews = async (id, type) => {
      const url = `${BASE_URL}/${type}/${id}/reviews?language=en-US&page=1`;
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYjhkNTNlYTdmOTNjMzQ3ODlkNTg0NzQ1YWJiYmQwOCIsIm5iZiI6MTczNzgxNjY0Mi44ODQsInN1YiI6IjY3OTRmYTQyMDljMjUyZTNhYjIzNzY4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ySw6r3Llu06lHY-0T75EVLrn71bT41ofcZsDLUg_oPo`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching reviews: ${response.status}`);
        }

        const data = await response.json();
        return data.results;
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
        return [];
      }
    };

    const fetchVideos = async (id, type) => {
      const url = `${BASE_URL}/${type}/${id}/videos?language=en-US`;
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYjhkNTNlYTdmOTNjMzQ3ODlkNTg0NzQ1YWJiYmQwOCIsIm5iZiI6MTczNzgxNjY0Mi44ODQsInN1YiI6IjY3OTRmYTQyMDljMjUyZTNhYjIzNzY4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ySw6r3Llu06lHY-0T75EVLrn71bT41ofcZsDLUg_oPo`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching videos: ${response.status}`);
        }

        const data = await response.json();
        return data.results;
      } catch (error) {
        console.error("Failed to fetch videos:", error);
        return [];
      }
    };

    const fetchTVCredits = async (id) => {
      const url = `${BASE_URL}/tv/${id}/credits?language=en-US`;
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYjhkNTNlYTdmOTNjMzQ3ODlkNTg0NzQ1YWJiYmQwOCIsIm5iZiI6MTczNzgxNjY0Mi44ODQsInN1YiI6IjY3OTRmYTQyMDljMjUyZTNhYjIzNzY4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ySw6r3Llu06lHY-0T75EVLrn71bT41ofcZsDLUg_oPo`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching TV credits: ${response.status}`);
        }

        const data = await response.json();
        return { cast: data.cast, crew: data.crew };
      } catch (error) {
        console.error("Failed to fetch TV credits:", error);
        return { cast: [], crew: [] };
      }
    };

    const fetchMovieCredits = async (id) => {
      const url = `${BASE_URL}/movie/${id}/credits?language=en-US`;
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYjhkNTNlYTdmOTNjMzQ3ODlkNTg0NzQ1YWJiYmQwOCIsIm5iZiI6MTczNzgxNjY0Mi44ODQsInN1YiI6IjY3OTRmYTQyMDljMjUyZTNhYjIzNzY4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ySw6r3Llu06lHY-0T75EVLrn71bT41ofcZsDLUg_oPo`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching movie credits: ${response.status}`);
        }

        const data = await response.json();
        return { cast: data.cast, crew: data.crew };
      } catch (error) {
        console.error("Failed to fetch movie credits:", error);
        return { cast: [], crew: [] };
      }
    };

    const fetchImages = async (id, type) => {
      const url = `${BASE_URL}/${type}/${id}/images`;
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYjhkNTNlYTdmOTNjMzQ3ODlkNTg0NzQ1YWJiYmQwOCIsIm5iZiI6MTczNzgxNjY0Mi44ODQsInN1YiI6IjY3OTRmYTQyMDljMjUyZTNhYjIzNzY4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ySw6r3Llu06lHY-0T75EVLrn71bT41ofcZsDLUg_oPo`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching images: ${response.status}`);
        }

        const data = await response.json();
        return {
          backdrops: data.backdrops || [],
          posters: data.posters || [],
        };
      } catch (error) {
        console.error("Failed to fetch images:", error);
        return { backdrops: [], posters: [] };
      }
    };

    const isTVSeries = item.media_type === "tv" || !!item.first_air_date;
    const type = isTVSeries ? "tv" : "movie";

    const [reviews, videos, credits, images] = await Promise.all([
      fetchReviews(item.id, type),
      fetchVideos(item.id, type),
      isTVSeries ? fetchTVCredits(item.id) : fetchMovieCredits(item.id),
      fetchImages(item.id, type),
    ]);

    navigate("/details", {
      state: {
        item,
        reviews,
        videos,
        cast: credits.cast,
        crew: credits.crew,
        backdrops: images.backdrops,
        posters: images.posters,
      },
    });
  };
  const results = query.searchResults || [];

  return (
    <div className="bg-gray-900 min-h-screen py-16 px-8">
      <h2 className="text-5xl md:text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
        Results
      </h2>
      <div className="container mx-auto mt-10">
        {Array.isArray(results) && results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results
              .filter(
                (result) =>
                  result.media_type === "movie" || result.media_type === "tv"
              )
              .map((result, index) => (
                <div
                  key={index}
                  className="bg-gray-800 flex flex-col justify-between p-4 rounded-lg shadow-md"
                >
                  {result.poster_path || result.backdrop_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${
                        result.poster_path || result.backdrop_path
                      }`}
                      alt={result.title || result.name || "Image"}
                      className="w-full h-fit object-cover rounded-t hover:cursor-pointer"
                      onClick={() => clicked(result)}
                      aria-label={`View details of ${
                        result.title || result.name
                      }`}
                    />
                  ) : (
                    <img
                      src={logo}
                      alt={result.title || result.name || "Image"}
                      className="w-full h-80 object-fill rounded-t hover:cursor-pointer"
                      onClick={() => clicked(result)}
                      aria-label={`View details of ${
                        result.title || result.name
                      }`}
                    />
                  )}
                  <div
                    className="p-2 hover:cursor-pointer"
                    onClick={() => clicked(result)}
                  >
                    <h3 className="text-lg font-bold text-green-400 mt-2">
                      {result.title || result.name || "Unknown Title"}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {result.release_date?.split("-")[0] || "Unknown Year"}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center h-80">
            <img
              src="https://via.placeholder.com/150x150?text=No+Results"
              alt=""
              className="mb-6"
            />
            <p className="text-white text-2xl lg:text-4xl text-center">
              No results found. Try a different search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Results;
