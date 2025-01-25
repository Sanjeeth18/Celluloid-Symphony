import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Mainswiper from "../components/Mainswiper";
import SeriesList from "../data/seriesdata";
import Popular from "../data/Popular";
import Upcoming from "../data/upcoming";
import MovieSwiper from "../components/MovieSwiper";
import Aos from "aos";
import "aos/dist/aos.css";

function Home() {
  const serieslist = SeriesList();
  const popmovie = Popular();
  const upcome = Upcoming();
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div>
      <Header />
      <Mainswiper />
      <MovieSwiper data={popmovie} title="Movies" isMovie={true} />
      <MovieSwiper data={serieslist} title="Series" isMovie={false} />
      <MovieSwiper data={upcome} title="Upcoming" isMovie={true} /> <Footer />
    </div>
  );
}

export default Home;
