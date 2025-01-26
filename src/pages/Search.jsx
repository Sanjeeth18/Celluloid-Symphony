import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Results from "../components/Results";
import { useLocation } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";

function Search() {
  const location = useLocation();
  const datas = location.state;
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);


  return (
    <div className="overflow-hidden">
      <Header />
      <Results query={datas} />
      <Footer  enableAnimation={true}/>
    </div>
  );
}

export default Search;
