import React from "react";
import MovieList from "../data/moviedata";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import { useNavigate } from "react-router-dom";

export default () => {
  const navigate = useNavigate();
  const movieList = MovieList();
  const baseUrl = "https://image.tmdb.org/t/p/original";
  
  const clicked = (movie) => {
    console.log(movie);
    navigate("/details", { state: { movie } });
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
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return (
              `<span class="${className} w-3 h-3 md:w-4 md:h-4 bg-blue-500 rounded-full"></span>`
            );
          },
        }}
        navigation={true}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        className="w-full sm:h-[50%] h-screen"
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

      {/* Optional Search bar component */}
      <div className="search-bar w-full max-w-md mx-auto mt-8 mb-4">
        <input
          type="text"
          placeholder="Search for a movie..."
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};
