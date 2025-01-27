import React, { useEffect, useState } from "react";
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
  const [isLoading, setIsLoading] = useState(true);

  const movieList = MovieList();
  const baseUrl = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

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
    <div className="flex flex-col px-10 items-center py-8 bg-gray-900 text-white">
      <h2 className="text-4xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 py-5">
        Featured Movies
      </h2>
      <Swiper
        effect={"coverflow"}
        speed="1000"
        grabCursor={true}
        loop={true}
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
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 hover:cursor-pointer"
                />
              ) : (
                <img
                  src={logo}
                  alt="No poster available"
                  className="w-full sm:h-50 md:h-80 object-fill rounded hover:cursor-pointer"
                  onClick={() => clicked(movie)}
                />
              )}

              {/* Overlay */}
              <div
                className="absolute inset-0 hover:cursor-pointer bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                onClick={() => clicked(movie)}
              ></div>

              {/* Movie Info */}
              <div
                className="absolute bottom-4 left-4 text-white"
                onClick={() => clicked(movie)}
              >
                <h3
                  className="text-base sm:text-lg font-bold hover:cursor-pointer"
                  onClick={() => clicked(movie)}
                >
                  {movie.title}
                </h3>
                <p
                  className="text-sm mt-1 text-yellow-400 hover:cursor-pointer"
                  onClick={() => clicked(movie)}
                >
                  ⭐ {movie.vote_average}
                </p>
                <p
                  className="text-sm font-semibold mt-2 text-gray-300 hover:cursor-pointer"
                  onClick={() => clicked(movie)}
                >
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
