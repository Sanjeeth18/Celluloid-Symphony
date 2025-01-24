import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Details from "../components/Details";
import { useLocation } from "react-router-dom";

function MovieDetails() {
  const location = useLocation();
  const movie = location.state;
  return (
    <div >
      <Header  />
      <Details detail={movie} />
      <Footer />
    </div>
  );
}

export default MovieDetails;
