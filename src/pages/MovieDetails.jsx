import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Details from "../components/Details";
import { useLocation } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";

function MovieDetails() {
  const location = useLocation();
  const movie = location.state;
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div>
      <Header />
      <Details detail={movie} />
      <Footer />
    </div>
  );
}

export default MovieDetails;
