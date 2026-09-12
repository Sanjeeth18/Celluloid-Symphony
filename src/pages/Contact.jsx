import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactDetails from "../components/contactDetails";

function Contact() {
  return (
    <div className="overflow-hidden" style={{ background: "var(--color-bg-primary)" }}>
      <Header />
      <ContactDetails />
      <Footer />
    </div>
  );
}

export default Contact;
