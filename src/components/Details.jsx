import React, { useEffect } from "react";
import logo from "../assets/No_Image_Available.jpg";
import Mainswiper from "./Mainswiper";

function Details(props) {
  const detail = props.detail.movie;
  useEffect(() => {
    console.log("Selected detail:", detail.movie);
  }, [detail]);

  if (!detail) {
    return <p className="text-center text-red-500">No detail selected.</p>;
  }

  const baseUrl = "https://image.tmdb.org/t/p/original";

  return (
    <>
      <div className="p-4  mb-3">
        {" "}
        <div className="container md:ml-20 p-4">
          <div className="flex flex-col md:flex-row">
            {/* Detail Poster */}
            <div className="w-full sm:my-auto md:w-1/3 ">
              {detail.poster_path ? (
                <img
                  src={`${baseUrl}${detail.poster_path}`}
                  alt={detail.title}
                  className="rounded-lg w-full h-auto max-w-xs md:max-w-sm lg:max-w-md object-cover  mx-auto"
                />
              ) : (
                <img
                  src={logo}
                  className="w-full sm:h-50 md:h-80 object-fill rounded"
                />
              )}
            </div>

            {/* Detail Details */}
            <div className="w-full my-auto lg:px-10 md:w-2/3  p-4">
              <h2 className="text-4xl text-left font-bold text-orange-400 mb-4">
                {detail.title || detail.original_name}
              </h2>
              <p className="text-lg ">
                <strong className="text-purple-500 text-xl">
                  Release Date:
                </strong>{" "}
                <span className="text-black">
                  {" "}
                  {detail.release_date || detail.first_air_date}
                </span>
              </p>
              <p className="text-lg text-black">
                <strong className="text-purple-500 text-xl">Rating:</strong> ⭐{" "}
                {detail.vote_average || "N/A"}
              </p>
              <p className="text-lg text-black">
                <strong className="text-purple-500 text-xl">
                  Vote Count :{" "}
                </strong>{" "}
                ⭐ {detail.vote_count || "N/A"}
              </p>
              <p className="text-lg text-black">
                <strong className="text-purple-500 text-xl">Adult : </strong>{" "}
                {detail.adult ? "Yes" : "No"}
              </p>

              <p className="text-lg text-black">
                <strong className="text-purple-500 text-xl">Language : </strong>{" "}
                {detail.original_language || "N/A"}
              </p>
              <p className="text-lg text-black">
                <strong className="text-purple-500 text-xl">
                  Popularity :{" "}
                </strong>{" "}
                {detail.popularity || "N/A"}
              </p>

              <p className="text-lg w-full lg:w-1/2 text-black mt-4">
                <strong className="text-purple-500 text-xl">Overview : </strong>{" "}
                <span>{detail.overview || "No overview available."}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <Mainswiper />
        </div>
      </div>
    </>
  );
}

export default Details;
