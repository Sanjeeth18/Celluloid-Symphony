import React, { useEffect } from "react";
import logo from "../assets/No_Image_Available.jpg";
import Mainswiper from "./Mainswiper";

function Details(props) {
  const detail = props.detail?.movie;

  useEffect(() => {
    console.log("Selected detail:", detail);
  }, [detail]);

  if (!detail) {
    return <p className="text-center text-red-500">No detail selected.</p>;
  }

  const baseUrl = "https://image.tmdb.org/t/p/original";

  return (
    <div className="p-4  bg-gradient-to-b bg-gray-900  shadow-lg text-gray-100 overflow-hidden">
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row bg-gray-800 rounded-lg shadow-md overflow-hidden">
          {/* Detail Poster */}
          <div className="w-full md:w-1/3 p-4 bg-gray-800 flex-shrink-0">
            {detail.poster_path ? (
              <img
                src={`${baseUrl}${detail.poster_path}`}
                alt={detail.title}
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
          <div className="w-full md:w-2/3 p-6 shadow-lg overflow-y-auto">
            <h2 className="text-4xl text-left font-bold text-green-400 mb-4 border-b-2 border-green-500 pb-2">
              {detail.title || detail.original_name}
            </h2>
            <p className="text-lg mb-3 text-left">
              <strong className="text-green-400 text-xl">Release Date:</strong>{" "}
              <span className="text-gray-100">{detail.release_date || detail.first_air_date}</span>
            </p>
            <p className="text-lg mb-3 text-left">
              <strong className="text-green-400 text-xl">Rating:</strong> ⭐ {detail.vote_average || "N/A"}
            </p>
            <p className="text-lg mb-3 text-left">
              <strong className="text-green-400 text-xl">Vote Count:</strong> ⭐ {detail.vote_count || "N/A"}
            </p>
            <p className="text-lg mb-3 text-left">
              <strong className="text-green-400 text-xl">Adult:</strong> {detail.adult ? "Yes" : "No"}
            </p>
            <p className="text-lg mb-3 text-left">
              <strong className="text-green-400 text-xl">Language:</strong> {detail.original_language || "N/A"}
            </p>
            <p className="text-lg mb-3 text-left">
              <strong className="text-green-400 text-xl">Popularity:</strong> {detail.popularity || "N/A"}
            </p>
            <p className="text-lg mt-4 text-left">
              <strong className="text-green-400 text-xl">Overview:</strong>{" "}
              <span>{detail.overview || "No overview available."}</span>
            </p>
          </div>
        </div>
      </div>
      {/* Swiper Section */}
      <div className="mt-8">
        <Mainswiper />
      </div>
    </div>
  );
}

export default Details;
