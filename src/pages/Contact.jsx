import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactDetails from "../components/contactDetails";
import Aos from "aos";
import "aos/dist/aos.css";

function Contact() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div className=" overflow-hidden">
      <Header />
      <ContactDetails />
      <Footer enableAnimation={true}/>
    </div>
  );
}

export default Contact;
