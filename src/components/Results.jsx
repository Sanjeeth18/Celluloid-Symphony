import React, { useEffect } from "react";
import logo from "../assets/No_Image_Available.jpg";
import { useNavigate } from "react-router-dom";

function Results({ query = {} }) {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("query : ", query.searchResults);
  }, [query]);

  const clicked = (movie) => {
    console.log(movie);
    navigate("/details", { state: { movie } });
  };

  const results = query.searchResults || [];

  return (
    <div className="bg-gray-900 min-h-screen py-16 px-16">
      <h2 className="text-5xl md:text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
        Results
      </h2>
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
          {Array.isArray(results) && results.length > 0 ? (
            results
              .filter(
                (result) =>
                  result.media_type === "movie" || result.media_type === "tv"
              )
              .map((result, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-800 rounded-lg shadow-md text-center text-gray-300 hover:bg-gray-700 transition-colors duration-300"
                >
                  {result.poster_path || result.backdrop_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${
                        result.poster_path || result.backdrop_path
                      }`}
                      alt={result.title || result.name || "Image"}
                      className="w-full h-50 md:h-80 object-cover rounded cursor-pointer border-2 border-green-400"
                      onClick={() => clicked(result)}
                    />
                  ) : (
                    <img
                      src={logo}
                      alt={result.title || result.name || "Image"}
                      className="w-full sm:h-50 md:h-80 object-fill rounded cursor-pointer border-2 border-green-400"
                      onClick={() => clicked(result)}
                    />
                  )}
                  <h3 className="text-xl font-semibold mt-2 text-green-400">
                    {result.title || result.name || "Unknown Title"}
                  </h3>
                  <p className="text-gray-400">Type: {result.media_type}</p>
                </div>
              ))
          ) : (
            <div className="col-span-full flex items-center justify-center">
              <p className="text-white text-2xl lg:text-5xl">
                No results to display
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Results;
