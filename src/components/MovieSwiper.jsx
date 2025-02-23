import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
  Pagination,
  Navigation,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import { useNavigate } from "react-router-dom";
import {
  fetchImages,
  fetchMovieCredits,
  fetchReviews,
  fetchTVCredits,
  fetchVideos,
} from "../data/Details";

function MovieSwiper({ data, title, isMovie = true, upcoming = false }) {
  const navigate = useNavigate();
  const baseUrl = "https://image.tmdb.org/t/p/original";
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState(data);
  const [selectedYear, setSelectedYear] = useState("");
  const handleYearChange = async (event) => {
    const year = event.target.value;
    setSelectedYear(year);

    if (year) {
      const filteredResults = await fetchFilteredMovies(year, isMovie);
      setFilteredData(filteredResults);
    } else {
      setFilteredData(data);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchInitialData = async () => {
      const initialData = await fetchFilteredMovies("", isMovie);
      setFilteredData(initialData);
    };

    fetchInitialData();
  }, [isMovie]);
  const fetchFilteredMovies = async (year, isMovie) => {
    const apiKey = "db8d53ea7f93c34789d584745abbbd08";
    const type = isMovie ? "movie" : "tv";

    const url = year
      ? `https://api.themoviedb.org/3/discover/${type}?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&primary_release_year=${year}`
      : `https://api.themoviedb.org/3/discover/${type}?api_key=${apiKey}&language=en-US&sort_by=popularity.desc`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error("Error fetching filtered data:", error);
      return [];
    }
  };
  const clicked = async (item) => {
    const BASE_URL = "https://api.themoviedb.org/3";

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
  if (isLoading) {
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
    <div className="bg-gray-900 pb-10 px-6 md:px-8 lg:px-10">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between pt-10 lg:pt-16 gap-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
          {title}
        </h2>
        {/* Filter by Year Dropdown */}
        {upcoming === false && (
          <div className="mt-4 lg:mt-0">
            <select
              id="yearFilter"
              value={selectedYear}
              onChange={handleYearChange}
              className="bg-gray-800 text-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-auto"
            >
              <option value="">All Years</option>
              {Array.from({ length: 50 }, (_, i) => 2025 - i).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <Swiper
        grabCursor={true}
        loop={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} w-3 h-3 md:w-3 md:h-3 bg-green-400 rounded-full"></span>`;
          },
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
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        className="max-w-full mx-auto mt-8"
      >
        {filteredData.map((item, index) => (
          <SwiperSlide
            key={index}
            className="w-[80%] sm:w-[60%] md:w-[40%] lg:w-[30%] xl:w-[25%] h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] text-black"
          >
            <div className="group relative shadow-xl rounded-xl overflow-hidden w-full h-full">
              {/* Movie/Series Poster */}
              <img
                onClick={() => clicked(item)}
                src={`${baseUrl}${item.poster_path}`}
                alt={`Poster ${index}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 hover:cursor-pointer"
              />
              {/* Overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hover:cursor-pointer"
                onClick={() => clicked(item)}
              />
              {/* Movie/Series Info */}
              <div
                className="absolute bottom-4 left-4 text-white hover:cursor-pointer"
                onClick={() => clicked(item)}
              >
                <h3 className="text-base sm:text-lg md:text-xl font-bold hover:cursor-pointer">
                  {isMovie ? item.title : item.name}
                </h3>
                <p className="text-xs sm:text-sm mt-1 text-yellow-400 hover:cursor-pointer">
                  ⭐ {item.vote_average}
                </p>
                <p className="text-xs sm:text-sm font-semibold mt-2 text-gray-300 hover:cursor-pointer">
                  {isMovie ? item.release_date : item.first_air_date}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default MovieSwiper;
