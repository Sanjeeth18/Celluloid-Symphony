import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Header({}) {
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location=useLocation();

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
    <section className="bg-gray-800 text-gray-100 p-2 shadow-md">
      <div className="container mx-auto py-6">
        <div className="flex px-4 items-center">
          {/* Menu Icon */}
          <button
            className="mr-5 lg:hidden border border-gray-600 bg-gray-700 text-gray-100 rounded-lg p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
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
            className="text-3xl lg:text-5xl font-bold my-auto pr-5 md:border-r border-gray-600 text-green-500"
          >
            Celluloid Symphony
          </a>

          {/* Menu for larger screens */}
          <div className="hidden md:flex ml-5 space-x-6 text-lg">
            <a
              href="/"
              className={`py-2 px-4 text-gray-100 ${location.pathname=="/"?"border-green-400":""} hover:text-green-400 border-b-2 border-transparent hover:border-green-500 transition`}
            >
              Home
            </a>
            <a
              href="/about"
              className={`py-2 px-4 ${location.pathname=="/about"?"border-green-400":""} text-gray-100 hover:text-green-400 border-b-2 border-transparent hover:border-green-500 transition`}
            >
              About
            </a>
            <a
              href="/contact"
              className={`py-2 px-4 text-gray-100 ${location.pathname=="/contact"?"border-green-400":""} hover:text-green-400 border-b-2 border-transparent hover:border-green-500 transition`}
            >
              Contact
            </a>
          </div>

          {/* Search Input (Hidden on large screens) */}
          <div className="hidden lg:flex ml-auto">
            <form onSubmit={handleSubmit} className="flex items-center">
              <input
                className="p-3 w-60 text-gray-900 rounded-l-md border border-gray-600 focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="Search..."
                onChange={handleChange}
              />
              <button
                className="py-3 px-4 bg-green-500 text-gray-100 hover:bg-green-600 rounded-r-md shadow-md transition"
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
          <aside
            className={`fixed top-0 left-0 w-64 h-full bg-gray-800 shadow-lg transform transition-transform duration-300 ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex flex-col h-full">
              {/* Close Button */}
              <button
                className="ml-auto p-4 text-gray-100 hover:text-green-400"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Menu Items */}
              <ul className="space-y-4 p-4 text-center">
                <li>
                  <a
                    href="/"
                    className="block py-2 px-4 text-gray-100 hover:text-green-400 border-b-2 border-transparent hover:border-green-500 transition"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="block py-2 px-4 text-gray-100 hover:text-green-400 border-b-2 border-transparent hover:border-green-500 transition"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="block py-2 px-4 text-gray-100 hover:text-green-400 border-b-2 border-transparent hover:border-green-500 transition"
                  >
                    Contact
                  </a>
                </li>
                <li className="mt-3">
                  <form onSubmit={handleSubmit} className="flex items-center">
                    <input
                      className="p-3 w-full rounded-l-md border border-gray-600 focus:ring-2 focus:ring-green-500 outline-none"
                      placeholder="Search..."
                      onChange={handleChange}
                    />
                    <button
                      className="py-3 px-4 bg-green-500 text-gray-100 hover:bg-green-600 rounded-r-md shadow-md transition"
                      disabled={isLoading}
                    >
                      Search
                    </button>
                  </form>
                </li>
              </ul>
            </div>
          </aside>
        )}
      </div>
    </section>
  );
}

export default Header;
