import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/No_Image_Available.jpg";

function ActorsDetails() {
  const location = useLocation();
  const [movieCredits, setMovieCredits] = useState([]);
  const [tvCredits, setTvCredits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showMoreMovies, setShowMoreMovies] = useState(false);
  const [showMoreTv, setShowMoreTv] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const memberDetails = location.state?.memberDetails;
  const apiKey = "db8d53ea7f93c34789d584745abbbd08";
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setRefresh(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!memberDetails) return;

    const fetchCredits = async () => {
      try {
        setIsLoading(true);

        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/person/${memberDetails.id}/movie_credits?api_key=${apiKey}&language=en-US`
        );
        const movieData = await movieResponse.json();
        setMovieCredits(movieData.cast || []);

        const tvResponse = await fetch(
          `https://api.themoviedb.org/3/person/${memberDetails.id}/tv_credits?api_key=${apiKey}&language=en-US`
        );
        const tvData = await tvResponse.json();
        setTvCredits(tvData.cast || []);
      } catch (error) {
        console.error("Error fetching credits:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCredits();
  }, [memberDetails]);

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

  const renderMovies = showMoreMovies ? movieCredits : movieCredits.slice(0, 8); // Show 8 items initially
  const renderTvShows = showMoreTv ? tvCredits : tvCredits.slice(0, 8);

  if (!memberDetails) {
    return (
      <div className="overflow-hidden scroll-smooth">
        <div className="p-4 bg-gradient-to-b bg-gray-900 shadow-lg text-gray-100">
          <p>No actor details available.</p>
        </div>
      </div>
    );
  }

  if (refresh) {
    return (
      <div className="p-4 bg-gradient-to-b bg-gray-900 shadow-lg text-gray-100">
        <div className="container mx-auto p-4">
          <div className="flex flex-col md:flex-row bg-gray-800 rounded-lg shadow-md animate-pulse">
            {/* Shimmer for Poster */}
            <div className="w-full md:w-1/3 p-4 bg-gray-800 flex-shrink-0">
              <div className="h-64 bg-gray-700 rounded-lg"></div>
            </div>

            {/* Shimmer for Detail Info */}
            <div className="w-full md:w-2/3 p-6 shadow-lg">
              <div className="h-8 bg-gray-700 rounded-lg mb-4"></div>
              <div className="h-6 bg-gray-700 rounded-lg mb-3"></div>
              <div className="h-6 bg-gray-700 rounded-lg mb-3"></div>
              <div className="h-6 bg-gray-700 rounded-lg mb-3"></div>
              <div className="h-6 bg-gray-700 rounded-lg mb-3"></div>
              <div className="h-6 bg-gray-700 rounded-lg mb-3"></div>
              <div className="h-24 bg-gray-700 rounded-lg mt-4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gradient-to-b bg-gray-900 shadow-lg text-gray-100">
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row bg-gray-800 rounded-lg shadow-md">
          {/* Detail Poster */}
          <div className="w-full md:w-1/3 p-4 bg-gray-800 flex-shrink-0">
            {memberDetails?.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${memberDetails.profile_path}`}
                alt={memberDetails.name || "Poster"}
                className="rounded-lg w-full h-auto object-cover mx-auto border-4 border-green-500 shadow-lg"
              />
            ) : (
              <img
                src={logo}
                className="w-full h-auto object-fill rounded border-4 border-green-500 shadow-lg"
                alt="No Image Available"
              />
            )}
          </div>

          {/* Detail Info */}
          <div className="w-full md:w-2/3 p-6 shadow-lg">
            <h2 className="text-4xl text-left font-bold text-green-400 mb-4 border-b-2 border-green-500 pb-2">
              {memberDetails.name}
            </h2>
            <p className="text-lg mb-3 text-left">
              <strong className="text-green-400 text-xl">Biography :</strong>{" "}
              {memberDetails.biography || "No biography available."}
            </p>
            <p className="text-lg mb-3 text-left">
              <strong className="text-green-400 text-xl">BirthDay :</strong> ⭐{" "}
              {memberDetails.birthday || "N/A"}
            </p>
            <p className="text-lg mb-3 text-left">
              <strong className="text-green-400 text-xl">
                Place of Birth :
              </strong>{" "}
              {memberDetails.place_of_birth || "N/A"}
            </p>
          </div>
        </div>
        {/* Loading Spinner */}
        {isLoading ? (
          <p className="text-center text-gray-300 mt-6">Loading credits...</p>
        ) : (
          <div className="mt-8">
            {/* Movie Credits */}
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-green-400 mb-4 border-b-2 border-green-500 pb-2">
                Movies
              </h2>
              {movieCredits.length > 8 && (
                <button
                  className="text-green-400 hover:text-green-600 font-semibold hover:cursor-pointer"
                  onClick={() => setShowMoreMovies(!showMoreMovies)}
                >
                  {showMoreMovies ? "Show Less" : "Show More"}
                </button>
              )}
            </div>
            {renderMovies.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {renderMovies.map((movie) => (
                  <div
                    key={movie.id}
                    className="bg-gray-800 flex flex-col justify-between p-4 rounded-lg shadow-md"
                    onClick={() => clicked(movie)}
                  >
                    <img
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : `${logo}`
                      }
                      alt={logo}
                      className="w-full  h-fit object-cover rounded-lg hover:cursor-pointer"
                    />
                    <div className=" hover:cursor-pointer">
                      <h3 className="text-lg font-bold text-green-400 mt-2">
                        {movie.title}
                      </h3>
                      <p className="text-sm text-gray-400">
                        Release Date: {movie.release_date || "N/A"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">There are no movies available.</p>
            )}

            {/* TV Credits */}
            <div className="flex justify-between items-center mt-8">
              <h2 className="text-3xl font-bold text-green-400 mb-4 border-b-2 border-green-500 pb-2">
                TV Shows
              </h2>
              {tvCredits.length > 8 && (
                <button
                  className="text-green-400 hover:text-green-600 font-semibold hover:cursor-pointer"
                  onClick={() => setShowMoreTv(!showMoreTv)}
                >
                  {showMoreTv ? "Show Less" : "Show More"}
                </button>
              )}
            </div>
            {renderTvShows.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {renderTvShows.map((tv) => (
                  <div
                    key={tv.id}
                    className="bg-gray-800 flex flex-col justify-between p-4 rounded-lg shadow-md hover:cursor-pointer"
                    onClick={() => clicked(tv)}
                  >
                    <img
                      src={
                        tv.poster_path
                          ? `https://image.tmdb.org/t/p/w500${tv.poster_path}`
                          : `${logo}`
                      }
                      alt={logo}
                      className="w-full  h-fit object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-green-400 mt-2">
                        {tv.name || tv.title}
                      </h3>
                      <p className="text-sm text-gray-400">
                        Release Date: {tv.first_air_date || "N/A"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">There are no series available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ActorsDetails;
