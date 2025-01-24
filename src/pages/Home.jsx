import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Mainswiper from "../components/Mainswiper";
import SeriesList from "../data/seriesdata";
import Popular from "../data/Popular";
import Upcoming from "../data/upcoming";
import MovieSwiper from "../components/MovieSwiper";

function Home() {
  const serieslist = SeriesList();
  const popmovie = Popular();
  const upcome = Upcoming();

  return (
    <div>
      <Header swiper={true} nowplaying={true} lists={true} />
      <Mainswiper />
      <MovieSwiper data={popmovie} title="Movies" isMovie={true} />
      <MovieSwiper data={serieslist} title="Series" isMovie={false} />
      <MovieSwiper data={upcome} title="Upcoming" isMovie={true} /> <Footer />
    </div>
  );
}

export default Home;
