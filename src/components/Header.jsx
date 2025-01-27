import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Header() {
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = async (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    if (newQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=db8d53ea7f93c34789d584745abbbd08&query=${newQuery}`
      );
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleSubmit = async (event) => {
    if (event.preventDefault) event.preventDefault();
    if (query.trim() === "") return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=db8d53ea7f93c34789d584745abbbd08&query=${query}`
      );
      const data = await response.json();
      setIsLoading(false);
      navigate("/search", { state: { searchResults: data.results } });
    } catch (error) {
      console.error("Error fetching search results:", error);
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.title || suggestion.name); 
    setSearchResults([]); 
    handleSubmit({ preventDefault: () => {} }); 
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
            href="/"
            className="text-3xl lg:text-5xl font-bold my-auto pr-5 md:border-r border-gray-600 text-green-500"
          >
            Celluloid Symphony
          </a>

          {/* Menu for larger screens */}
          <div className="hidden md:flex ml-5 space-x-6 text-lg scroll-smooth">
            <Link
              to="/"
              className={`py-2 px-4 text-gray-100 border-b-2 ${
                location.pathname === "/"
                  ? "border-green-400"
                  : "border-transparent"
              } hover:text-green-400 hover:border-green-500 transition`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`py-2 px-4 border-b-2 ${
                location.pathname === "/about"
                  ? "border-green-400"
                  : "border-transparent"
              } text-gray-100 hover:text-green-400 hover:border-green-500 transition`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`py-2 px-4 text-gray-100 ${
                location.pathname === "/contact"
                  ? "border-green-400"
                  : "border-transparent "
              } hover:text-green-400 border-b-2 hover:border-green-500 transition`}
            >
              Contact
            </Link>
          </div>

          {/* Search Input */}
          <div className="hidden lg:flex ml-auto relative">
            <form onSubmit={handleSubmit} className="flex items-center">
              <input
                className="p-3 w-60 text-gray-900 rounded-l-md border border-gray-600 focus:ring-2 outline-none"
                placeholder="Search..."
                onChange={handleChange}
                value={query}
              />
              <button
                className="h-full py-3 px-4 bg-green-500 text-gray-100 hover:bg-green-600 rounded-r-md shadow-md transition flex items-center justify-center"
                disabled={isLoading}
              >
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
              </button>
            </form>
            {searchResults.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-gray-700 rounded-md shadow-lg z-50">
                <ul>
                  {searchResults.slice(0, 5).map((result) => (
                    <li
                      key={result.id}
                      className="p-2 text-gray-100 hover:bg-gray-600 cursor-pointer"
                      onClick={() => handleSuggestionClick(result)}
                    >
                      {result.title || result.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Header;
