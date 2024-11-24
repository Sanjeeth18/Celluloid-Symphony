import React, { useState } from "react";
import Mainswiper from "./Mainswiper";
import { useNavigate } from "react-router-dom";

function Header({ value }) {
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);  
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const navigate = useNavigate();

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); 
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=44138842cb5326f8d36361f3de1243ad&query=${query}`
      );
      const data = await response.json();
      setSearchResults(data.results);
      setIsLoading(false); 
      navigate("/search", { state: { searchResults: data.results } });
    } catch (error) {
      console.error("Error fetching search results:", error);
      setIsLoading(false); 
    }
  };

  return (
    <section className="bg-gradient-to-b from-purple-600 via-pink-500 to-red-400 text-white rounded-2xl p-4 mb-3 shadow-lg">
      <div className="container mx-auto py-10">
        <div className="flex px-4 items-center">
          {/* Menu Icon */}
          <button
            className="mr-5 lg:hidden border border-white rounded-lg p-2 sm:block"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="white"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>

          {/* Title */}
          <a
            href=""
            className="text-3xl lg:text-6xl font-extrabold my-auto pr-5 md:border-r border-white"
          >
            Celluloid Symphony
          </a>

          {/* Menu for larger screens */}
          <div className="hidden md:flex my-auto text-xl pl-5">
            <ul className="flex">
              <li className="px-4 py-2 mx-2 bg-gradient-to-r from-purple-500 via-pink-400 to-red-300 hover:from-red-300 hover:to-purple-500 rounded-lg shadow-md hover:shadow-lg transition">
                <a href="/" className="px-3">
                  Home
                </a>
              </li>
              <li className="px-4 py-2 mx-2 bg-gradient-to-r from-purple-500 via-pink-400 to-red-300 hover:from-red-300 hover:to-purple-500 rounded-lg shadow-md hover:shadow-lg transition">
                <a href="/about" className="px-3">
                  About
                </a>
              </li>
              <li className="px-4 py-2 mx-2 bg-gradient-to-r from-purple-500 via-pink-400 to-red-300 hover:from-red-300 hover:to-purple-500 rounded-lg shadow-md hover:shadow-lg transition">
                <a href="/contact" className="px-3">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Search Input (Hidden on large screens) */}
          <div className="hidden lg:flex ml-auto">
            <form onSubmit={handleSubmit} className="flex items-center">
              <input
                className="p-3 w-60 rounded-l-lg outline-none text-black border-none focus:ring-2 focus:ring-pink-400"
                placeholder="Search..."
                onChange={handleChange}
              ></input>
              <button
                className="flex py-3 px-5 bg-gradient-to-r from-red-400 to-purple-500 hover:from-purple-500 hover:to-red-400 text-white rounded-r-lg shadow-md hover:shadow-lg transition"
                disabled={isLoading}
              >
                {isLoading ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="animate-spin w-5 h-5"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 2.137.842 4.084 2.209 5.561l1.791-1.27z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="white"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mt-5 text-center">
            <ul className="block text-lg">
              <li className="px-3 py-2 mx-auto bg-gradient-to-r from-purple-500 via-pink-400 to-red-300 hover:from-red-300 hover:to-purple-500 rounded-lg shadow-md hover:shadow-lg transition">
                <a href="/">Home</a>
              </li>
              <li className="px-3 py-2 mx-auto bg-gradient-to-r from-purple-500 via-pink-400 to-red-300 hover:from-red-300 hover:to-purple-500 rounded-lg shadow-md hover:shadow-lg transition">
                <a href="/about">About</a>
              </li>
              <li className="px-3 py-2 mx-auto bg-gradient-to-r from-purple-500 via-pink-400 to-red-300 hover:from-red-300 hover:to-purple-500 rounded-lg shadow-md hover:shadow-lg transition">
                <a href="/contact">Contact</a>
              </li>
              {/* Search Input for Mobile Menu */}
              <li className="mt-4">
                <form onSubmit={handleSubmit} className="flex items-center justify-center">
                  <input
                    className="p-3 w-60 rounded-l-lg text-black outline-none border-none focus:ring-2 focus:ring-pink-400"
                    placeholder="Search..."
                    onChange={handleChange}
                  ></input>
                  <button
                    className="flex py-3 px-5 bg-gradient-to-r from-red-400 to-purple-500 hover:from-purple-500 hover:to-red-400 text-white rounded-r-lg shadow-md hover:shadow-lg transition"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="animate-spin w-5 h-5"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 2.137.842 4.084 2.209 5.561l1.791-1.27z"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="white"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                      </svg>
                    )}
                  </button>
                </form>
              </li>
            </ul>
          </div>
        )}
      </div>
      {value === true && <Mainswiper />}    </section>
  );
}

export default Header;
