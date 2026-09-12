import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Details from "../components/Details";

function MovieDetails() {
  return (
    <div className="overflow-hidden" style={{ background: "var(--color-bg-primary)" }}>
      <Header />
      <Details />
      <Footer />
    </div>
  );
}

export default MovieDetails;
