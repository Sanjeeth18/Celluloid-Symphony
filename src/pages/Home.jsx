import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Mainswiper from "../components/Mainswiper";
import MovieSwiper from "../components/MovieSwiper";
import Aos from "aos";
import "aos/dist/aos.css";
import { SeriesList, TrendMovies } from "../data/datas";

function Home() {
  const serieslist = SeriesList();
  const Tmovies = TrendMovies();

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div className=" overflow-hidden scroll-smooth">
      <Header />
      <Mainswiper />
      <MovieSwiper data={serieslist} title="Trending Series" isMovie={false} />
      <MovieSwiper data={Tmovies} title="Trending Movies" isMovie={true} />{" "}
      <Footer enableAnimation={false} />
    </div>
  );
}

export default Home;
