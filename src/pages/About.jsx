import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Aboutcontent from "../components/Aboutcontent";
import Aos from "aos";
import "aos/dist/aos.css";

function About() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div>
      <Header />
      <Aboutcontent />
      <Footer />
    </div>
  );
}

export default About;
