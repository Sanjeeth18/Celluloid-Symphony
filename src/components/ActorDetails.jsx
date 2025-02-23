import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/No_Image_Available.jpg";
import {
  fetchCredits,
  fetchImages,
  fetchMovieCredits,
  fetchReviews,
  fetchTVCredits,
  fetchVideos,
} from "../data/Details";

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

    fetchCredits(
      memberDetails,
      apiKey,
      setMovieCredits,
      setTvCredits,
      setIsLoading
    );
  }, [memberDetails]);

  const clicked = async (item) => {
    const isTVSeries = item.media_type === "tv" || !!item.first_air_date;
    const type = isTVSeries ? "tv" : "movie";

    const reviews = await fetchReviews(item.id, type);
    const videos = await fetchVideos(item.id, type);
    const credits = await (isTVSeries
      ? fetchTVCredits(item.id)
      : fetchMovieCredits(item.id));
    const images = await fetchImages(item.id, type);

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
        <div className="flex flex-col md:flex-row bg-gray-800 rounded-lg shadow-md p-6 md:p-10 max-w-9xl mx-auto h-auto">
          {/* Detail Poster */}
          <div className="w-full md:w-1/2 lg:w-1/3 flex justify-center md:justify-start">
            {memberDetails?.profile_path ? (
              <div className="w-full max-w-xs md:max-w-sm lg:max-w-md">
                <img
                  src={`https://image.tmdb.org/t/p/w500${memberDetails.profile_path}`}
                  alt={memberDetails.name || "Poster"}
                  className="rounded-lg w-full h-full max-h-[60vh] object-cover border-4 border-green-500 shadow-lg"
                />
              </div>
            ) : (
              <div className="w-full max-w-xs md:max-w-sm lg:max-w-md">
                <img
                  src={logo}
                  className="rounded-lg w-full h-full max-h-[60vh] object-cover border-4 border-green-500 shadow-lg"
                  alt="No Image Available"
                />
              </div>
            )}
          </div>

          {/* Detail Info */}
          <div className="w-full md:w-2/3 p-6 shadow-lg overflow-y-auto max-h-[60vh]">
            <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-4 border-b-2 border-green-500 pb-2">
              {memberDetails.name}
            </h2>
            <p className="text-base md:text-lg mb-3">
              <strong className="text-green-400 text-lg md:text-xl">
                Biography:
              </strong>{" "}
              {memberDetails.biography || "No biography available."}
            </p>
            <p className="text-base md:text-lg mb-3">
              <strong className="text-green-400 text-lg md:text-xl">
                BirthDay:
              </strong>{" "}
              ⭐ {memberDetails.birthday || "N/A"}
            </p>
            <p className="text-base md:text-lg mb-3">
              <strong className="text-green-400 text-lg md:text-xl">
                Place of Birth:
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
                    className="bg-gray-800 flex flex-col  p-4 rounded-lg shadow-md"
                    onClick={() => clicked(movie)}
                  >
                    <div className="h-[20vh] md:h-[50vh] ">
                      <img
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : `${logo}`
                        }
                        alt={logo}
                        className="w-full  h-full object-fill rounded-lg hover:cursor-pointer"
                      />
                    </div>
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
                    className="bg-gray-800 flex flex-col  p-4 rounded-lg shadow-md hover:cursor-pointer"
                    onClick={() => clicked(tv)}
                  >
                    <div className="h-[20vh] md:h-[50vh] ">
                      <img
                        src={
                          tv.poster_path
                            ? `https://image.tmdb.org/t/p/w500${tv.poster_path}`
                            : `${logo}`
                        }
                        alt={logo}
                        className="w-full  h-full object-fill rounded-lg"
                      />
                    </div>
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
