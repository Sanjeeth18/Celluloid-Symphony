import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Aboutcontent from '../components/Aboutcontent'

function About() {
  return (
    <div className='m-3'>
        <Header swiper={true} about={true} />
        <Footer/>
    </div>
  )
}

export default About