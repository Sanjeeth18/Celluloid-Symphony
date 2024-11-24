import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Aboutcontent from '../components/Aboutcontent'

function About() {
  return (
    <div className='m-3'>
        <Header value={true}/>
        <Aboutcontent/>
        <Footer/>
    </div>
  )
}

export default About