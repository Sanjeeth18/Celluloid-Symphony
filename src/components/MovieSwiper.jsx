import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
  Pagination,
  FreeMode,
  Navigation,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import { useNavigate } from "react-router-dom";

function MovieSwiper({ data, title, isMovie = true }) {
  const navigate = useNavigate();
  const baseUrl = "https://image.tmdb.org/t/p/original";

  const clicked = (movie) => {
    console.log(movie);
    navigate("/details", { state: { movie } });
  };

  return (
    <div className="bg-gray-900">
      <div className="flex flex-col items-center pb-16">
        <h2 className="text-4xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 py-5">
          {title}
        </h2>
        <Swiper
          effect="coverflow"
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          grabCursor={true}
          centeredSlides={true}
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: true,
          }}
          breakpoints={{
            340: {
              slidesPerView: 1.5,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3.5,
              spaceBetween: 30,
            },
          }}
          navigation={true}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className} w-3 h-3 md:w-3 md:h-3 bg-white rounded-full"></span>`;
            },
          }}
          modules={[
            FreeMode,
            Pagination,
            Navigation,
            Autoplay,
            EffectCoverflow,
          ]}
          className="max-w-[90%] lg:max-w-[80%] mx-auto"
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="group relative shadow-xl rounded-xl overflow-hidden">
                {/* Movie/Series Poster */}
                <img
                  onClick={() => clicked(item)}
                  src={`${baseUrl}${item.poster_path}`}
                  alt={`Poster ${index}`}
                  className="w-full h-[250px] lg:h-[450px] object-cover transform transition-transform duration-300 group-hover:scale-110 group-hover:shadow-2xl"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                {/* Movie/Series Info */}
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">
                    {isMovie ? item.title : item.name}
                  </h3>
                  <p className="text-sm mt-1 text-yellow-400">
                    ⭐ {item.vote_average}
                  </p>
                  <p className="text-sm font-semibold mt-2 text-gray-300">
                    {isMovie ? item.release_date : item.first_air_date}
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

export default MovieSwiper;
