import React, { useState } from "react";
import MovieList from "../data/moviedata";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";

import { useMediaQuery } from "react-responsive";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import { useNavigate } from "react-router-dom";

export default () => {
  const smallScreen=useMediaQuery({query:'(max-width: 640px)'})
  const navigate = useNavigate();
  const movieList = MovieList();
  const baseUrl = "https://image.tmdb.org/t/p/original";
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const clicked = (movie) => {
    console.log(movie);
    navigate("/details", { state: { movie } });
  };

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=44138842cb5326f8d36361f3de1243ad&query=${query}`
      );
      const data = await response.json();
      setIsLoading(false);
      navigate("/search", { state: { searchResults: data.results } });
    } catch (error) {
      console.error("Error fetching search results:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center py-8">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        pagination={
          !smallScreen
            ? {
                clickable: true,
                renderBullet: (index, className) => {
                  return `<span class="${className} w-3 h-3 md:w-4 md:h-4 bg-blue-500 rounded-full"></span>`;
                },
              }
            : false
        }        navigation={true}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        className="w-full sm:h-[50%] "
      >
        {movieList.map((movie, index) => (
          <SwiperSlide
            key={index}
            className="w-[80%] sm:w-[60%] md:w-[40%] lg:w-[30%] xl:w-[25%] h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]"
          >
            <div className="group relative shadow-xl rounded-xl overflow-hidden w-full h-full">
              <img
                onClick={() => clicked(movie)}
                src={`${baseUrl}${movie.poster_path}`}
                alt={`Movie Poster ${index}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-base sm:text-lg font-bold">
                  {movie.title}
                </h3>
                <p className="text-sm mt-1">⭐ {movie.vote_average}</p>
                <p className="text-sm font-semibold mt-2">
                  {movie.release_date}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Search bar component */}
      <div className="search-bar w-full max-w-md mx-auto mt-8">
        <form onSubmit={handleSearchSubmit} className="flex items-center">
          <input
            type="text"
            placeholder="Search for a movie..."
            className="w-full p-3 rounded-l-lg text-black outline-none focus:ring-2 focus:ring-pink-400"
            onChange={handleSearchChange}
          />
          <button
            className="flex py-3 px-5 bg-gradient-to-r from-red-400 to-purple-500 hover:from-purple-500 hover:to-red-400 text-white rounded-r-lg shadow-md hover:shadow-lg transition"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="animate-spin w-5 h-5"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 2.137.842 4.084 2.209 5.561l1.791-1.27z"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="white"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
