import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Mainswiper from "../components/Mainswiper";
import MovieSwiper from "../components/MovieSwiper";

function Home() {
  return (
    <div className="overflow-hidden scroll-smooth" style={{ background: "var(--color-bg-primary)" }}>
      <Header />
      {/* pt-20 accounts for the fixed header height */}
      <div style={{ paddingTop: "80px" }}>
        <Mainswiper />
        <MovieSwiper title="Trending Series" isMovie={false} />
        <MovieSwiper title="Trending Movies" isMovie={true} />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
