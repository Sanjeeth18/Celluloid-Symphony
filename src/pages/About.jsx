import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Aboutcontent from "../components/Aboutcontent";

function About() {
  return (
    <div className="overflow-hidden" style={{ background: "var(--color-bg-primary)" }}>
      <Header />
      <Aboutcontent />
      <Footer />
    </div>
  );
}

export default About;
