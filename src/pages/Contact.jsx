import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ContactDetails from '../components/contactDetails'

function Contact() {
  return (
    <div className="m-3">
      <Header value={true} />
      <ContactDetails />
      <Footer />
    </div>
  )
}

export default Contact
