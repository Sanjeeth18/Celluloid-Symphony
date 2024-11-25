import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import SeriesList from "../data/seriesdata";
import Popular from "../data/Popular";

function Nowplaying() {
  const navigate = useNavigate();
  const serieslist = SeriesList();
  const popmovie = Popular();

  const clicked = (movie) => {
    console.log(movie);
    navigate("/details", { state: { movie } });
  };

  const baseUrl = "https://image.tmdb.org/t/p/original";

  return (
    <div>
      <div>
        <div className="flex flex-col items-center py-8">
          <h2 className="text-4xl lg:text-7xl font-serif text-black py-5">
            Movies
          </h2>
          <Swiper
            navigation={true}
            breakpoints={{
              340: {
                slidesPerView: 1.5,
                spaceBetween: 10,
              },
              700: {
                slidesPerView: 2.5,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3.5,
                spaceBetween: 30,
              },
            }}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode, Pagination, Navigation]}
            className="max-w-[90%] lg:max-w-[80%] "
          >
            {popmovie.map((movie, index) => (
              <SwiperSlide key={index}>
                <div className="group relative shadow-xl rounded-xl overflow-hidden">
                  {/* Movie Poster */}
                  <img
                    onClick={() => clicked(movie)}
                    src={`${baseUrl}${movie.poster_path}`}
                    alt={`Movie Poster ${index}`}
                    className="w-full h-[250px] lg:h-[450px] object-cover transform transition-transform duration-300 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  {/* Movie Info */}
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-bold">{movie.title}</h3>
                    <p className="text-sm mt-1">⭐ {movie.vote_average}</p>
                    <p className="text-sm font-semibold mt-2">
                      {movie.release_date}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div>
        <div className="flex flex-col items-center py-8">
          <h2 className="text-4xl lg:text-7xl font-serif text-black py-5">
            Series
          </h2>
          <Swiper
            breakpoints={{
              340: {
                slidesPerView: 1.5,
                spaceBetween: 10,
              },
              700: {
                slidesPerView: 2.5,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3.5,
                spaceBetween: 30,
              },
            }}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[FreeMode, Pagination, Navigation]}
            className="max-w-[90%] lg:max-w-[80%]"
          >
            {serieslist.map((movie, index) => (
              <SwiperSlide key={index}>
                <div className="group relative shadow-xl rounded-xl overflow-hidden">
                  {/* Series Poster */}
                  <img
                    onClick={() => clicked(movie)}
                    src={`${baseUrl}${movie.poster_path}`}
                    alt={`Movie Poster ${index}`}
                    className="w-full h-[250px] lg:h-[450px] object-cover transform transition-transform duration-300 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  {/* Movie Info */}
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-bold">{movie.name}</h3>
                    <p className="text-sm mt-1">⭐ {movie.vote_average}</p>
                    <p className="text-sm font-semibold mt-2">
                      {movie.first_air_date}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default Nowplaying;
