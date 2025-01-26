import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Mainswiper from "../components/Mainswiper";
import SeriesList from "../data/seriesdata";
import TopMovies from "../data/topRatedSeries";
import Upcoming from "../data/upcoming";
import MovieSwiper from "../components/MovieSwiper";
import Aos from "aos";
import "aos/dist/aos.css";
import TrendMovies from "../data/trendMovies";
import TrendSeries from "../data/trendSeries";
import TopSeries from "../data/topRatedMovies";

function Home() {
  const serieslist = SeriesList();
  const topRatedmovie = TopMovies();
  const topRatedSeries = TopSeries();
  const upcome = Upcoming();
  const Tmovies = TrendMovies();
  const Tseries = TrendSeries();

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div className=" overflow-hidden scroll-smooth">
      <Header />
      <Mainswiper />
      <MovieSwiper
        data={topRatedmovie}
        title="Top Rated Movies"
        isMovie={true}
      />
      <MovieSwiper data={Tmovies} title="Trending Movies" isMovie={true} />{" "}
      <MovieSwiper
        data={topRatedSeries}
        title="Top Rated Series"
        isMovie={false}
      />
      <MovieSwiper data={Tseries} title="Trending Series" isMovie={true} />
      <MovieSwiper data={serieslist} title="Series" isMovie={false} />{" "}
      <MovieSwiper data={upcome} title="Upcoming" isMovie={true} upcoming={true}/>{" "}
      <Footer enableAnimation={true} />
    </div>
  );
}

export default Home;
