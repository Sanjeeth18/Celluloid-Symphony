import React, { useState } from "react";
import Mainswiper from "./Mainswiper";
import { useNavigate } from "react-router-dom";
import Aboutcontent from "./Aboutcontent";
import ContactDetails from "./contactDetails";
import Details from "./Details";
import Results from "./Results";
import Nowplaying from "./Lists";
import Lists_1 from "./Lists_1";

function Header({
  nowplaying = false,
  lists = false,
  swiper = false,
  about = false,
  contact = false,
  moviesDetails = false,
  search = false,
  datas = [],
}) {
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
    <section className="bg-gradient-to-b from-indigo-200 via-lime-200 to-sky-200 text-gray-800 rounded-2xl p-4 mb-3 shadow-sm">
      <div className="container mx-auto py-10">
        <div className="flex px-4 items-center">
          {/* Menu Icon */}
          <button
            className="mr-5 lg:hidden border border-gray-400 rounded-lg p-2 sm:block"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="gray"
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
            className="text-3xl lg:text-6xl font-extrabold my-auto pr-5 md:border-r border-gray-400"
          >
            Celluloid Symphony
          </a>

          {/* Menu for larger screens */}
          <div className="hidden md:flex my-auto text-xl pl-5">
            <ul className="flex">
              <li className="px-4 py-2 mx-2 bg-gradient-to-r from-indigo-300 via-lime-300 to-sky-300 hover:from-sky-300 hover:to-indigo-300 rounded-lg shadow-md hover:shadow-lg transition">
                <a href="/" className="px-3">
                  Home
                </a>
              </li>
              <li className="px-4 py-2 mx-2 bg-gradient-to-r from-indigo-300 via-lime-300 to-sky-300 hover:from-sky-300 hover:to-indigo-300 rounded-lg shadow-md hover:shadow-lg transition">
                <a href="/about" className="px-3">
                  About
                </a>
              </li>
              <li className="px-4 py-2 mx-2 bg-gradient-to-r from-indigo-300 via-lime-300 to-sky-300 hover:from-sky-300 hover:to-indigo-300 rounded-lg shadow-md hover:shadow-lg transition">
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
                className="p-3 w-60 rounded-l-lg outline-none text-black border-none focus:ring-2 focus:ring-lime-300"
                placeholder="Search..."
                onChange={handleChange}
              ></input>
              <button
                className="flex py-3 px-5 bg-gradient-to-r from-indigo-300 to-sky-300 hover:from-sky-300 hover:to-indigo-300 text-gray-800 rounded-r-lg shadow-md hover:shadow-lg transition"
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
                    stroke="gray"
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
              <li className="px-3 py-2 mx-auto bg-gradient-to-r from-indigo-300 via-lime-300 to-sky-300 hover:from-sky-300 hover:to-indigo-300 rounded-lg shadow-md hover:shadow-lg transition">
                <a href="/">Home</a>
              </li>
              <li className="px-3 py-2 mx-auto bg-gradient-to-r from-indigo-300 via-lime-300 to-sky-300 hover:from-sky-300 hover:to-indigo-300 rounded-lg shadow-md hover:shadow-lg transition">
                <a href="/about">About</a>
              </li>
              <li className="px-3 py-2 mx-auto bg-gradient-to-r from-indigo-300 via-lime-300 to-sky-300 hover:from-sky-300 hover:to-indigo-300 rounded-lg shadow-md hover:shadow-lg transition">
                <a href="/contact">Contact</a>
              </li>
              {/* Search Input for Mobile Menu */}
              <li className="mt-4">
                <form
                  onSubmit={handleSubmit}
                  className="flex items-center justify-center"
                >
                  <input
                    className="p-3 w-60 rounded-l-lg text-black outline-none border-none focus:ring-2 focus:ring-lime-300"
                    placeholder="Search..."
                    onChange={handleChange}
                  ></input>
                  <button
                    className="flex py-3 px-5 bg-gradient-to-r from-indigo-300 to-sky-300 hover:from-sky-300 hover:to-indigo-300 text-gray-800 rounded-r-lg shadow-md hover:shadow-lg transition"
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
                        stroke="gray"
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

      {/* Dynamic Content */}
      {swiper && <Mainswiper />}
      {nowplaying && <Nowplaying />}
      {lists && <Lists_1 />}
      {about && <Aboutcontent />}
      {contact && <ContactDetails />}
      {moviesDetails && <Details detail={datas} />}
      {search && <Results query={datas} />}
    </section>
  );
}

export default Header;
