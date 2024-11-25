import React from "react";
import { Pagination, FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Upcoming from "../data/upcoming";
import { useNavigate } from "react-router-dom";

function Lists_1() {
  const navigate = useNavigate();
  const upcome = Upcoming();
  const baseUrl = "https://image.tmdb.org/t/p/original";

  const clicked = (movie) => {
    console.log(movie);
    navigate("/details", { state: { movie } });
  };

  return (
    <div>
        <div className="flex flex-col items-center py-8">
          <h2 className="text-4xl lg:text-7xl font-serif py-5">Upcoming</h2>
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
            {upcome.map((movie, index) => (
              <SwiperSlide key={index}>
                <div className="group relative shadow-xl rounded-xl overflow-hidden">
                  {/* Series Poster */}
                  <img
                    onClick={() => clicked(movie)}
                    src={`${baseUrl}${movie.poster_path}`}
                    alt={`Movie Poster ${index}`}
                    className="w-full h-[250px] lg:h-[450px] object-cover"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  {/* Movie Info */}
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-bold">{movie.name}</h3>
                    <p className="text-sm mt-1">
                      Popularity: {movie.popularity}
                    </p>
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
  );
}

export default Lists_1;
