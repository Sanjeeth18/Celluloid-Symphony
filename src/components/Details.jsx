import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/No_Image_Available.jpg";
import { genres, languages } from "../data/language_genre";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

function Details() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const detail = state?.item || {};
  const reviews = state?.reviews || [];
  const videos = state?.videos || [];
  const cast = state?.cast || [];
  const crew = state?.crew || [];
  const backdrops = state?.backdrops || [];
  const posters = state?.posters || [];

  const genre = genres;
  const language = languages;

  const [selectedReview, setSelectedReview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const genreNames =
    detail?.genre_ids
      ?.map((id) => genre.find((genre) => genre.id === id)?.name)
      .filter(Boolean)
      .join(", ") || "No genres available";

  const languageName =
    language.find((lang) => lang.iso_639_1 === detail?.original_language)
      ?.english_name || "Unknown Language";

  const baseUrl = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    console.log("Selected detail:", detail);
    console.log("CAST:", cast);
    console.log("CREW:", crew);
    console.log("backdrop: ", posters);
  }, [detail, cast, crew]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVideoLoading(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!detail) {
    return <p className="text-center text-red-500">No detail selected.</p>;
  }

  const handleMemberClick = async (memberId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/person/${memberId}?api_key=db8d53ea7f93c34789d584745abbbd08&language=en-US`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch member details");
      }
      const memberDetails = await response.json();
      console.log(memberDetails);
      navigate("/actors", { state: { memberDetails } }); 
    } catch (error) {
      console.error("Error fetching member details:", error);
    }
  };

  const openReviewModal = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const closeReviewModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
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
    <div className="p-4 bg-gradient-to-b bg-gray-900 shadow-lg text-gray-100">
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row bg-gray-800 rounded-lg shadow-md">
          {/* Detail Poster */}
          <div className="w-full md:w-1/3 p-4 bg-gray-800 flex-shrink-0">
            {detail?.poster_path ? (
              <img
                src={`${baseUrl}${detail.poster_path}`}
                alt={detail.title || "Poster"}
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
              {detail.title || detail.name}{" "}
              {detail.original_name !== (detail.title || detail.name) &&
                detail.original_title !== (detail.title || detail.name) && (
                  <span className="text-gray-300 text-lg">
                    {" "}
                    ({detail.original_name || detail.original_title})
                  </span>
                )}
            </h2>
            <p className="text-lg mb-3 text-left">
              <strong className="text-green-400 text-xl">Release Date:</strong>{" "}
              {detail.release_date || detail.first_air_date || "N/A"}
            </p>
            <p className="text-lg mb-3 text-left">
              <strong className="text-green-400 text-xl">Rating:</strong> ⭐{" "}
              {detail.vote_average || "N/A"}
            </p>
            <p className="text-lg mb-3 text-left">
              <strong className="text-green-400 text-xl">Vote Count:</strong> ⭐{" "}
              {detail.vote_count || "N/A"}
            </p>
            <p className="text-lg mb-3 text-left">
              <strong className="text-green-400 text-xl">Language:</strong>{" "}
              {languageName}
            </p>
            <p className="text-lg mb-3 text-left">
              <strong className="text-green-400 text-xl">Popularity:</strong>{" "}
              {detail.popularity || "N/A"}
            </p>
            <p className="text-lg mb-3 text-left">
              <strong className="text-green-400 text-xl">Genres:</strong>{" "}
              {genreNames}
            </p>
            <p className="text-lg mt-4 text-left">
              <strong className="text-green-400 text-xl">Overview:</strong>{" "}
              <span>{detail.overview || "No overview available."}</span>
            </p>
          </div>
        </div>
        {/* Other sections remain unchanged */}
        {/* Cast, Crew, Videos, Backdrops, and Reviews sections */}
        {/* Cast and Crew Section */}
        <div className="mt-8 bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-3xl font-bold text-green-400 mb-4 border-b-2 border-green-500 pb-2">
            Cast & Crew
          </h3>
          {cast.concat(crew).length > 0 ? (
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={20}
              slidesPerView={7}
              loop={true}
              breakpoints={{
                320: { slidesPerView: 2 },
                480: { slidesPerView: 3 },
                768: { slidesPerView: 5 },
                1024: { slidesPerView: 7 },
              }}
            >
              {cast.concat(crew).map((member, index) => (
                <SwiperSlide
                  key={`${member.id}-${index}`}
                  className="text-center "
                  onClick={() => handleMemberClick(member.id)}
                >
                  <img
                    src={
                      member.profile_path
                        ? `${baseUrl}${member.profile_path}`
                        : logo
                    }
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto shadow-lg hover:cursor-pointer"
                    style={{ borderRadius: "100px" }}
                  />
                  <p className="text-lg mt-2 hover:cursor-pointer">
                    {member.name}
                  </p>
                  <p className="text-sm text-gray-400 hover:cursor-pointer">
                    {member.job ? `Crew - ${member.job}` : "Cast"}
                  </p>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p>No cast or crew information available.</p>
          )}
        </div>
        {/* Backdrop Images */}
        <div className="mt-8 bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-3xl font-bold text-green-400 mb-4 border-b-2 border-green-500 pb-2">
            Backdrop Images
          </h3>
          {backdrops.length > 0 ? (
            <Swiper
              modules={[Navigation]}
              loop={true}
              navigation
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="backdrop-swiper p-4"
            >
              {backdrops.map((backdrop, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={`${baseUrl}${backdrop.file_path}`}
                    alt={`Backdrop image ${index + 1} for ${
                      detail.title || "this movie"
                    }`}
                    className="w-full h-[300px] object-cover rounded-lg shadow-md"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="text-gray-400">No images available for this movie.</p>
          )}
        </div>

        {/* Posters Images */}
        <div className="mt-8 bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-3xl font-bold text-green-400 mb-4 border-b-2 border-green-500 pb-2">
            Poster
          </h3>
          {posters.length > 0 ? (
            <Swiper
              modules={[Navigation]}
              loop={true}
              navigation
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="backdrop-swiper p-4"
            >
              {posters.map((poster, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={`${baseUrl}${poster.file_path}`}
                    alt={`poster image ${index + 1} for ${
                      detail.title || "this movie"
                    }`}
                    className="w-full h-[600px] object-cover rounded-lg shadow-md"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="text-gray-400">No images available for this movie.</p>
          )}
        </div>

        {/* Videos Section */}
        {/* Videos Section */}
        <div className="mt-8 bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-3xl font-bold text-green-400 mb-4 border-b-2 border-green-500 pb-2">
            Videos
          </h3>
          {isVideoLoading ? (
            <div className="flex flex-col space-y-4">
              <div className="w-full h-[300px] md:h-[400px] lg:h-[600px] bg-gray-700 animate-pulse rounded-lg"></div>
            </div>
          ) : videos.length > 0 ? (
            <Swiper
              modules={[Navigation]}
              loop={true}
              navigation
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 1,
                },
                1024: {
                  slidesPerView: 1,
                },
              }}
            >
              {videos.map((video, index) => (
                <SwiperSlide key={index}>
                  <iframe
                    src={`https://www.youtube.com/embed/${video.key}`}
                    title={video.name}
                    className="w-full h-[300px] md:h-[400px] lg:h-[600px] rounded-lg"
                    allowFullScreen
                  ></iframe>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="text-gray-400">No videos available for this movie.</p>
          )}
        </div>
        {/* Reviews Section */}
        <div className="mt-8 bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-3xl font-bold text-green-400 mb-4 border-b-2 border-green-500 pb-2">
            Reviews
          </h3>
          {reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => {
                const truncatedContent =
                  review.content.split(". ").slice(0, 4).join(". ") +
                  (review.content.split(". ").length > 4 ? "..." : "");

                return (
                  <div
                    key={review.id}
                    className="p-4 border border-gray-700 rounded-lg bg-gray-900"
                  >
                    <h4 className="text-lg font-semibold text-green-400">
                      {review.author_details?.name ||
                        review.author ||
                        "Anonymous"}
                    </h4>
                    <p className="text-sm text-gray-400 mb-2">
                      Rating:{" "}
                      <span className="text-yellow-400">
                        {review.author_details?.rating || "N/A"}
                      </span>
                    </p>
                    <p className="text-gray-300">{truncatedContent}</p>
                    <button
                      onClick={() => openReviewModal(review)}
                      className="text-green-400 underline text-sm mt-2 hover:cursor-pointer"
                    >
                      Show Full Review
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-400">
              No reviews available for this movie.
            </p>
          )}
        </div>
        {/* Review Modal */}
        {isModalOpen && selectedReview && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-gray-900 p-4 sm:p-6 rounded-lg w-11/12 sm:w-3/4 md:w-1/2 max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl sm:text-2xl text-green-400 mb-4">
                @{selectedReview.author}{" "}
              </h3>
              <p className="text-base sm:text-lg text-gray-300">
                {selectedReview.content}
              </p>
              <div className="mt-4 text-right">
                <button
                  onClick={closeReviewModal}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 hover:cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Swiper Section */}
    </div>
  );
}

export default Details;
