import React from "react";
import MovieList from "../data/moviedata";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";
import logo from "../assets/No_Image_Available.jpg";
import { useMediaQuery } from "react-responsive";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import { useNavigate } from "react-router-dom";

export default () => {
  const smallScreen = useMediaQuery({ query: "(max-width: 640px)" });
  const navigate = useNavigate();
  const movieList = MovieList();
  const baseUrl = "https://image.tmdb.org/t/p/original";

  const clicked = (movie) => {
    console.log(movie);
    navigate("/details", { state: { movie } });
  };

  return (
    <div className="flex flex-col  items-center py-8 bg-gray-900 text-white">
      <h2 className="text-4xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 py-5">
        Featured Movies
      </h2>
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
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={
          !smallScreen
            ? {
                clickable: true,
                renderBullet: (index, className) => {
                  return `<span class="${className} w-3 h-3 md:w-4 md:h-4 bg-green-400 rounded-full"></span>`;
                },
              }
            : false
        }
        navigation={true}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        className="w-full sm:h-[50%]"
      >
        {movieList.map((movie, index) => (
          <SwiperSlide
            key={index}
            className="w-[80%] sm:w-[60%] md:w-[40%] lg:w-[30%] xl:w-[25%] h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] text-black"
          >
            <div className="group relative shadow-lg rounded-xl overflow-hidden w-full h-full">
              {movie.poster_path ? (
                <img
                  onClick={() => clicked(movie)}
                  src={`${baseUrl}${movie.poster_path}`}
                  alt={`Movie Poster ${index}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <img
                  src={logo}
                  alt="No poster available"
                  className="w-full sm:h-50 md:h-80 object-fill rounded"
                />
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

              {/* Movie Info */}
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-base sm:text-lg font-bold">
                  {movie.title}
                </h3>
                <p className="text-sm mt-1 text-yellow-400">
                  ⭐ {movie.vote_average}
                </p>
                <p className="text-sm font-semibold mt-2 text-gray-300">
                  {movie.release_date}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
