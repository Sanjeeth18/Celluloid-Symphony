import React from 'react'
import Header from '../components/Header'
import Mainswiper from '../components/Mainswiper'
import Nowplaying from '../components/Lists'
import Footer from '../components/Footer'
import Lists_1 from '../components/Lists_1'

function Home() {
  return (
    <>
        <Header/>
        <Mainswiper/>
        <Nowplaying/>
        <Lists_1/>
        <Footer/>
    </>
  )
}

export default Home